import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Mail, Code, Github, Send } from "lucide-react";
import { SiDiscord, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import MouseLight from "@/components/MouseLight";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Messaggio Inviato!",
          description: "Grazie per il tuo messaggio. Ti risponderò presto!",
        });
        
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: "Errore",
          description: result.message || "Si è verificato un errore nell'invio del messaggio.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Errore nell\'invio del messaggio:', error);
      toast({
        title: "Errore di Connessione",
        description: "Impossibile inviare il messaggio. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-[#0f172a] interactive-section">
      <MouseLight intensity={0.08} size={450} />
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Get In Touch
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-blue-300">Let's Work Together</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Whether you need a custom Minecraft plugin, Discord bot, or want to discuss a project,
                  I'm always excited to work on new challenges and bring innovative ideas to life.
                </p>
                
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <MapPin size={20} className="text-blue-400 mr-4" />
                    <span className="text-gray-300">Lombardy, Italy</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Mail size={20} className="text-blue-400 mr-4" />
                    <span className="text-gray-300">Available for Projects</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Code size={20} className="text-blue-400 mr-4" />
                    <span className="text-gray-300">Java, Python, C++, C#, JavaScript, HTML, CSS</span>
                  </motion.div>
                </div>
                
                <motion.div
                  className="mt-8 flex space-x-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <a
                    href="https://github.com/Fl1uxxNoob"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors transform hover:scale-110"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors transform hover:scale-110"
                  >
                    <SiDiscord size={20} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors transform hover:scale-110"
                  >
                    <SiLinkedin size={20} />
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="project-card rounded-xl p-8"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-[#334155] border-blue-500/30 focus:border-blue-400 text-white placeholder:text-gray-400"
                      required
                      disabled={isSubmitting}
                      minLength={2}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-[#334155] border-blue-500/30 focus:border-blue-400 text-white placeholder:text-gray-400"
                      required
                      disabled={isSubmitting}
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-[#334155] border-blue-500/30 focus:border-blue-400 text-white placeholder:text-gray-400"
                      required
                      disabled={isSubmitting}
                      minLength={3}
                      maxLength={200}
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-[#334155] border-blue-500/30 focus:border-blue-400 text-white placeholder:text-gray-400 resize-none"
                      required
                      disabled={isSubmitting}
                      minLength={10}
                      maxLength={1000}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send size={16} className="mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}