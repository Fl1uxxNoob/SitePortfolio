import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Download, Star, ChevronLeft, ChevronRight, Shield, Clock, RotateCcw, Settings, Puzzle, Gamepad2 } from "lucide-react";
import { useState } from "react";
import React from "react";
import { minecraftPlugins } from "@/data/projects";
import MouseLight from "@/components/MouseLight";

interface PluginScreenshot {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

// Icon mapping object
const iconMap = {
  "shield-alt": Shield,
  "user-clock": Clock,
  "exchange-alt": RotateCcw,
  "cogs": Settings,
  "puzzle-piece": Puzzle,
  "gamepad": Gamepad2,
};

// Esempi di screenshot per ogni plugin - qui puoi aggiungere le tue foto
const pluginScreenshots: Record<string, PluginScreenshot[]> = {
  'afk-guard': [
    {
      id: 'afk-1',
      title: 'GUI Verification System',
      description: 'Main interface of the verification system with random blocks to be selected to confirm that the player is not AFK.',
      imageUrl: '/images/afk-guicheck.png',
      features: ['Interactive GUI', 'Random Selection', 'Anti-Bot Protection']
    },
    {
      id: 'afk-2',
      title: 'User history management',
      description: 'Verify through a database all actions performed to the user.',
      imageUrl: '/images/afk-hist.png',
      features: ['Activity log', 'Staff command', 'Punitive Actions']
    },
    {
      id: 'afk-3',
      title: 'Notification System',
      description: 'In-game notifications to alert players when they are about to be checked for AFKs.',
      imageUrl: '/images/afk-alert.png',
      features: ['Chat Notifications', 'Action Bar', 'Custom Sounds']
    }
  ],
  'mythic-fish': [
    {
      id: 'mythicfish-1',
      title: 'New fish unlocked',
      description: 'Ability to catch new fish of different rarity and they will be added to one\'s fish collection.',
      imageUrl: '/images/myf-new.png',
      features: ['New Fish', 'Fishing', 'Fortune System']
    },
    {
      id: 'mythicfish-2',
      title: 'Collection GUI',
      description: 'This is an example of a collection GUI for managing fish caught and to be unlocked.',
      imageUrl: '/images/myf-collect.png',
      features: ['Collection Management', 'Fish Rarity', 'User Interface']
    },
    {
      id: 'mythicfish-3',
      title: 'Quests GUI',
      description: 'This is an example of a quests GUI for managing fishing quests.',
      imageUrl: '/images/myf-quest.png',
      features: ['Quest Management', 'Fishing Goals', 'User Interface']
    }
  ],
  'control-players': [
    {
      id: 'control-1',
      title: 'Main Control Panel',
      description: 'Help interface for player management via discord bot.',
      imageUrl: '/images/cp-help.png',
      features: ['Remote Control', 'Manage Player', 'View Statistics']
    },
    {
      id: 'control-2',
      title: 'Ban example',
      description: 'This is an example of banning via discord bots.',
      imageUrl: '/images/cp-ban.png',
      features: ['Moderation', 'Ban']
    }
  ],
  'better-claim': [
    {
      id: 'claim-1',
      title: 'Claim GUI interface',
      description: 'Chunk-based claim system with graphical display and simplified protection management.',
      imageUrl: '/images/claim-gui.png',
      features: ['Claim Chunk-based', 'Graphic Visualization', 'Permit Management']
    },
    {
      id: 'claim-2',
      title: 'Management Flags',
      description: 'Ability to edit each flag of your claim via GUI.',
      imageUrl: '/images/claim-flagsgui.png',
      features: ['Management Flags', 'Gestion with GUI']
    },
    {
      id: 'claim-3',
      title: 'Alert Entry Claim',
      description: 'The plugin alerts you when you are entering or exiting a claim by sending a chat message.',
      imageUrl: '/images/claim-alert.png',
      features: ['Entry Message', 'Exit message', 'Claim info']
    },
    {
      id: 'claim-3',
      title: 'Admin GUI',
      description: 'Through this GUI, admins can manage server claims and view statistics.',
      imageUrl: '/images/claim-adgui.png',
      features: ['Management', 'GUI for admin', 'Claim info']
    }
  ],
  'tnt-tag': [
    {
      id: 'tnttag-1',
      title: 'TNTtag Game',
      description: 'Multi-round game system, last one alive wins.',
      imageUrl: '/images/tnttag-game.png',
      features: ['Countdown Timer', 'Game', 'Scoreboard Live']
    },
    {
      id: 'tnttag-2',
      title: 'TNTtag GUI',
      description: 'Very simple Gui to allow all users to manage the plugin smoothly.',
      imageUrl: '/images/tnttag-gui.png',
      features: ['GUI', 'Management', 'Game Rules']
    },
    {
      id: 'tnttag-3',
      title: 'Multi-Arena Support',
      description: 'Support for multiple arenas with individual configuration, custom spawn points and automatic lobby management.',
      imageUrl: '/images/tnttag-arenas.png',
      features: ['Multiple Arenas', 'Custom Spawn', 'Individual Configuration']
    }
  ],
  'boss-core': [
    {
      id: 'bosscore-1',
      title: 'Game Mechanics Documentation',
      description: 'BossCore is a plugin for Minecraft that allows players to compete against a boss: players must hit the boss as many times as possible to finish first. The plugin probably keeps track of the hits struck by players and determines a winner based on the number of hits..',
      imageUrl: '/images/bs-start.png',
      features: ['Start of the event', 'Ranking', 'Boss']
    },
    {
      id: 'bosscore-2',
      title: 'Boss skills',
      description: 'The boss repels all players depending on how many total hits he receives.',
      imageUrl: '/images/bs-ability.png',
      features: ['Skills', 'Hit', 'Boss', 'Random']
    },
    {
      id: 'bosscore-3',
      title: 'Winning system',
      description: 'At the end of the event the plugin prints in chat the ranking of the top 3 players who will receive a prize chosen in the config.',
      imageUrl: '/images/bs-win.png',
      features: ['Win ranking', 'Rewards', 'Competition']
    }
  ]
};

export default function PluginDetail() {
  const { pluginId } = useParams();
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  
  const plugin = minecraftPlugins.find(p => p.id === pluginId);
  const screenshots = pluginScreenshots[pluginId || ''] || [];
  
  if (!plugin) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plugin non trovato</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white interactive-section">
      <MouseLight intensity={0.15} size={600} />
      
      {/* Header */}
      <div className="sticky top-0 bg-[#0f172a]/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Portfolio
            </Link>
            <div className="flex items-center space-x-4">
              <a
                href={plugin.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Github size={16} className="mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Plugin Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl mb-6">
            {iconMap[plugin.icon as keyof typeof iconMap] ? 
              React.createElement(iconMap[plugin.icon as keyof typeof iconMap], { size: 96, className: "mx-auto text-blue-400" }) : 
              <div className="text-blue-400">{plugin.icon}</div>
            }
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {plugin.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            {plugin.description}
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <span className="flex items-center">
              <Star size={16} className="mr-2 text-yellow-400" />
              Version {plugin.version}
            </span>
            <span>License: {plugin.license}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              plugin.status === 'active' ? 'bg-green-900 text-green-300' :
              plugin.status === 'beta' ? 'bg-yellow-900 text-yellow-300' :
              'bg-blue-900 text-blue-300'
            }`}>
              {plugin.status === 'active' ? 'Active' :
               plugin.status === 'beta' ? 'Beta' : 'In Development'}
            </span>
          </div>
        </motion.div>

        {/* Screenshots Section */}
        {screenshots.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
              Screenshots & Features
            </h2>
            
            <div className="project-card rounded-xl overflow-hidden max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Screenshot Display */}
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                    <img 
                      key={`${screenshots[currentScreenshot]?.id}-${currentScreenshot}`}
                      src={screenshots[currentScreenshot]?.imageUrl} 
                      alt={screenshots[currentScreenshot]?.title}
                      className="w-full h-full object-contain"
                      onLoad={(e) => {
                        // Show image when it loads successfully
                        e.currentTarget.style.display = 'block';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'none';
                      }}
                      onError={(e) => {
                        // Show fallback when image fails to load
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-center" style={{ display: 'none' }}>
                      <div>
                        <div className="text-6xl mb-4">
                          {iconMap[plugin.icon as keyof typeof iconMap] ? 
                            React.createElement(iconMap[plugin.icon as keyof typeof iconMap], { size: 64, className: "mx-auto text-blue-400" }) : 
                            <div className="text-blue-400">{plugin.icon}</div>
                          }
                        </div>
                        <p className="text-gray-400 text-lg font-medium">
                          {screenshots[currentScreenshot]?.title || 'Screenshot'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {currentScreenshot + 1} di {screenshots.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevScreenshot}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
                      >
                        <ChevronLeft size={24} className="text-white" />
                      </button>
                      <button
                        onClick={nextScreenshot}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
                      >
                        <ChevronRight size={24} className="text-white" />
                      </button>
                    </>
                  )}
                </div>

                {/* Screenshot Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">
                    {screenshots[currentScreenshot]?.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {screenshots[currentScreenshot]?.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-blue-300 mb-4">
                      Features Shown:
                    </h4>
                    <div className="space-y-3">
                      {screenshots[currentScreenshot]?.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          className="flex items-center text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot Indicators */}
            {screenshots.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshot(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentScreenshot ? 'bg-blue-400' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Technical Details */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="project-card p-8">
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {plugin.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="project-card p-8">
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Project Information
            </h3>
            <div className="space-y-4 text-gray-300">
              <div>
                <span className="text-blue-300 font-medium">Status: </span>
                {plugin.status === 'active' ? 'Active and Maintained' :
                 plugin.status === 'beta' ? 'In Beta Testing' : 'In Development'}
              </div>
              <div>
                <span className="text-blue-300 font-medium">Version: </span>
                {plugin.version}
              </div>
              <div>
                <span className="text-blue-300 font-medium">License: </span>
                {plugin.license}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}