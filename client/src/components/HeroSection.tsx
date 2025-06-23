import { motion } from "framer-motion";
import { ChevronDown, Github } from "lucide-react";
import { SiDiscord, SiLinkedin } from "react-icons/si";
import MouseLight from "@/components/MouseLight";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero-bg min-h-screen flex items-center justify-center relative interactive-section">
      <div className="animated-bg">
        <div className="floating-light"></div>
        <div className="floating-light"></div>
        <div className="floating-light"></div>
        <div className="floating-light"></div>
        <div className="floating-light"></div>
        <div className="floating-light"></div>
      </div>
      <MouseLight intensity={0.2} size={800} />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">Fl1uxxNoob</span>
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-4xl font-bold text-blue-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dveloper Minecraft & Discord
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Creating custom Minecraft servers, innovative plugins and advanced Discord bots.
            Transforming your ideas into digital reality.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => scrollToSection("plugins")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Discover My Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="border-2 border-blue-500 hover:bg-blue-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Me
            </button>
          </motion.div>
          
          <motion.div
            className="flex justify-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <a
              href="https://github.com/Fl1uxxNoob"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Github size={32} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <SiDiscord size={32} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <SiLinkedin size={32} />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} className="text-blue-400" />
      </motion.div>
    </section>
  );
}
