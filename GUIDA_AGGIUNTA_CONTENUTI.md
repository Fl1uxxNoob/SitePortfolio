# Guida: Come Aggiungere Nuovi Plugin e Bot

## 📋 Panoramica
Questa guida ti spiega come aggiungere facilmente nuovi plugin Minecraft e bot Discord al tuo portfolio, incluse le foto e descrizioni dettagliate.

## 🔧 1. Aggiungere un Nuovo Plugin Minecraft

### Passo 1: Aggiungere i Dati del Plugin
Vai al file `client/src/data/projects.ts` e aggiungi il tuo plugin nell'array `minecraftPlugins`:

```typescript
{
  id: 'nome-plugin',           // ID univoco (usato per l'URL)
  name: 'Nome Plugin',         // Nome visualizzato
  version: '1.0.0',           // Versione corrente
  description: 'Descrizione breve del plugin', // Descrizione principale
  technologies: ['Java', 'Spigot', 'MySQL'],  // Tecnologie usate
  githubUrl: 'https://github.com/tuousername/plugin', // Link GitHub
  license: 'MIT',             // Tipo di licenza
  status: 'active',           // 'active', 'beta', 'planned', 'coming-soon'
  icon: '🛡️'                  // Emoji per l'icona
}
```

### Passo 2: Aggiungere Screenshots e Sezioni Dettagliate
Nel file `client/src/pages/PluginDetail.tsx`, trova l'oggetto `pluginScreenshots` e aggiungi:

```typescript
'nome-plugin': [  // Stesso ID del plugin
  {
    id: 'screenshot-1',
    title: 'Titolo Screenshot',
    description: 'Descrizione dettagliata di cosa mostra questo screenshot e come funziona la funzionalità.',
    imageUrl: '/api/placeholder/800/500',  // Sostituisci con il percorso della tua immagine
    features: ['Funzionalità 1', 'Funzionalità 2', 'Funzionalità 3']
  },
  {
    id: 'screenshot-2',
    title: 'Secondo Screenshot',
    description: 'Altra descrizione dettagliata...',
    imageUrl: '/api/placeholder/800/500',
    features: ['Altra funzionalità', 'Sistema avanzato', 'Configurazione']
  }
  // Aggiungi tutti gli screenshot che vuoi
]
```

## 🤖 2. Aggiungere un Nuovo Bot Discord

### Passo 1: Aggiungere i Dati del Bot
Nel file `client/src/data/projects.ts`, aggiungi il bot nell'array `discordBots`:

```typescript
{
  id: 'nome-bot',
  name: 'Nome Bot',
  description: 'Descrizione del bot Discord',
  technologies: ['JavaScript', 'Discord.js', 'Node.js'],
  githubUrl: 'https://github.com/tuousername/bot',
  features: [
    'Funzionalità 1',
    'Funzionalità 2',
    'Sistema di moderazione',
    'Comandi personalizzati'
  ],
  status: 'active'  // 'active', 'beta', 'planned'
}
```

### Passo 2: Aggiungere Screenshots del Bot
Nel file `client/src/pages/BotDetail.tsx`, aggiungi nell'oggetto `botScreenshots`:

```typescript
'nome-bot': [
  {
    id: 'bot-screenshot-1',
    title: 'Interfaccia Comandi',
    description: 'Screenshot dei comandi principali del bot con esempi di utilizzo.',
    imageUrl: '/api/placeholder/800/500',
    features: ['Comandi Slash', 'Autocompletamento', 'Permessi']
  }
  // Altri screenshot...
]
```

## 📸 3. Gestione delle Immagini

### Opzione A: Immagini Locali
1. Crea una cartella `public/images/` nella root del progetto
2. Salva le tue immagini in questa cartella
3. Sostituisci `/api/placeholder/800/500` con `/images/nome-immagine.png`

### Opzione B: Immagini Esterne
Usa URL diretti di immagini hostati online:
```typescript
imageUrl: 'https://esempio.com/mia-immagine.png'
```

## 🎨 4. Personalizzazione Visiva

### Stati dei Progetti
- `'active'`: Verde - Progetto attivo e mantenuto
- `'beta'`: Arancione - In fase di testing
- `'planned'`: Grigio - Pianificato per il futuro
- `'coming-soon'`: Blu - Prossimamente

### Icone Plugin
Usa emoji per rappresentare i tuoi plugin:
- 🛡️ Per plugin di protezione
- ⚡ Per plugin di utilità
- 🎮 Per plugin di gioco
- 🔧 Per plugin di amministrazione

## 🚀 5. Esempio Completo

Ecco un esempio completo di come aggiungere un nuovo plugin:

### In `data/projects.ts`:
```typescript
{
  id: 'anti-cheat-pro',
  name: 'AntiCheat Pro',
  version: '2.1.0',
  description: 'Sistema avanzato di anti-cheat con machine learning per detection automatica.',
  technologies: ['Java', 'Spigot', 'MySQL', 'Redis'],
  githubUrl: 'https://github.com/fl1uxxnoob/anticheat-pro',
  license: 'GPL-3.0',
  status: 'active',
  icon: '🔒'
}
```

### In `PluginDetail.tsx`:
```typescript
'anti-cheat-pro': [
  {
    id: 'detection-system',
    title: 'Sistema di Detection ML',
    description: 'Il sistema di machine learning analizza i pattern di movimento dei giocatori per identificare automaticamente comportamenti sospetti e possibili cheat.',
    imageUrl: '/images/anticheat-detection.png',
    features: ['Machine Learning', 'Pattern Analysis', 'Auto-Ban', 'False Positive Prevention']
  },
  {
    id: 'admin-dashboard',
    title: 'Dashboard Amministratore',
    description: 'Interfaccia completa per la gestione delle segnalazioni, revisione dei ban e configurazione dei parametri di detection.',
    imageUrl: '/images/anticheat-dashboard.png',
    features: ['Gestione Ban', 'Statistiche Real-time', 'Log Dettagliati', 'Configurazione Avanzata']
  }
]
```

## 📝 6. Consigli per le Descrizioni

### Per i Plugin:
- Spiega chiaramente il problema che risolve
- Menciona le funzionalità uniche
- Includi esempi di utilizzo
- Specifica la compatibilità (versioni Minecraft/Spigot)

### Per i Bot:
- Descrivi i comandi principali
- Spiega come migliora l'esperienza del server
- Menciona l'integrazione con altri bot
- Includi esempi di configurazione

## 🔄 7. Aggiornamento del Portfolio

Dopo aver aggiunto nuovi contenuti:

1. Testa la navigazione cliccando sui link "Dettagli"
2. Verifica che tutti gli screenshot si carichino correttamente
3. Controlla che le animazioni funzionino
4. Aggiorna il file `replit.md` con le modifiche

## 📞 Supporto

Se hai domande o problemi:
1. Controlla che tutti gli ID siano univoci
2. Verifica la sintassi del codice
3. Assicurati che le immagini esistano nel percorso specificato
4. Controlla la console del browser per eventuali errori