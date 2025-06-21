import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Server } from "lucide-react";
import { SiDiscord } from "react-icons/si";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skills = ["Java", "Python", "C++", "C#", "JavaScript", "HTML", "CSS", "SQLite"];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Who I Am
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-blue-300">
                  Developer from Lombardy, Italy
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I'm a 19-year-old passionate developer specializing in Minecraft server development and Discord bot creation.
                  With expertise in multiple programming languages, I bring creative solutions to life through code.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  My journey in development started with a love for gaming and evolved into creating tools and experiences
                  that enhance community interaction and server management.
                </p>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative inline-block">
                  <motion.div
                    className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Code size={96} className="gradient-text" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Server size={24} className="text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <SiDiscord size={24} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
