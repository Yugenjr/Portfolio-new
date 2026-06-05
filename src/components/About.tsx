import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, MapPin, Sparkles, Terminal, Mail, Compass, Clock } from 'lucide-react';
import { PERSONAL_BIO } from '../data';
import { playBeep } from '../utils/sfx';
import AvatarSVG from './AvatarSVG';

export default function About() {
  const [timeStr, setTimeStr] = useState('');

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = () => {
    playBeep('click');
  };

  const codeString = `const developer = {
  name: "${PERSONAL_BIO.name}",
  stack: ["TS", "React", "Node", "Postgres"],
  hobbies: ["Compilers", "Retro SFX", "Brutalist UI"],
  focus: "Low-latency systems & visual arts",
  status: "Open for interesting opportunities"
};`;

  return (
    <section id="about" className="py-12 px-4 max-w-7xl mx-auto font-sans relative">
      {/* Absolute Decorative Grid Backdrops */}
      <div className="absolute inset-0 bg-dots-pattern opacity-60 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Card Left Span 5 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-rose-300 brutal-border brutal-shadow-lg p-6 text-black select-none relative"
          >
            {/* Corner Decorative Star */}
            <div className="absolute top-3 right-3">
              <Sparkles className="w-6 h-6 animate-spin text-black" style={{ animationDuration: '6s' }} />
            </div>

            {/* Profile Frame */}
            <div className="w-40 h-40 brutal-border bg-white brutal-shadow-sm mb-6 mx-auto overflow-hidden relative group">
              <div className="w-full h-full transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center">
                {!imageError ? (
                  <img
                    src="avatar.jpg"
                    alt={PERSONAL_BIO.name}
                    referrerPolicy="no-referrer"
                    onError={() => {
                      console.log("Locally uploaded avatar.jpg not found, falling back to fully compliant styled vector SVG.");
                      setImageError(true);
                    }}
                    className="w-full h-full object-cover group-hover:contrast-110 transition-all duration-300"
                  />
                ) : (
                  <AvatarSVG />
                )}
              </div>
              <div className="absolute inset-0 border-2 border-black pointer-events-none" />
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-center uppercase font-sans mb-1 text-black">
              {PERSONAL_BIO.name}
            </h1>
            <p className="text-center font-mono text-xs font-bold text-gray-800 border-b-2 border-black pb-4 mb-4 uppercase">
              {PERSONAL_BIO.title}
            </p>

            {/* Basic metadata */}
            <div className="flex flex-col gap-2.5 font-mono text-xs text-gray-900 bg-white/50 p-4 brutal-border-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span className="font-bold">LOCATION:</span>
                <span>{PERSONAL_BIO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600" />
                <span className="font-bold">SYSTEM TIME:</span>
                <span className="bg-black text-lime-400 px-1.5 py-0.5 brutal-border-sm font-bold text-[11px]">
                  {timeStr || '12:00:00'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-violet-600" />
                <span className="font-bold">STATUS:</span>
                <span className="text-green-800 font-extrabold">READY FOR OFFERS</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-cyan-200 brutal-border brutal-shadow p-5 flex flex-col gap-3 font-mono text-xs"
          >
            <div className="font-bold border-b-2 border-black pb-2 uppercase">[ ACTIVE DIRECTORIES ]</div>
            <div className="grid grid-cols-2 gap-2">
              <motion.a
                id="about-github"
                href={PERSONAL_BIO.github}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                onMouseEnter={() => playBeep('hover')}
                whileHover={{ y: -3, scale: 1.04, backgroundColor: '#000000', color: '#ffffff', boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 12 }}
                className="flex items-center gap-2 bg-white brutal-border-sm p-3 transition-colors cursor-pointer font-bold"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </motion.a>
              <motion.a
                id="about-leetcode"
                href={PERSONAL_BIO.leetcode}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                onMouseEnter={() => playBeep('hover')}
                whileHover={{ y: -3, scale: 1.04, backgroundColor: '#000000', color: '#ffffff', boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 12 }}
                className="flex items-center gap-2 bg-white brutal-border-sm p-3 transition-colors cursor-pointer font-bold"
              >
                <Terminal className="w-4 h-4" />
                <span>LEETCODE</span>
              </motion.a>
            </div>
            <motion.a
              id="about-email"
              href={`mailto:${PERSONAL_BIO.email}`}
              onClick={handleLinkClick}
              onMouseEnter={() => playBeep('hover')}
              whileHover={{ y: -3, scale: 1.02, backgroundColor: '#000000', color: '#ffffff', boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 12 }}
              className="flex items-center justify-center gap-2 bg-[#ffeb3b] text-black brutal-border-sm p-3 transition-colors cursor-pointer font-extrabold"
            >
              <Mail className="w-4 h-4" />
              <span>COURIER: {PERSONAL_BIO.email}</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Bio Details Right Span 7 */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white brutal-border brutal-shadow-lg p-8 relative overflow-hidden"
          >
            {/* Header tag */}
            <div className="bg-lime-300 brutal-border-sm px-3 py-1 font-mono text-xs inline-block font-bold mb-6 uppercase">
              ⚡ OVERVIEW_SPECIFICATION.md
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight uppercase leading-none mb-6">
              Engineering web logic with radical layouts and pixel precision.
            </h2>

            <div className="space-y-4 text-gray-800 text-base leading-relaxed font-sans font-medium border-b-4 border-dashed border-black pb-6 mb-6">
              <p>{PERSONAL_BIO.about}</p>
              <p>
                I thrive in structural constraints, designing code interfaces that are highly performant, accessible to users with low-spec infrastructure, and extremely developer-friendly under the hood. No mock libraries, no larping data streams—pure production-grade execution with a high-contrast style.
              </p>
            </div>

            {/* Simulated terminal file code preview */}
            <div className="bg-zinc-950 font-mono text-xs text-lime-400 p-4 brutal-border brutal-shadow-sm relative select-all">
              <div className="absolute top-2 right-3 text-[10px] text-gray-500 font-semibold">[ TS COMPILING PROFILES ]</div>
              <pre className="overflow-x-auto">{codeString}</pre>
            </div>
          </motion.div>

          {/* Core Focus cards / Stats callout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#c4b5fd] brutal-border p-5 brutal-shadow">
              <h3 className="font-extrabold font-sans text-lg uppercase mb-2">✦ Front-End Art</h3>
              <p className="text-xs font-mono text-gray-900 leading-relaxed">
                Expert in custom interface motion flows, theme specifications, fluid layout grids, and complex React state-binding.
              </p>
            </div>
            <div className="bg-amber-300 brutal-border p-5 brutal-shadow">
              <h3 className="font-extrabold font-sans text-lg uppercase mb-2">✦ Systems Logic</h3>
              <p className="text-xs font-mono text-gray-900 leading-relaxed">
                Specialized in API architecture design, database caching layers, full schema integrity, and client-side AST compiling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
