import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, GitFork, ExternalLink, Github, Sparkles, Filter } from 'lucide-react';
import { PROJECTS } from '../data';
import { playBeep } from '../utils/sfx';

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<'all' | 'Full-Stack Development' | 'Machine Learning' | 'AI Applications'>('all');
  const [starredProjects, setStarredProjects] = useState<Record<string, boolean>>({});
  const [localStars, setLocalStars] = useState<Record<string, number>>(
    PROJECTS.reduce((acc, curr) => {
      acc[curr.id] = curr.stars || 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const categories = ['all', 'Full-Stack Development', 'Machine Learning', 'AI Applications'] as const;

  const handleStarClick = (id: string, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isStarred = starredProjects[id];
    setStarredProjects(prev => ({ ...prev, [id]: !isStarred }));
    
    if (!isStarred) {
      playBeep('success');
      setLocalStars(prev => ({ ...prev, [id]: prev[id] + 1 }));
    } else {
      playBeep('click');
      setLocalStars(prev => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const getThemeClass = (theme: string) => {
    switch (theme) {
      case 'cyan': return 'theme-cyan';
      case 'lime': return 'theme-lime';
      case 'pink': return 'theme-pink';
      case 'violet': return 'theme-violet';
      case 'yellow': return 'theme-yellow';
      case 'orange': return 'theme-orange';
      default: return 'bg-white';
    }
  };

  return (
    <section id="projects" className="py-16 px-4 max-w-7xl mx-auto font-sans">
      {/* Title block */}
      <div className="mb-10 text-center relative">
        <div className="inline-block bg-yellow-300 border-4 border-black brutal-shadow px-6 py-2.5 font-mono text-xs font-black uppercase mb-3 tracking-widest leading-none">
          REPOSITORY REGISTRY
        </div>
        <h2 className="text-4xl lg:text-5xl font-black uppercase mb-3 text-black">
          Selected Code Work
        </h2>
        <p className="text-sm font-mono text-gray-700 max-w-xl mx-auto">
          Production systems, lightweight tooling, sandboxed debuggers, and visual UI templates. Directly connected through GitHub profiles.
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-10 border-4 border-black bg-zinc-100 p-3 brutal-shadow font-mono text-xs">
        <span className="font-bold flex items-center gap-1.5 px-3 py-1 bg-black text-white brutal-border-sm select-none">
          <Filter className="w-3.5 h-3.5" />
          FILTER PIPELINES:
        </span>
        {categories.map((cat) => (
          <button
            id={`btn-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            key={cat}
            onClick={() => {
              playBeep('click');
              setFilter(cat);
            }}
            className={`px-3 py-1.5 font-bold brutal-border-sm hover:translate-y-[-1px] transition-all cursor-pointer ${
              filter === cat 
                ? 'bg-[#c4b5fd] text-black brutal-shadow-sm font-black' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat === 'all' ? 'SHOW ALL' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Bento Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, idx) => {
            const isStarred = starredProjects[p.id];
            const starCount = localStars[p.id];
            const themeBg = getThemeClass(p.colorTheme);

            return (
              <motion.article
                id={`project-card-${p.id}`}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                whileHover={{ y: -6, x: -3, scale: 1.01, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                transition={{ type: 'spring', damping: 15 }}
                key={p.id}
                className={`${themeBg} brutal-border brutal-shadow flex flex-col p-6 text-black relative select-none`}
              >
                {/* Featured star stamp */}
                {p.featured && (
                  <div className="absolute top-3 right-3 bg-black text-white border border-white p-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-lime-400" />
                    <span>POPULAR</span>
                  </div>
                )}

                {/* Tagline */}
                <span className="font-mono text-[10px] font-bold text-gray-800 uppercase tracking-widest border-b border-black pb-2 mb-4 block">
                  // {p.category}
                </span>

                <h3 className="text-2xl font-extrabold uppercase leading-none tracking-tight mb-3">
                  {p.title}
                </h3>

                <p className="text-xs font-medium text-gray-800 leading-relaxed flex-1 mb-6">
                  {p.description}
                </p>

                {/* Pills technologies list with tiny borders */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 bg-white font-mono text-[9px] font-bold uppercase brutal-border-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom line: repos links and github statistics */}
                <div className="flex items-center justify-between border-t border-black pt-4">
                  <div className="flex items-center gap-1">
                    {/* Interactive Star Toggle */}
                    <button
                      id={`project-star-${p.id}`}
                      onClick={(e) => handleStarClick(p.id, e)}
                      onMouseEnter={() => playBeep('hover')}
                      className={`flex items-center gap-1 brutality py-1 px-2.5 text-[11px] font-mono font-bold brutal-border-sm hover:translate-y-[-1px] transition-all cursor-pointer ${
                        isStarred ? 'bg-[#ff94e6] text-black shadow-sm' : 'bg-white hover:bg-gray-50 text-gray-800'
                      }`}
                      title={isStarred ? "Starred!" : "Click to Star Project"}
                    >
                      <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-black text-black' : 'text-gray-700'}`} />
                      <span>{starCount}</span>
                    </button>

                    {/* Sim forks indicators */}
                    <span className="flex items-center gap-1 py-1 px-2 font-mono text-[11px] text-gray-800 bg-white/40 brutal-border-sm select-none">
                      <GitFork className="w-3.5 h-3.5 text-gray-800" />
                      <span>{p.forks || 0}</span>
                    </span>
                  </div>

                  {/* Actions links buttons */}
                  <div className="flex gap-1.5">
                    <a
                      id={`project-link-github-${p.id}`}
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playBeep('click')}
                      onMouseEnter={() => playBeep('hover')}
                      className="p-1.5 bg-white brutal-border-sm hover:bg-black hover:text-white transition-all cursor-pointer"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {p.demoUrl && (
                      <a
                        id={`project-link-demo-${p.id}`}
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playBeep('click')}
                        onMouseEnter={() => playBeep('hover')}
                        className="p-1.5 bg-[#fef08a] brutal-border-sm hover:bg-black hover:text-white transition-all cursor-pointer"
                        title="Live Application Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
