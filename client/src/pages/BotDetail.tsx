import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Bot, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { discordBots } from "@/data/projects";
import MouseLight from "@/components/MouseLight";

interface BotScreenshot {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

// Screenshots per i bot Discord
const botScreenshots: Record<string, BotScreenshot[]> = {
  'moderation-bot': [
    {
      id: 'mod-1',
      title: 'Bot commands',
      description: 'Help interface showing all the commands, also you can elaborate by typing "/help <command>".',
      imageUrl: '/images/bot-help.png',
      features: ['Slash commands', 'Ban/Kick system', 'Temporary Wetsuits', 'Warn system']
    },
    {
      id: 'mod-2',
      title: 'Logging Dashboard',
      description: 'Advanced logging system that tracks all moderation actions and server events.',
      imageUrl: '/images/bot-log.png',
      features: ['Log Dettagliati', 'Filtri per Categoria', 'Export Dati', 'Statistiche']
    },
    {
      id: 'mod-3',
      title: 'Self-Moderation',
      description: 'Automatic moderation system with spam filters, caps, banned words and repeated words.',
      imageUrl: '/images/bot-automod.png',
      features: ['Anti-Spam', 'Word Filter', 'Repeat Protection', 'Caps Protection']
    }
  ]
};

export default function BotDetail() {
  const { botId } = useParams();
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  const bot = discordBots.find(b => b.id === botId);
  const screenshots = botScreenshots[botId || ''] || [];
  
  if (!bot) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bot non trovato</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
    setImageError(false);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
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
              {bot.githubUrl && (
                <a
                  href={bot.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Github size={16} className="mr-2" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Bot Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl mb-6">
            <Bot className="mx-auto text-purple-400" size={80} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {bot.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            {bot.description}
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              bot.status === 'active' ? 'bg-green-900 text-green-300' :
              bot.status === 'beta' ? 'bg-yellow-900 text-yellow-300' :
              'bg-blue-900 text-blue-300'
            }`}>
              {bot.status === 'active' ? 'Active' :
               bot.status === 'beta' ? 'Beta' : 'In Development'}
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
                    {screenshots[currentScreenshot]?.imageUrl && !imageError ? (
                      <img
                        src={screenshots[currentScreenshot].imageUrl}
                        alt={screenshots[currentScreenshot].title}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-center">
                        <div>
                          <Bot size={48} className="text-purple-400 mx-auto mb-4" />
                          <p className="text-gray-400 text-lg font-medium">
                            {screenshots[currentScreenshot]?.title || 'Screenshot'}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            {currentScreenshot + 1} di {screenshots.length}
                          </p>
                          {imageError && (
                            <p className="text-xs text-red-400 mt-2">
                              Immagine non disponibile
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Navigation Arrows */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevScreenshot}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors z-10"
                      >
                        <ChevronLeft size={24} className="text-white" />
                      </button>
                      <button
                        onClick={nextScreenshot}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors z-10"
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
                    <h4 className="text-lg font-semibold text-purple-300 mb-4">
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
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-4"></div>
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
                    onClick={() => {
                      setCurrentScreenshot(index);
                      setImageError(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentScreenshot ? 'bg-purple-400' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Bot Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            All Features
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {bot.features.map((feature, index) => (
              <motion.div
                key={feature}
                className="project-card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-4"></div>
                  <span className="text-gray-200 font-medium">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="project-card p-8">
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {bot.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium"
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
                <span className="text-purple-300 font-medium">Status: </span>
                {bot.status === 'active' ? 'Active and Maintained' :
                 bot.status === 'beta' ? 'In Beta Testing' : 'In Development'}
              </div>
              <div>
                <span className="text-purple-300 font-medium">Type: </span>
                Moderation Discord Bot
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}