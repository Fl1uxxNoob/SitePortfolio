import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Shield, Bot, ChartBar, Music, Clock, Lightbulb, Eye } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Link } from "wouter";
import { discordBots } from "@/data/projects";
import MouseLight from "@/components/MouseLight";

export default function BotsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <SiDiscord size={32} className="text-blue-400" />;
      case 'planned':
        return <Lightbulb size={32} className="text-blue-400" />;
      default:
        return <Clock size={32} className="text-blue-400" />;
    }
  };

  const mainBot = discordBots[0];
  const futureBot = discordBots.slice(1);

  return (
    <section id="bots" className="py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a] interactive-section">
      <MouseLight intensity={0.12} size={600} />
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Discord Bots
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Main Discord Bot */}
            <motion.div
              className="project-card rounded-xl p-8 mb-8 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <SiDiscord size={48} className="text-blue-400 mr-4" />
                    <div>
                      <h3 className="text-2xl font-bold">{mainBot.name}</h3>
                      <span className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {mainBot.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mainBot.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link
                      href={`/bot/${mainBot.id}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Eye size={16} className="mr-2" />
                      Details
                    </Link>
                    <a
                      href={mainBot.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Github size={16} className="mr-2" />
                      GitHub
                    </a>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 text-blue-300">Key Features</h4>
                    <div className="space-y-3 text-sm text-gray-300">
                      {mainBot.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        >
                          <Shield size={16} className="text-blue-400 mr-3" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Future Bot Projects */}
            <div className="grid md:grid-cols-2 gap-6">
              {futureBot.map((bot, index) => (
                <motion.div
                  key={bot.id}
                  className="project-card rounded-xl p-6 transition-all duration-300 opacity-60"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  <div className="mb-4">
                    {getStatusIcon(bot.status)}
                    <h3 className="text-xl font-bold mb-2 mt-3">{bot.name}</h3>
                    <span className="bg-gray-600/20 text-gray-300 px-2 py-1 rounded text-xs">
                      {bot.status === 'planned' ? 'Planned' : 'Concept'}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {bot.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {bot.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <span className="text-gray-500 text-sm flex items-center">
                    <Lightbulb size={16} className="mr-2" />
                    {bot.status === 'planned' ? 'In Planning' : 'Concept Phase'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
