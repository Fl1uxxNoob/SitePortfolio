export interface MinecraftPlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  license: string;
  status: 'active' | 'beta' | 'planned' | 'coming-soon';
  icon: string;
}

export interface DiscordBot {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  features: string[];
  status: 'active' | 'beta' | 'planned';
}

export const minecraftPlugins: MinecraftPlugin[] = [
  {
    id: 'afk-guard',
    name: 'AFKGuard',
    version: 'v1.2',
    description: 'Advanced AFK detection and management system with multiple detection methods, verification system, and comprehensive logging. Features GUI-based verification and SQLite database tracking.',
    technologies: ['Java', 'SQLite', 'Spigot'],
    githubUrl: 'https://github.com/Fl1uxxNoob/AFKGuard',
    license: 'GPL-3.0',
    status: 'active',
    icon: 'user-clock'
  },
  {
    id: 'mythic-fish',
    name: 'MythicFish',
    version: 'v1.0.0',
    description: 'MythicFish is a comprehensive plugin that replaces Minecraft vanilla fishing system with a completely customized experience. Players can catch unique biome-based fish, collect them, and complete quests to earn rewards.',
    technologies: ['Java', 'SQLite', 'Spigot'],
    githubUrl: 'https://github.com/Fl1uxxNoob/MythicFish',
    license: 'GPL-3.0',
    status: 'active',
    icon: 'cogs'
  },
  {
    id: 'control-players',
    name: 'ControlPlayers',
    version: 'v1.0',
    description: 'Comprehensive player management plugin for Minecraft servers. Advanced control over player interactions, permissions, and server activities with intuitive admin tools.',
    technologies: ['Java', 'SQLite', 'Spigot', 'Discord'],
    githubUrl: 'https://github.com/Fl1uxxNoob/ControlPlayers',
    license: 'GPL-3.0',
    status: 'active',
    icon: 'cogs'
  },
  {
    id: 'better-claim',
    name: 'BetterClaim',
    version: 'v1.0.0',
    description: 'Advanced Minecraft land claiming plugin with chunk-based system, hierarchical permissions, GUI management, and SQLite database persistence. Features two-step claiming process and comprehensive protection.',
    technologies: ['Java', 'SQLite', 'Paper'],
    githubUrl: 'https://github.com/Fl1uxxNoob/BetterClaim',
    license: 'GPL-3.0',
    status: 'active',
    icon: 'shield-alt'
  },
  {
    id: 'boss-core',
    name: 'BossCore',
    version: 'v1.6',
    description: 'Interactive boss event plugin where players compete to strike the boss the most times. Features countdown timer, real-time scoreboard tracking, and automated reward distribution.',
    technologies: ['Java', 'Spigot', 'Events'],
    githubUrl: 'https://github.com/Fl1uxxNoob/BossCore',
    license: 'GPL-3.0',
    status: 'active',
    icon: 'puzzle-piece'
  },
  {
    id: 'quests-plus',
    name: 'QuestsPlus',
    version: 'Beta (75% complete)',
    description: 'This plugin allows the creation of fully customizable missions. It supports the creation of temporary, timed quests, a GUI interface and much more.',
    technologies: ['Java', 'Spigot', 'Challenges'],
    githubUrl: 'https://github.com/Fl1uxxNoob/QuestPlus',
    license: 'GPL-3.0',
    status: 'beta',
    icon: 'gamepad'
  },
  {
    id: 'tnt-tag',
    name: 'TNTTag',
    version: 'Beta',
    description: 'Classic TNTTag minigame where players pass around a TNT item and try to avoid being the holder when the timer runs out. Features multi-arena support, WorldGuard integration, and interactive GUI.',
    technologies: ['Java', 'Spigot', 'Minigame'],
    githubUrl: 'https://github.com/Fl1uxxNoob/TNTtag',
    license: 'GPL-3.0',
    status: 'beta',
    icon: 'gamepad'
  },
  {
    id: 'death-swap',
    name: 'DeathSwap',
    version: 'Beta',
    description: 'Exciting Minecraft minigame plugin where players randomly swap positions! Features spectator mode, customizable intervals, and comprehensive game management with team support.',
    technologies: ['Java', 'Spigot', 'Minigame'],
    githubUrl: 'https://github.com/Fl1uxxNoob/DeathSwap',
    license: 'GPL-3.0',
    status: 'beta',
    icon: 'exchange-alt'
  },
  {
    id: 'custom-entity',
    name: 'CustomEntity',
    version: 'Planned',
    description: 'This plugin allows the creation of custom entities, such as bosses, with all customizable parameters and behaviors.',
    technologies: ['Java', 'Spigot', 'Entities'],
    githubUrl: '',
    license: '',
    status: 'planned',
    icon: 'exchange-alt'
  }
];

export const discordBots: DiscordBot[] = [
  {
    id: 'moderation-bot',
    name: 'Discord Moderation Bot',
    description: 'Professional Discord moderation bot built in Python with slash commands, auto-moderation, and detailed logging. Features complete moderation suite, SQLite database, and hierarchical permissions.',
    technologies: ['Python', 'discord.py', 'SQLite'],
    githubUrl: 'https://github.com/Fl1uxxNoob/ModerationBotDiscord',
    features: [
      'Complete Moderation Suite',
      'Auto-Moderation System',
      'Comprehensive Logging',
      'Permission System',
      'SQLite Database'
    ],
    status: 'active'
  },
  {
    id: 'music-bot',
    name: 'Music Bot',
    description: 'High-quality music bot with playlist support, queue management, and audio effects. Supporting multiple platforms and premium audio quality.',
    technologies: ['Python', 'Audio'],
    githubUrl: '',
    features: [],
    status: 'planned'
  },
  {
    id: 'analytics-bot',
    name: 'Analytics Bot',
    description: 'Server analytics and statistics bot with detailed insights, member activity tracking, and comprehensive reporting features.',
    technologies: ['Python', 'Analytics'],
    githubUrl: '',
    features: [],
    status: 'planned'
  }
];
