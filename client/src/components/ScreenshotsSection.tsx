import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Monitor, Bot, ExternalLink } from "lucide-react";
import MouseLight from "@/components/MouseLight";

interface Screenshot {
  id: string;
  title: string;
  description: string;
  category: 'plugin' | 'bot';
  imageUrl: string;
  projectName: string;
  features: string[];
}

const screenshots: Screenshot[] = [
  {
    id: 'afk-guard-gui',
    title: 'AFKGuard Verification System',
    description: 'Interactive GUI-based verification system with randomized block selection to prevent AFK players.',
    category: 'plugin',
    imageUrl: '/images/afk-guicheck.png',
    projectName: 'AFKGuard',
    features: ['GUI Verification', 'Random Block Selection', 'Auto-Kick System']
  },
  {
    id: 'betterclaim-management',
    title: 'BetterClaim Management GUI',
    description: 'Comprehensive land claiming interface with chunk visualization and permission management.',
    category: 'plugin',
    imageUrl: '/images/claim-gui.png',
    projectName: 'BetterClaim',
    features: ['Chunk-based Claims', 'Permission System', 'GUI Management']
  },
  {
    id: 'tnttag-arena',
    title: 'TNTtag Game',
    description: 'Multi-round game system, last one alive wins.',
    category: 'plugin',
    imageUrl: '/images/tnttag-game.png',
    projectName: 'TNTTag',
    features: ['Countdown Timer', 'Game', 'Scoreboard Live']
  },
  {
    id: 'bosscore-event',
    title: 'BossCore Event in Action',
    description: 'Live boss event with players competing and real-time hit tracking scoreboard.',
    category: 'plugin',
    imageUrl: '/images/bs-start.png',
    projectName: 'BossCore',
    features: ['Interactive Boss Events', 'Hit Tracking', 'Automated Rewards']
  },
  {
    id: 'discord-moderation',
    title: 'Discord Moderation Commands',
    description: 'Comprehensive moderation interface with slash commands and auto-moderation features.',
    category: 'bot',
    imageUrl: '/images/bot-ban.png',
    projectName: 'ModerationBot',
    features: ['Slash Commands', 'Auto-Moderation', 'Logging System']
  }
];

export default function ScreenshotsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'plugin' | 'bot'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredScreenshots = selectedCategory === 'all' 
    ? screenshots 
    : screenshots.filter(shot => shot.category === selectedCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredScreenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredScreenshots.length) % filteredScreenshots.length);
  };

  const currentScreenshot = filteredScreenshots[currentIndex];

  return (
    <section id="screenshots" className="py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b] interactive-section">
      <MouseLight intensity={0.1} size={500} />
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Screenshots & Demos
          </h2>
          
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-[#1e293b] rounded-full p-1">
              {[
                { key: 'all', label: 'All Projects', icon: Monitor },
                { key: 'plugin', label: 'Minecraft Plugins', icon: Monitor },
                { key: 'bot', label: 'Discord Bots', icon: Bot }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedCategory(key as any);
                    setCurrentIndex(0);
                  }}
                  className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === key
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#334155]'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Screenshot Carousel */}
          {currentScreenshot && (
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="project-card rounded-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Screenshot Display */}
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                      <img 
                        key={`${currentScreenshot.id}-${currentIndex}`}
                        src={currentScreenshot.imageUrl} 
                        alt={currentScreenshot.title}
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
                          <Monitor size={48} className="text-blue-400 mx-auto mb-4" />
                          <p className="text-gray-400">Screenshot Preview</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {currentScreenshot.title}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Navigation Arrows */}
                    {filteredScreenshots.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft size={20} className="text-white" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                        >
                          <ChevronRight size={20} className="text-white" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Screenshot Info */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {currentScreenshot.category === 'plugin' ? (
                        <Monitor size={24} className="text-blue-400 mr-3" />
                      ) : (
                        <Bot size={24} className="text-purple-400 mr-3" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{currentScreenshot.title}</h3>
                        <p className="text-blue-300 text-sm">{currentScreenshot.projectName}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {currentScreenshot.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-blue-300 mb-3">Key Features Shown:</h4>
                      <div className="space-y-2">
                        {currentScreenshot.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            className="flex items-center text-sm text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {currentIndex + 1} of {filteredScreenshots.length}
                      </span>
                      <button
                        onClick={() => window.open(currentScreenshot.imageUrl, '_blank')}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View Full Size
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Screenshot Indicators */}
          {filteredScreenshots.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {filteredScreenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-400' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}