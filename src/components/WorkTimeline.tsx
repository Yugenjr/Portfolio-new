import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, BookOpen, Globe, Calendar, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { TIMELINE } from '../data';
import { playBeep } from '../utils/sfx';

export default function WorkTimeline() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-rose-500" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-cyan-500" />;
      case 'Globe': return <Globe className="w-4 h-4 text-lime-500" />;
      default: return <Briefcase className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleToggleExpand = (id: string) => {
    playBeep('click');
    setExpandedItem(prev => (prev === id ? null : id));
  };

  // Additional detail lines representing retro achievements
  const getSimulatedDetails = (id: string) => {
    switch (id) {
      case 'time-1':
        return `✦ B.TECH ACADEMIC PROGRESS & ENGAGEMENT LOG:
  • B.Tech in AI & DS (2024-28 // Sri Eshwar College of Engineering) with academic CGPA: 8.52 (up to 2nd semester).
  • Leader: HackerRank Campus Ambassador @SECE, driving weekly algorithms challenge modules.
  • Core Member of Technical Club @SECE, hosting development workshops and team bootcamps.
  • Elite Hackathon Track: Participated in 8+ hackathons, securing 3 wins and 3 finalist positions. Took 2nd place in Freshathon and ZeroDay Hackathons, and ₹5000 prize at Agentica 2.0.
  • High School Milestone: Ranked #1 in HSC (94.7%) and SSLC (93.6%) at Shanthi Rani Matriculation School.`;
      case 'time-2':
        return `✦ SYNAPSLOGIC FRONTEND SYSTEM DEPLOYMENT:
  • Produced and delivered 6+ fully responsive customer-facing React components for client systems.
  • Restructured component layout flows, collaborating with backend engineers to drop errors by 18%.
  • Implemented state-synchronized inputs, design handoffs, and lint compliant TypeScript patterns.`;
      case 'time-3':
        return `✦ GOPLUTO.AI AUTOMATION & PREDICTION ANALYTICS:
  • Incremented predictive metrics by 15% through precision hyper-parameter optimizations.
  • Hardened continuous machine learning pipeline reliability and scripted data preprocessing pipelines.
  • Developed automated model routing schemas, verifying data consistency across training batches.`;
      default:
        return `✦ Empty log registry. System processes complete.`;
    }
  };

  return (
    <section id="timeline" className="py-16 px-4 max-w-5xl mx-auto font-sans">
      {/* Title block */}
      <div className="mb-12 text-center">
        <div className="inline-block bg-cyan-300 border-4 border-black brutal-shadow px-6 py-2.5 font-mono text-xs font-black uppercase mb-3 tracking-widest leading-none">
          SYSTEM_JOURNAL.LOG
        </div>
        <h2 className="text-4xl lg:text-5xl font-black uppercase mb-3 text-black">
          Development Journey
        </h2>
        <p className="text-sm font-mono text-gray-700 max-w-xl mx-auto">
          Chronological logs reflecting career, academic foundation, and community focus. Click nodes to run deeper log analysis.
        </p>
      </div>

      {/* Timeline track container */}
      <div className="relative border-l-4 border-black pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-8 py-2">
        {TIMELINE.map((item, idx) => {
          const isExpanded = expandedItem === item.id;
          
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              key={item.id}
              className="relative group select-none"
            >
              {/* Bullet node on timeline */}
              <div 
                className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-none brutal-border bg-white flex items-center justify-center brutal-shadow-sm group-hover:bg-[#ff94e6] group-hover:scale-110 transition-transform`}
              >
                {getIcon(item.roleIcon)}
              </div>

              {/* Main Card */}
              <div 
                className="bg-white brutal-border brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all p-5"
              >
                {/* Period & Role Title */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 border-b-2 border-black pb-2 mb-4">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-black bg-yellow-200 brutal-border-sm py-1 px-2 text-black">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-600 uppercase">
                    // {item.companyOrTopic}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2 leading-none">
                  {item.title}
                </h3>

                <p className="text-xs font-medium text-gray-800 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Sub-tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-zinc-100 font-mono text-[9px] font-bold uppercase brutal-border-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expand toggler */}
                <motion.button
                  id={`timeline-toggle-${item.id}`}
                  onClick={() => handleToggleExpand(item.id)}
                  onMouseEnter={() => playBeep('hover')}
                  whileHover={{ y: -2, scale: 1.03, backgroundColor: '#22c55e', color: '#000000' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 12 }}
                  className="flex items-center gap-1 px-3 py-1 bg-black text-white font-mono text-xs font-bold border-2 border-black transition-colors cursor-pointer select-none"
                >
                  <Terminal className="w-3.5 h-3.5 text-lime-400" />
                  <span>{isExpanded ? 'CLOSE LOGS' : 'ANALYZE PROGRESS LOG'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                </motion.button>

                {/* Expanding Achievements Section */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="overflow-hidden bg-zinc-950 font-mono text-xs text-lime-400 p-4 border-2 border-black brutal-shadow-sm select-all"
                    >
                      <pre className="whitespace-pre-wrap leading-relaxed">
                        {getSimulatedDetails(item.id)}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
