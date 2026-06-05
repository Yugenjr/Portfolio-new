import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Calendar, Award, Sparkles, Plus, Star, Zap } from 'lucide-react';
import { HACKATHONS } from '../data';
import { playBeep } from '../utils/sfx';

export default function Hackathons() {
  const [selectedHack, setSelectedHack] = useState<string | null>(null);

  const getColorThemeClass = (theme: string) => {
    switch (theme) {
      case 'yellow': return 'bg-[#fff59d] hover:bg-[#fff176]';
      case 'cyan': return 'bg-[#b2ebf2] hover:bg-[#80deea]';
      case 'pink': return 'bg-[#f8bbd0] hover:bg-[#f48fb1]';
      case 'lime': return 'bg-[#e6ee9c] hover:bg-[#d4e157]';
      default: return 'bg-[#d1c4e9] hover:bg-[#b39ddb]';
    }
  };

  const borderThemes = {
    yellow: 'border-yellow-600',
    cyan: 'border-cyan-600',
    pink: 'border-pink-650',
    lime: 'border-lime-600',
    violet: 'border-violet-600',
    orange: 'border-orange-600',
  };

  return (
    <section id="hackathons" className="py-16 px-4 max-w-7xl mx-auto font-sans relative">
      {/* Neo-brutalist header */}
      <div className="mb-12 text-center select-none">
        <div className="inline-block bg-[#f472b6] border-4 border-black brutal-shadow px-6 py-2.5 font-mono text-xs font-black uppercase mb-3 tracking-widest leading-none text-black">
          HACKATHON_ARCHIVES.DLL
        </div>
        <h2 className="text-4xl lg:text-5xl font-black uppercase mb-3 text-black">
          Competitive Hackathons
        </h2>
        <p className="text-sm font-mono text-gray-700 max-w-xl mx-auto">
          Participated in 8+ high-stakes hackathons, securing 3 outright wins and 3 prestigious finalist positions. Click any arena record card to initiate telemetry inspection.
        </p>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 select-none">
        <motion.div 
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white brutal-border brutal-shadow p-5 flex items-center gap-4 text-black"
        >
          <div className="bg-yellow-300 p-3 brutal-border-sm shrink-0">
            <Trophy className="w-6 h-6 stroke-[2.5px]" />
          </div>
          <div>
            <div className="text-2xl font-black">3 VICTORIES</div>
            <div className="font-mono text-[10px] text-gray-500 uppercase">// OUTRIGHT ARENA CHAMPION</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white brutal-border brutal-shadow p-5 flex items-center gap-4 text-black"
        >
          <div className="bg-purple-300 p-3 brutal-border-sm shrink-0">
            <Award className="w-6 h-6 stroke-[2.5px]" />
          </div>
          <div>
            <div className="text-2xl font-black">3x FINALISTS</div>
            <div className="font-mono text-[10px] text-gray-500 uppercase">// NATIONAL STAGE RECOGNITION</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white brutal-border brutal-shadow p-5 flex items-center gap-4 text-black"
        >
          <div className="bg-lime-300 p-3 brutal-border-sm shrink-0">
            <Sparkles className="w-6 h-6 stroke-[2.5px]" />
          </div>
          <div>
            <div className="text-2xl font-black">8+ COMBATS</div>
            <div className="font-mono text-[10px] text-gray-500 uppercase">// ACTIVE COMPETITIVE ATHLETE</div>
          </div>
        </motion.div>
      </div>

      {/* Grid containing hackathon cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {HACKATHONS.map((hack, idx) => {
          const isSelected = selectedHack === hack.id;
          return (
            <motion.div
              key={hack.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.08, type: 'spring', damping: 20 }}
              whileHover={{ y: -6, x: -3, scale: 1.01, boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}
              onClick={() => {
                playBeep('click');
                setSelectedHack(prev => prev === hack.id ? null : hack.id);
              }}
              className={`brutal-border brutal-shadow p-5 flex flex-col justify-between transition-colors duration-200 cursor-pointer text-black ${getColorThemeClass(hack.colorTheme)}`}
            >
              <div>
                {/* Period & Award Tag */}
                <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[10px] font-black border-b-2 border-black/15 pb-2">
                  <div className="flex items-center gap-1.5 bg-black text-white px-2 py-0.5 brutal-border-sm">
                    <Calendar className="w-3 h-3 text-cyan-300" />
                    <span>{hack.period}</span>
                  </div>
                  <span className="uppercase text-gray-800 font-extrabold flex items-center gap-0.5">
                    <Zap className="w-3 h-3 text-yellow-600 fill-yellow-300" />
                    {hack.award.split(' // ')[0]}
                  </span>
                </div>

                {/* Hackathon title */}
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-2">
                  {hack.title}
                </h3>

                {/* Subtag or Prize */}
                {hack.prize && (
                  <div className="inline-block bg-white/70 text-black brutal-border-sm py-1 px-2.5 font-mono text-xs font-black uppercase mb-3.5 tracking-tight">
                    🏆 {hack.prize}
                  </div>
                )}

                {/* Detailed description */}
                <p className="text-xs font-medium text-gray-800 leading-relaxed mb-4">
                  {hack.description}
                </p>
              </div>

              <div>
                {/* Tags mapping */}
                <div className="flex flex-wrap gap-1 mt-auto">
                  {hack.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-black text-white font-mono text-[8px] font-bold uppercase tracking-wider rounded-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expanded state diagnostic logs overlay */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-3 border-t-2 border-dashed border-black/20 font-mono text-[9px] text-gray-900 leading-normal"
                    >
                      <div className="font-bold">// TELEMETRY LOG ANALYSIS //</div>
                      <div>ID: {hack.id.toUpperCase()}</div>
                      <div>CRITICALITY: SEVERE // WINNER</div>
                      <div>RATING: EXTREME</div>
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
