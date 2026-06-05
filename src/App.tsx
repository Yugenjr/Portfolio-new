import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp, Terminal, Star, Sparkles, Code2, Globe, Mail } from 'lucide-react';

import Navbar from './components/Navbar';
import About from './components/About';
import TerminalShell from './components/TerminalShell';
import SkillsDashboard from './components/SkillsDashboard';
import ProjectsGrid from './components/ProjectsGrid';
import Hackathons from './components/Hackathons';
import WorkTimeline from './components/WorkTimeline';
import Guestbook from './components/Guestbook';
import ContactForm from './components/ContactForm';

import { playBeep } from './utils/sfx';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll Progress Bar calculation using motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Play system boot chime on load (with tolerance for auto-play block browser policy)
    const handleInitialInteraction = () => {
      playBeep('boot');
      window.removeEventListener('click', handleInitialInteraction);
    };
    window.addEventListener('click', handleInitialInteraction);

    // Watch active section
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Setup intersection observer
    const sectionIds = ['about', 'terminal', 'skills', 'projects', 'hackathons', 'timeline', 'guestbook', 'contact'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: '-10% 0px -30% 0px' }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInitialInteraction);
      observers.forEach((o) => {
        if (o) o.observer.disconnect();
      });
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBackToTop = () => {
    playBeep('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dots-pattern bg-stone-50 text-black flex flex-col font-sans select-none selection:bg-amber-300 selection:text-black">
      {/* Top Global Scroll Progress bar indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#ff94e6] origin-left z-[100] border-b border-black" 
        style={{ scaleX }} 
      />

      {/* Retro Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={handleScrollToSection} />

      {/* Primary Landing Main Chassis */}
      <main className="flex-1 w-full flex flex-col pt-4">
        
        {/* Section 1: About & Bio Intro */}
        <section className="relative">
          <About />
        </section>

        {/* Section 2: Command Line Emulator Shell Terminal Widget */}
        <section id="terminal" className="py-16 px-4 bg-[#c4b5fd] border-y-4 border-black relative overflow-hidden">
          <div className="absolute inset-0 bg-dots-pattern-dark opacity-10 pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <div className="mb-8 text-center text-black">
              <div className="inline-block bg-black text-lime-400 brutal-border-sm px-4 py-1.5 font-mono text-xs uppercase mb-3 tracking-wider font-bold">
                SHELL_INTERFACE.EXE
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight leading-none mb-2">
                Simulated Shell Workspace
              </h2>
              <p className="text-xs font-mono text-gray-800 max-w-lg mx-auto">
                Execute queries against the systems compiler dashboard. Click suggestion tabs or type directives into the terminal console.
              </p>
            </div>
            {/* Actual console terminal viewport */}
            <TerminalShell />
          </motion.div>
        </section>

        {/* Section 3: Technical Skills Toolset lists */}
        <section className="bg-amber-100/50 border-b-4 border-black overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
          >
            <SkillsDashboard />
          </motion.div>
        </section>

        {/* Section 4: Public github projects work showcasing */}
        <section className="bg-dots-pattern overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
          >
            <ProjectsGrid />
          </motion.div>
        </section>

        {/* Section 4.5: Competitive Hackathons Achievements */}
        <section className="bg-pink-100/30 border-t-4 border-black pb-16 overflow-hidden relative">
          <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
          >
            <Hackathons />
          </motion.div>
        </section>

        {/* Section 5: Progression Milestone Chronology timeline */}
        <section className="bg-[#a5f3fc] border-t-4 border-black pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
          >
            <WorkTimeline />
          </motion.div>
        </section>

        {/* Section 6: Persistent Guestbook messages board */}
        <section className="bg-dots-pattern border-t-4 border-black overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
          >
            <Guestbook />
          </motion.div>
        </section>

        {/* Section 7: Enquiries & Direct copier workspace portal */}
        <section className="bg-[#fed7aa]/35 border-t-4 border-black overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
          >
            <ContactForm />
          </motion.div>
        </section>

      </main>

      {/* Main Copyright Page Chassis Footer */}
      <footer className="bg-black text-white py-12 px-4 border-t-4 border-black text-center font-mono text-xs relative select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo brand copyrights */}
          <div className="flex items-center gap-3">
            <div className="p-1 px-2.5 bg-lime-400 text-black brutal-border-sm font-black font-mono select-none">
              Y_JR.EXE
            </div>
            <div className="text-left">
              <div className="font-bold text-sm uppercase text-white leading-none">Yugen Developer Portfolio</div>
              <div className="text-gray-400 text-[10px] mt-1">ESTABLISHED MCMXCVIII. ALL SYSTEMS FULLY FUNCTIONING.</div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 text-gray-400">
            <span className="text-[10px] uppercase font-bold text-gray-550 mr-1">// CONNECT LINKPORTS:</span>
            <a 
              id="footer-github"
              href="https://github.com/yugenjr" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-lime-400 hover:scale-115 transition-transform cursor-pointer"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a 
              id="footer-email"
              href="mailto:yugenjr847@gmail.com" 
              className="hover:text-[#ff94e6] hover:scale-115 transition-transform cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              id="footer-leetcode"
              href="https://leetcode.com/yugenjr847" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#ffeb3b] hover:scale-115 transition-transform cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-[10px]">
          BUILT WITH TS + REACT 19 + TAILWIND V4 + FRAMER MOTION CHASSIS © {new Date().getFullYear()}
        </div>
      </footer>

      {/* Persistent Floating Back to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bottom-6 right-6 p-3 bg-lime-400 text-black brutal-border brutal-shadow hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer z-50 rounded-none w-12 h-12 flex items-center justify-center font-black"
          onClick={handleBackToTop}
          title="Back to Desktop Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[3px]" />
        </motion.button>
      )}
    </div>
  );
}
