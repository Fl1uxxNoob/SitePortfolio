import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-blue-500/20 py-8">
      <div className="container mx-auto px-6 text-center">
        <motion.p
          className="text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          &copy; 2026 Fl1uxxNoob Developer Portfolio. Site programmed entirely by Fl1uxxNoob with much love.
        </motion.p>
      </div>
    </footer>
  );
}
