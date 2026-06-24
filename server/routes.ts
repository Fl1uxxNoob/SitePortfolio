import type { Express } from "express";
import { createServer, type Server } from "http";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";
import { sendContactEmail, type ContactMessage } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  const requestsFilePath = join(process.cwd(), 'requests.yml');

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Tutti i campi sono obbligatori' 
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email non valida' 
        });
      }

      const newMessage: ContactMessage = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString()
      };

      let messages: ContactMessage[] = [];
      if (existsSync(requestsFilePath)) {
        try {
          const fileContent = readFileSync(requestsFilePath, 'utf8');
          const parsedData = yaml.load(fileContent) as { messages?: ContactMessage[] };
          messages = parsedData?.messages || [];
        } catch (error) {
          console.error('Errore nel leggere il file YAML:', error);
          messages = [];
        }
      }

      messages.push(newMessage);

      const yamlData = {
        messages: messages,
        lastUpdated: new Date().toISOString(),
        totalMessages: messages.length
      };

      const yamlString = yaml.dump(yamlData, {
        indent: 2,
        lineWidth: -1,
        noRefs: true
      });

      writeFileSync(requestsFilePath, yamlString, 'utf8');

      console.log(`Nuovo messaggio salvato da: ${name} (${email})`);

      // Invia l'email di notifica. Il messaggio è già salvato come backup nel
      // file YAML, quindi se l'invio fallisce logghiamo l'errore ma rispondiamo
      // comunque con successo per non perdere/segnalare un messaggio già ricevuto.
      try {
        await sendContactEmail(newMessage);
        console.log(`Email di notifica inviata per il messaggio ${newMessage.id}`);
      } catch (emailError) {
        console.error('Errore nell\'invio dell\'email di notifica:', emailError);
      }

      res.json({
        success: true,
        message: 'Messaggio inviato con successo!',
        id: newMessage.id
      });

    } catch (error) {
      console.error('Errore nel salvare il messaggio:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Errore interno del server' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}