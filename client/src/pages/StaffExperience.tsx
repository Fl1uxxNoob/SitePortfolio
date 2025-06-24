
import { motion } from "framer-motion";
import { ArrowLeft, Users, Shield, Star, Calendar, MapPin } from "lucide-react";
import { Link } from "wouter";
import MouseLight from "@/components/MouseLight";

interface Experience {
  id: string;
  role: string;
  server: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  status: 'current' | 'past';
  icon: string;
}

const staffExperiences: Experience[] = [
  {
    id: 'example-server',
    role: 'Sviluppatore Senior',
    server: 'EsempioNetwork',
    period: 'Gennaio 2023 - Presente',
    description: 'Responsabile dello sviluppo di plugin custom e gestione dell\'infrastruttura del server.',
    responsibilities: [
      'Sviluppo di plugin Minecraft personalizzati',
      'Manutenzione del database e ottimizzazione performance',
      'Gestione del team di sviluppo',
      'Implementazione di nuove funzionalità'
    ],
    achievements: [
      'Aumento del 40% delle performance del server',
      'Sviluppo di 5+ plugin utilizzati da 1000+ giocatori',
      'Riduzione dei bug del 60%'
    ],
    status: 'current',
    icon: '⚡'
  },
  {
    id: 'previous-server',
    role: 'Moderatore & Plugin Developer',
    server: 'VecchioServer',
    period: 'Marzo 2022 - Dicembre 2022',
    description: 'Moderazione della community e sviluppo di sistemi di automazione.',
    responsibilities: [
      'Moderazione chat e risoluzione dispute',
      'Sviluppo di bot Discord per automazione',
      'Training di nuovi staff members',
      'Gestione eventi e competizioni'
    ],
    achievements: [
      'Gestione community di 500+ membri',
      'Sviluppo sistema anti-cheat personalizzato',
      'Organizzazione di 10+ eventi di successo'
    ],
    status: 'past',
    icon: '🛡️'
  }
];

export default function StaffExperience() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MouseLight />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} />
              Torna alla Home
            </Link>

            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Staff Experience
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                La mia esperienza come staff member in diversi server Minecraft, 
                dove ho sviluppato competenze di leadership, gestione community e sviluppo.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Experiences */}
        <div className="container mx-auto px-6 pb-16">
          <div className="space-y-8">
            {staffExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Experience Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-4xl">{experience.icon}</div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{experience.role}</h2>
                        <div className="flex items-center gap-4 text-gray-400">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{experience.server}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{experience.period}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            experience.status === 'current' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {experience.status === 'current' ? 'Attuale' : 'Passato'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6">{experience.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Responsibilities */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Users size={18} />
                          Responsabilità
                        </h3>
                        <ul className="space-y-2">
                          {experience.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="text-gray-300 flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Star size={18} />
                          Risultati Ottenuti
                        </h3>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-gray-300 flex items-start gap-2">
                              <span className="text-purple-400 mt-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Gained */}
        <div className="container mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield size={24} />
              Competenze Sviluppate
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Leadership</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Gestione team di sviluppo</li>
                  <li>• Coordinamento progetti</li>
                  <li>• Mentoring junior staff</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Community Management</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Moderazione community</li>
                  <li>• Risoluzione conflitti</li>
                  <li>• Organizzazione eventi</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Sviluppo Tecnico</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Plugin development</li>
                  <li>• Database management</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
