import type { Express } from "express";
import { createServer, type Server } from "http";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const requestsFilePath = join(process.cwd(), 'requests.yml');

  // Endpoint per inviare messaggi di contatto
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validazione input
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Tutti i campi sono obbligatori' 
        });
      }

      // Validazione email base
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email non valida' 
        });
      }

      // Crea nuovo messaggio
      const newMessage: ContactMessage = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString()
      };

      // Leggi file esistente o crea array vuoto
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

      // Aggiungi nuovo messaggio
      messages.push(newMessage);

      // Salva nel file YAML
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

  // Endpoint per recuperare tutti i messaggi (opzionale, per admin)
  app.get('/api/contact', async (req, res) => {
    try {
      if (!existsSync(requestsFilePath)) {
        return res.json({ messages: [], totalMessages: 0 });
      }

      const fileContent = readFileSync(requestsFilePath, 'utf8');
      const parsedData = yaml.load(fileContent);
      
      res.json(parsedData);
    } catch (error) {
      console.error('Errore nel leggere i messaggi:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Errore nel recuperare i messaggi' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}