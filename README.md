# Portfolio — Fl1uxxNoob

Sito portfolio personale full-stack che presenta plugin Minecraft, bot Discord,
screenshot dei progetti ed esperienze come staff su server Minecraft. Include un
form di contatto che salva i messaggi su file e invia una notifica via email.

## Indice

- [Stack tecnologico](#stack-tecnologico)
- [Requisiti](#requisiti)
- [Avvio rapido](#avvio-rapido)
- [Variabili d'ambiente](#variabili-dambiente)
- [Script disponibili](#script-disponibili)
- [Struttura del progetto](#struttura-del-progetto)
- [Come funziona il form di contatto](#come-funziona-il-form-di-contatto)
- [Guide: come aggiungere contenuti](#guide-come-aggiungere-contenuti)
  - [Aggiungere un plugin Minecraft](#aggiungere-un-plugin-minecraft)
  - [Aggiungere gli screenshot di un plugin](#aggiungere-gli-screenshot-di-un-plugin)
  - [Aggiungere un bot Discord](#aggiungere-un-bot-discord)
  - [Aggiungere uno screenshot alla sezione "Screenshots"](#aggiungere-uno-screenshot-alla-sezione-screenshots)
  - [Aggiungere un'esperienza in "Staff Experience"](#aggiungere-unesperienza-in-staff-experience)
- [Deploy in produzione](#deploy-in-produzione)
- [Note di sicurezza](#note-di-sicurezza)

---

## Stack tecnologico

| Area | Tecnologie |
|------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Wouter (routing) |
| Backend | Node.js, Express, TypeScript (eseguito con `tsx`) |
| Validazione | Zod |
| Sicurezza | `express-rate-limit` |
| Email | Nodemailer (SMTP) |
| Persistenza messaggi | File `requests.yml` (libreria `js-yaml`) |

Frontend e backend girano su **un'unica porta (5000)**: in sviluppo Express usa Vite
in middleware mode (con HMR), in produzione serve i file statici già compilati.

## Requisiti

- **Node.js 18+** (consigliato 20)
- **npm**

## Avvio rapido

```bash
# 1. Installa le dipendenze
npm install

# 2. (opzionale ma consigliato) crea il file .env per l'invio email
cp .env.example .env
#    poi modifica i valori SMTP

# 3. Avvia in sviluppo
npm run dev
```

Il sito sarà disponibile su **http://localhost:5000**.

> Il server è in ascolto su `0.0.0.0`, quindi è raggiungibile anche da altri
> dispositivi sulla stessa rete locale (`http://<tuo-IP>:5000`).

## Variabili d'ambiente

Configurate in un file `.env` nella root (vedi [`.env.example`](.env.example)). Servono
**solo per l'invio delle email** del form di contatto; senza, il sito funziona comunque
e i messaggi vengono salvati in `requests.yml`.

| Variabile | Descrizione | Default |
|-----------|-------------|---------|
| `SMTP_HOST` | Host del server SMTP | — (obbligatoria per le email) |
| `SMTP_PORT` | Porta SMTP | `465` |
| `SMTP_SECURE` | `true`/`false` (TLS) | `true` se porta 465 |
| `SMTP_USER` | Utente/casella SMTP | — (obbligatoria) |
| `SMTP_PASS` | Password della casella | — (obbligatoria) |
| `CONTACT_TO` | Destinatario delle notifiche | `SMTP_USER` |
| `CONTACT_FROM` | Mittente mostrato nell'email | `SMTP_USER` |

Il file `.env` è ignorato da git (vedi `.gitignore`): **non committare mai le credenziali**.

## Script disponibili

| Comando | Cosa fa |
|---------|---------|
| `npm run dev` | Avvia il server di sviluppo con HMR su :5000 |
| `npm run build` | Compila il client (Vite) e il server (esbuild) in `dist/` |
| `npm run start` | Avvia la build di produzione (richiede `npm run build` prima) |
| `npm run check` | Controllo dei tipi TypeScript (`tsc`) |

## Struttura del progetto

```
SitePortfolio/
├─ client/                      # Frontend React
│  ├─ index.html                # HTML root + meta SEO/OG
│  ├─ public/images/            # Screenshot dei progetti (PNG)
│  └─ src/
│     ├─ App.tsx                # Router (wouter): /, /plugin/:id, /bot/:id, /staff-experience
│     ├─ main.tsx               # Entry point React
│     ├─ index.css              # Stili globali + utility custom (gradient-text, mouse-light, ...)
│     ├─ data/
│     │  └─ projects.ts         # ⭐ DATI: elenco plugin Minecraft e bot Discord
│     ├─ pages/
│     │  ├─ Home.tsx            # Pagina principale (compone tutte le sezioni)
│     │  ├─ PluginDetail.tsx    # Dettaglio plugin + galleria screenshot
│     │  ├─ BotDetail.tsx       # Dettaglio bot + galleria screenshot
│     │  ├─ StaffExperience.tsx # ⭐ DATI: timeline esperienze staff
│     │  └─ not-found.tsx       # 404
│     ├─ components/
│     │  ├─ Navigation.tsx, HeroSection.tsx, AboutSection.tsx
│     │  ├─ PluginsSection.tsx  # Griglia card plugin
│     │  ├─ BotsSection.tsx     # Griglia card bot
│     │  ├─ ScreenshotsSection.tsx # ⭐ DATI: carosello screenshot in home
│     │  ├─ ContactSection.tsx  # Form di contatto
│     │  ├─ Footer.tsx, MouseLight.tsx
│     │  └─ ui/                 # Componenti shadcn/ui (non modificare salvo necessità)
│     ├─ hooks/                 # useMousePosition, use-mobile, use-toast
│     └─ lib/                   # queryClient, utils
├─ server/                      # Backend Express
│  ├─ index.ts                  # Bootstrap, middleware, trust proxy, avvio su :5000
│  ├─ routes.ts                 # ⭐ API POST /api/contact (validazione Zod + rate limit)
│  ├─ email.ts                  # Invio email via Nodemailer
│  └─ vite.ts                   # Integrazione Vite (dev) / static serving (prod)
├─ requests.yml                 # Backup dei messaggi ricevuti (ignorato da git)
├─ .env.example                 # Template variabili ambiente
├─ vite.config.ts, tailwind.config.ts, tsconfig.json, postcss.config.js
└─ package.json
```

> I file marcati con ⭐ sono quelli che modificherai più spesso per aggiungere contenuti.

## Come funziona il form di contatto

L'unica API del backend è **`POST /api/contact`** ([server/routes.ts](server/routes.ts)):

1. **Rate limiting** — massimo **5 richieste ogni 15 minuti per IP** (`express-rate-limit`).
   Oltre il limite → `429` con messaggio "Troppe richieste, riprova più tardi.".
2. **Validazione server-side** con **Zod** (limiti allineati al form):
   - `name`: 2–100 caratteri
   - `email`: formato valido, max 255
   - `subject`: 3–200 caratteri
   - `message`: 10–1000 caratteri

   In caso di dati non validi → `400` con il messaggio d'errore.
3. **Salvataggio** del messaggio in `requests.yml` (sempre, come backup).
4. **Invio email** di notifica via Nodemailer. Se l'invio fallisce, l'errore viene loggato
   ma la richiesta risponde comunque con successo (il messaggio è già salvato).

---

## Guide: come aggiungere contenuti

Quasi tutti i contenuti del sito sono **dati statici in file TypeScript**: per aggiungere
un progetto o un'esperienza basta aggiungere un oggetto a un array. Niente database.

### Aggiungere un plugin Minecraft

File: [`client/src/data/projects.ts`](client/src/data/projects.ts) → array `minecraftPlugins`.

Aggiungi un oggetto con questa forma:

```ts
{
  id: 'mio-plugin',                 // identificatore univoco (usato anche nell'URL /plugin/mio-plugin)
  name: 'MioPlugin',
  version: 'v1.0.0',                // es. 'v1.0.0', 'Beta', 'Planned'
  description: 'Descrizione del plugin...',
  technologies: ['Java', 'SQLite', 'Paper'],
  githubUrl: 'https://github.com/Fl1uxxNoob/MioPlugin', // '' se non disponibile
  license: 'GPL-3.0',               // '' se non disponibile
  status: 'active',                 // vedi tabella sotto
  icon: 'cogs'                      // vedi icone disponibili sotto
}
```

**Valori di `status`** (determinano il colore del badge):

| Valore | Badge |
|--------|-------|
| `active` | verde |
| `beta` | arancione |
| `planned` | grigio ("Coming Soon") |
| `coming-soon` | grigio ("Coming Soon") |

**Icone disponibili** per il campo `icon` (mappate in `PluginsSection.tsx` e `PluginDetail.tsx`):
`shield-alt`, `user-clock`, `exchange-alt`, `cogs`, `puzzle-piece`, `gamepad`.
Se usi un valore non in elenco, viene mostrata l'icona di default (`cogs`/`Settings`).

> La card del plugin appare automaticamente nella sezione "Minecraft Plugins" della home
> e ottiene una pagina dettaglio su `/plugin/<id>`.

### Aggiungere gli screenshot di un plugin

1. Metti le immagini in [`client/public/images/`](client/public/images/) (formato PNG consigliato).
2. Apri [`client/src/pages/PluginDetail.tsx`](client/src/pages/PluginDetail.tsx) e aggiungi una
   voce all'oggetto `pluginScreenshots`, usando come **chiave l'`id` del plugin**:

```ts
const pluginScreenshots: Record<string, PluginScreenshot[]> = {
  // ...altri plugin...
  'mio-plugin': [
    {
      id: 'mio-1',
      title: 'Titolo screenshot',
      description: 'Descrizione di cosa mostra.',
      imageUrl: '/images/mio-plugin-1.png', // path relativo a client/public
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    }
  ]
};
```

Gli screenshot compaiono nella galleria/carosello della pagina `/plugin/mio-plugin`.

### Aggiungere un bot Discord

File: [`client/src/data/projects.ts`](client/src/data/projects.ts) → array `discordBots`.

```ts
{
  id: 'mio-bot',                    // univoco, usato nell'URL /bot/mio-bot
  name: 'Nome Bot',
  description: 'Descrizione del bot...',
  technologies: ['Python', 'discord.py', 'SQLite'],
  githubUrl: 'https://github.com/Fl1uxxNoob/MioBot', // '' se non disponibile
  features: [                       // mostrate nella card; [] se nessuna
    'Feature 1',
    'Feature 2'
  ],
  status: 'active'                  // 'active' | 'beta' | 'planned'
}
```

Per gli **screenshot del bot**, stessa logica dei plugin ma nel file
[`client/src/pages/BotDetail.tsx`](client/src/pages/BotDetail.tsx), oggetto `botScreenshots`
(chiave = `id` del bot, immagini in `client/public/images/`).

### Aggiungere uno screenshot alla sezione "Screenshots"

È il carosello mostrato nella home. File:
[`client/src/components/ScreenshotsSection.tsx`](client/src/components/ScreenshotsSection.tsx) → array `screenshots`.

```ts
{
  id: 'mio-screenshot',
  title: 'Titolo',
  description: 'Descrizione...',
  category: 'plugin',               // 'plugin' | 'bot'
  imageUrl: '/images/mia-img.png',
  projectName: 'NomeProgetto',
  features: ['Feature 1', 'Feature 2']
}
```

### Aggiungere un'esperienza in "Staff Experience"

File: [`client/src/pages/StaffExperience.tsx`](client/src/pages/StaffExperience.tsx) → array `staffExperiences`.

```ts
{
  id: 'nome-server',                // univoco
  role: 'Ruolo ricoperto',
  server: 'Nome Server',
  period: 'Mese Anno - Mese Anno',  // testo libero
  description: 'Descrizione del ruolo...',
  responsibilities: [               // elenco puntato "Responsibilities"
    'Responsabilità 1',
    'Responsabilità 2'
  ],
  keySkills: [                      // elenco puntato "Key Skills Developed"
    'Skill 1',
    'Skill 2'
  ],
  status: 'past',                   // 'current' (badge verde) | 'past' (badge grigio)
  icon: '🏗️'                        // una emoji a piacere
}
```

La voce appare automaticamente nella timeline della pagina `/staff-experience`.

---

## Deploy in produzione

```bash
npm run build      # compila client (-> dist/public) e server (-> dist/index.js)
npm run start      # avvia il server in modalità produzione su :5000
```

Imposta le variabili d'ambiente SMTP nell'ambiente di hosting (non un file `.env`
committato). Se il sito sta **dietro un reverse proxy** (Nginx, Caddy, ecc.), il backend
ha già `app.set("trust proxy", 1)` in [server/index.ts](server/index.ts) così il rate limit
legge l'IP reale del client.

## Note di sicurezza

- **Credenziali**: `.env` e `requests.yml` sono in `.gitignore`. Non committarli.
- **Form di contatto**: protetto da rate limit + validazione Zod lato server.
- **`requests.yml`** contiene i messaggi (incluse le email dei mittenti) come backup locale:
  trattalo come dato sensibile e non esporlo pubblicamente.
