import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Menu, X, Command, Sparkles, Moon, Sun } from 'lucide-react';
import { playBeep, toggleGlobalMute, isMuted } from '../utils/sfx';
import { useDarkMode } from '../hooks/useDarkMode';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [muted, setMuted] = useState(isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About', color: 'bg-rose-300' },
    { id: 'terminal', label: 'Terminal', color: 'bg-cyan-300' },
    { id: 'skills', label: 'Skills', color: 'bg-lime-300' },
    { id: 'projects', label: 'Projects', color: 'bg-yellow-300' },
    { id: 'hackathons', label: 'Hackathons', color: 'bg-pink-300' },
    { id: 'timeline', label: 'Timeline', color: 'bg-purple-300' },
    { id: 'guestbook', label: 'Guestbook', color: 'bg-orange-300' },
    { id: 'contact', label: 'Contact', color: 'bg-[#ff94e6]' },
  ];

  const handleMuteToggle = () => {
    const newState = toggleGlobalMute();
    setMuted(newState);
    if (!newState) {
      playBeep('success');
    }
  };

  const handleNavClick = (id: string) => {
    playBeep('click');
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      {/* Top News Ticker */}
      <div className="w-full bg-black text-lime-400 py-1 px-4 border-b-4 border-black overflow-hidden whitespace-nowrap text-xs font-mono select-none">
        <div className="inline-block animate-[marquee_25s_linear_infinite] uppercase">
          [ SYSTEM ACTIVE ] — Welcome to Yugen's Brutalist Portfolio Workspace — Local time: {new Date().toLocaleDateString()} — Experience optimized in 60FPS — Use terminal tags or GUI menus for quick commands...
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`w-full border-b-4 border-black transition-all bg-amber-100 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo Brand */}
          <motion.button 
            id="brand-logo"
            onClick={() => handleNavClick('about')}
            onMouseEnter={() => playBeep('hover')}
            whileHover={{ y: -3, x: -1, scale: 1.02, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="flex items-center gap-2 bg-black text-white px-3 py-1.5 font-mono text-sm uppercase tracking-wider brutal-border brutal-shadow cursor-pointer font-bold"
          >
            <Command className="w-4 h-4 text-amber-300" />
            <span>YUGEN_JR.EXE</span>
          </motion.button>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  id={`nav-tab-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => playBeep('hover')}
                  whileHover={{ y: -3, scale: 1.03, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className={`px-3 py-1.5 font-semibold text-sm brutal-border cursor-pointer tracking-tight ${
                    isActive 
                      ? `${item.color} text-black brutal-shadow` 
                      : 'bg-white text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && <Sparkles className="w-3.5 h-3.5" />}
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </nav>

          {/* Sound & Mobile Toggle Actions */}
          <div className="flex items-center gap-3">
            <button
              id="btn-sound-toggle"
              onClick={handleMuteToggle}
              className="p-2 brutal-border bg-white brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-black"
              title={muted ? "Unmute Sound" : "Mute Sound"}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-green-600 animate-pulse" />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="btn-hamburger-toggle"
              onClick={() => {
                playBeep('click');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 brutal-border bg-[#c4b5fd] text-black brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:-translate-y-0 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute top-full left-0 w-full bg-amber-50 border-b-4 border-black p-6 flex flex-col gap-4 z-40 brutal-shadow lg:hidden font-sans"
          >
            <div className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold mb-1">[ MAIN INDEX NAVIGATION ]</div>
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    id={`nav-mobile-${item.id}`}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`p-3 text-left font-bold text-sm brutal-border border-2 brutal-shadow-sm flex items-center justify-between transition-all active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                      isActive ? `${item.color} text-black` : 'bg-white text-gray-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? '●' : '→'}
                  </button>
                );
              })}
            </div>
            <div className="border-t-2 border-black/10 pt-4 text-center">
              <span className="text-[10px] font-mono text-gray-500">SYSTEM ARCHITECTURE: REACT + TAILWIND V4 + SFX</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for News Ticker */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </header>
  );
}
