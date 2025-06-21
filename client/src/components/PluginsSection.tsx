import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Shield, Clock, RotateCcw, Settings, Puzzle, Gamepad2, Eye } from "lucide-react";
import { Link } from "wouter";
import { minecraftPlugins } from "@/data/projects";
import MouseLight from "@/components/MouseLight";

const iconMap = {
  "shield-alt": Shield,
  "user-clock": Clock,
  "exchange-alt": RotateCcw,
  "cogs": Settings,
  "puzzle-piece": Puzzle,
  "gamepad": Gamepad2,
};

export default function PluginsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600/20 text-green-300';
      case 'beta':
        return 'bg-orange-600/20 text-orange-300';
      case 'planned':
      case 'coming-soon':
        return 'bg-gray-600/20 text-gray-300';
      default:
        return 'bg-gray-600/20 text-gray-300';
    }
  };

  return (
    <section id="plugins" className="py-20 bg-[#1e293b] interactive-section">
      <MouseLight intensity={0.1} size={500} />
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Minecraft Plugins
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {minecraftPlugins.map((plugin, index) => {
              const IconComponent = iconMap[plugin.icon as keyof typeof iconMap] || Settings;
              const isComingSoon = plugin.status === 'coming-soon' || plugin.status === 'planned';
              
              return (
                <motion.div
                  key={plugin.id}
                  className={`project-card rounded-xl p-6 transition-all duration-300 ${
                    isComingSoon ? 'opacity-60' : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: isComingSoon ? 0.6 : 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={isComingSoon ? {} : { y: -8 }}
                >
                  <div className="mb-4">
                    <IconComponent size={32} className="text-blue-400 mb-3" />
                    <h3 className="text-xl font-bold mb-2">{plugin.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(plugin.status)}`}>
                      {plugin.version}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {plugin.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {plugin.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <Link
                        href={`/plugin/${plugin.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-sm"
                      >
                        <Eye size={16} className="mr-2" />
                        Details
                      </Link>
                      {plugin.githubUrl && (
                        <a
                          href={plugin.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-sm"
                        >
                          <Github size={16} className="mr-2" />
                          GitHub
                        </a>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{plugin.license}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
