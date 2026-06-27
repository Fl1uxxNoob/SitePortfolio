import type { Express } from "express";
import { createServer, type Server } from "http";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { sendContactEmail, type ContactMessage } from "./email";

// Limiti allineati a quelli del form lato client (ContactSection.tsx), così la
// validazione non è aggirabile chiamando direttamente l'API.
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Il nome deve avere almeno 2 caratteri').max(100, 'Il nome è troppo lungo'),
  email: z.string().trim().toLowerCase().email('Email non valida').max(255, "L'email è troppo lunga"),
  subject: z.string().trim().min(3, "L'oggetto deve avere almeno 3 caratteri").max(200, "L'oggetto è troppo lungo"),
  message: z.string().trim().min(10, 'Il messaggio deve avere almeno 10 caratteri').max(1000, 'Il messaggio è troppo lungo'),
});

// Rate limit per IP sull'endpoint pubblico: evita spam di email e crescita
// incontrollata di requests.yml.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Troppe richieste, riprova più tardi.' },
});

export async function registerRoutes(app: Express): Promise<Server> {
  const requestsFilePath = join(process.cwd(), 'requests.yml');

  app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
      const parsed = contactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message ?? 'Dati non validi',
        });
      }

      const { name, email, subject, message } = parsed.data;

      const newMessage: ContactMessage = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name,
        email,
        subject,
        message,
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