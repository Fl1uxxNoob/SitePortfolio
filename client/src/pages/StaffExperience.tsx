import { motion } from "framer-motion";
import { ArrowLeft, Users, Shield, Star, Calendar, MapPin, Code, Gamepad2, Settings } from "lucide-react";
import { Link } from "wouter";
import MouseLight from "@/components/MouseLight";

interface Experience {
  id: string;
  role: string;
  server: string;
  period: string;
  description: string;
  responsibilities: string[];
  keySkills: string[];
  status: 'current' | 'past';
  icon: string;
}

const staffExperiences: Experience[] = [
  {
    id: 'devroom',
    role: 'Freelancer (Minecraft Plugin Developer)',
    server: 'DevRoom',
    period: 'September 2025 - Present',
    description: 'Freelance Minecraft plugin development, building custom plugins and tailored solutions for clients.',
    responsibilities: [
      'Custom plugin development',
      'Client requirements analysis',
      'Bug fixing and maintenance',
      'Technical support'
    ],
    keySkills: [
      'Java',
      'Spigot/Paper API',
      'Problem solving',
      'Client communication'
    ],
    status: 'current',
    icon: '💻'
  },
  {
    id: 'coralmc',
    role: 'Helper Supporter',
    server: 'CoralMC',
    period: 'July 2023 - October 2023',
    description: 'Provided player support and community assistance in a growing Minecraft server environment.',
    responsibilities: [
      'Player support and assistance',
      'Community moderation',
      'Bug report handling',
      'New player guidance'
    ],
    keySkills: [
      'Customer service',
      'Problem solving',
      'Communication skills',
      'Community engagement'
    ],
    status: 'past',
    icon: '🐠'
  },
  {
    id: 'orbital-studios',
    role: 'Freelancer',
    server: 'Orbital Studios',
    period: 'September 2023 - October 2023',
    description: 'Freelance work providing specialized services and project development.',
    responsibilities: [
      'Project development',
      'Client consultation',
      'Custom solutions delivery',
      'Quality assurance'
    ],
    keySkills: [
      'Independent work',
      'Project management',
      'Client relations',
      'Technical expertise'
    ],
    status: 'past',
    icon: '🚀'
  },
  {
    id: 'redamc-redamc',
    role: 'Sr. Admin, Builder and Developer',
    server: 'RedaMC / DissoMC',
    period: 'October 2021 - June 2023 - January 2025 - May 2025',
    description: 'Senior administrative role with building and development responsibilities, managing server operations, creative projects, and custom plugin development.',
    responsibilities: [
      'Server administration',
      'Build team leadership',
      'Plugin development',
      'Staff management',
      'Server configuration'
    ],
    keySkills: [
      'Leadership',
      'Creative building',
      'Plugin development',
      'Server management',
      'Team coordination'
    ],
    status: 'past',
    icon: '🏗️'
  },
  {
    id: 'aquariusmc',
    role: 'Helper Supporter',
    server: 'AquariusMC',
    period: 'May 2022 - July 2022',
    description: 'Community support role focused on player assistance and server maintenance.',
    responsibilities: [
      'Player support',
      'Community assistance',
      'Issue resolution',
      'Server monitoring'
    ],
    keySkills: [
      'Support services',
      'Community management',
      'Conflict resolution',
      'Server knowledge'
    ],
    status: 'past',
    icon: '♒'
  },
  {
    id: 'lifemc',
    role: 'Owner',
    server: 'LifeMC',
    period: 'Period Unknown',
    description: 'Full server ownership with complete operational responsibility and strategic direction.',
    responsibilities: [
      'Complete server management',
      'Strategic planning',
      'Staff recruitment',
      'Community building'
    ],
    keySkills: [
      'Business management',
      'Strategic thinking',
      'Full-stack operations',
      'Community leadership'
    ],
    status: 'past',
    icon: '👑'
  },
  {
    id: 'gravitymc',
    role: 'Helper SS Verified',
    server: 'GravityMC',
    period: 'Period Unknown',
    description: 'Screen share verified helper role, specializing in anti-cheat operations and player verification.',
    responsibilities: [
      'Screen share verification',
      'Anti-cheat operations',
      'Player investigation',
      'Evidence collection'
    ],
    keySkills: [
      'Investigation skills',
      'Technical analysis',
      'Anti-cheat expertise',
      'Evidence handling'
    ],
    status: 'past',
    icon: '🔍'
  },
  {
    id: 'supersmashup',
    role: 'Mod+ SS Verified',
    server: 'SuperSmashUp',
    period: 'Period Unknown',
    description: 'Advanced moderation role with screen share verification capabilities for competitive gaming environment.',
    responsibilities: [
      'Advanced moderation',
      'Screen share verification',
      'Competitive integrity',
      'Staff coordination'
    ],
    keySkills: [
      'Advanced moderation',
      'Competitive gaming',
      'Verification protocols',
      'Team leadership'
    ],
    status: 'past',
    icon: '⚔️'
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
              Back to Home
            </Link>

            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Staff Experience
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                My experience as a staff member across various Minecraft servers, 
                where I developed leadership, community management, and technical skills.
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Experience Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-4xl">{experience.icon}</div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{experience.role}</h2>
                        <div className="flex items-center gap-4 text-gray-400 flex-wrap">
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
                            {experience.status === 'current' ? 'Current' : 'Past'}
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
                          Responsibilities
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

                      {/* Key Skills */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Star size={18} />
                          Key Skills Developed
                        </h3>
                        <ul className="space-y-2">
                          {experience.keySkills.map((skill, idx) => (
                            <li key={idx} className="text-gray-300 flex items-start gap-2">
                              <span className="text-purple-400 mt-1">•</span>
                              {skill}
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
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 group"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield size={24} />
              Overall Skills Developed
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <Users size={18} />
                  Leadership
                </h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Team management</li>
                  <li>• Project coordination</li>
                  <li>• Staff mentoring</li>
                  <li>• Strategic planning</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <Gamepad2 size={18} />
                  Community Management
                </h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Community moderation</li>
                  <li>• Conflict resolution</li>
                  <li>• Event organization</li>
                  <li>• Player support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <Settings size={18} />
                  Technical Skills
                </h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Server administration</li>
                  <li>• Plugin development</li>
                  <li>• Screen share verification</li>
                  <li>• System optimization</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}