import { useState } from 'react';
import { motion } from 'motion/react';
import { Layout, Server, Terminal, Sliders, Gauge, Lightbulb } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';
import { playBeep } from '../utils/sfx';

export default function SkillsDashboard() {
  // Focus Sliders representing desired focus of work
  const [frontendDesire, setFrontendDesire] = useState(80);
  const [backendDesire, setBackendDesire] = useState(70);
  const [devopsDesire, setDevopsDesire] = useState(50);

  // Computations for full stack compat
  const avgSkillLvl = 85.4; // constant aggregate average skill
  const desireSum = frontendDesire + backendDesire + devopsDesire;
  const maxDesireSum = 300;
  
  // Calculate synthetic affinity
  const matchRating = Math.round(
    ((desireSum / maxDesireSum) * 45 + (100 - Math.abs(frontendDesire - backendDesire) * 0.45) * 0.55)
  );

  const getAffinityExplanation = () => {
    if (frontendDesire > 85 && backendDesire < 50) {
      return {
        role: "High-Fidelity Visual Dev",
        text: "Perfect match for interactive visual products, animations, SaaS interfaces, and clean responsive CSS workflows."
      };
    }
    if (backendDesire > 85 && frontendDesire < 50) {
      return {
        role: "Highly Robust Systems Dev",
        text: "Geared for constructing low-latency, scalable express streaming endpoints, data indexes, and server workflows."
      };
    }
    if (devopsDesire > 80 && frontendDesire < 50) {
      return {
        role: "DevOps & Integration Architect",
        text: "Ideal for configuring continuous workflows, multi-container deployments, automated runners, and serverless architectures."
      };
    }
    return {
      role: "Symmetrical Full-Stack Engineer",
      text: "Outstanding match! Perfectly optimized to coordinate database architecture schemas, secure authentication pipelines, and interactive UI motion features."
    };
  };

  const affinity = getAffinityExplanation();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Layout': return <Layout className="w-5 h-5 text-rose-500" />;
      case 'Server': return <Server className="w-5 h-5 text-cyan-500" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-lime-500" />;
      default: return <Sliders className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleSliderChange = (type: string, val: number) => {
    playBeep('hover');
    if (type === 'fe') setFrontendDesire(val);
    if (type === 'be') setBackendDesire(val);
    if (type === 'do') setDevopsDesire(val);
  };

  return (
    <section id="skills" className="py-16 px-4 max-w-7xl mx-auto font-sans relative">
      {/* Title */}
      <div className="mb-12 text-center">
        <div className="inline-block bg-[#ff94e6] border-4 border-black brutal-shadow px-6 py-2.5 font-mono text-xs font-black uppercase mb-3 tracking-widest leading-none">
          SYSTEM_METRICS.CONF
        </div>
        <h2 className="text-4xl lg:text-5xl font-black uppercase mb-3 text-black">
          Engineering Toolset
        </h2>
        <p className="text-sm font-mono text-gray-700 max-w-xl mx-auto">
          Categorized developer competencies mapping to actual production implementation files.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core skills list - Left Span 7 */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={category.title}
              className="bg-white brutal-border brutal-shadow p-6 text-black select-none"
            >
              {/* Box Title */}
              <div className="flex items-center gap-2.5 border-b-2 border-black pb-3 mb-5 uppercase">
                {getIcon(category.iconName)}
                <h3 className="font-extrabold text-xl tracking-tight font-sans">
                  {category.title}
                </h3>
              </div>

              {/* Progress items */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5 hover:bg-zinc-50 p-2 border-b border-dashed border-black/10 transition-colors">
                    <div className="flex justify-between items-center font-mono text-xs">
                      <span className="font-bold text-gray-900 uppercase">⚡ {skill.name}</span>
                      <span className="bg-black text-white px-2 py-0.5 brutal-border-sm font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Bar background */}
                    <div className="w-full bg-zinc-200 brutal-border-sm h-4 p-0.5 relative">
                      <div
                        className="bg-amber-300 h-full border-r-2 border-black transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    {/* Tiny sub description */}
                    <p className="text-[10px] font-mono text-gray-500 italic mt-0.5">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Project Affinity Calculator - Right Span 5 */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-lime-200 brutal-border brutal-shadow-lg p-6 text-black select-none"
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-5 uppercase">
              <Sliders className="w-5 h-5" />
              <h3 className="font-extrabold text-lg tracking-tight">[ Affinity Matrix Analyzer ]</h3>
            </div>
            
            <p className="text-xs font-mono text-gray-800 leading-relaxed mb-6 bg-white/40 p-3 brutal-border-sm">
              Are you planning a project? Adjust the focus sliders below to see Yugen's matching compatibility percentage.
            </p>

            {/* Sliders Input */}
            <div className="space-y-4 mb-6 border-b-2 border-black pb-5">
              {/* FE desires */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-mono text-xs font-bold">
                  <span>DESIRED FE FOCUS:</span>
                  <span>{frontendDesire}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={frontendDesire}
                  onChange={(e) => handleSliderChange('fe', Number(e.target.value))}
                  className="w-full h-4 bg-white brutal-border-sm appearance-none outline-none cursor-pointer accent-black"
                />
              </div>

              {/* BE desires */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-mono text-xs font-bold">
                  <span>DESIRED BE FOCUS:</span>
                  <span>{backendDesire}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={backendDesire}
                  onChange={(e) => handleSliderChange('be', Number(e.target.value))}
                  className="w-full h-4 bg-white brutal-border-sm appearance-none outline-none cursor-pointer accent-black"
                />
              </div>

              {/* Devops desires */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-mono text-xs font-bold">
                  <span>DESIRED DEVOPS FOCUS:</span>
                  <span>{devopsDesire}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={devopsDesire}
                  onChange={(e) => handleSliderChange('do', Number(e.target.value))}
                  className="w-full h-4 bg-white brutal-border-sm appearance-none outline-none cursor-pointer accent-black"
                />
              </div>
            </div>

            {/* Dynamic Output Match Container */}
            <div className="bg-white brutal-border p-4 flex flex-col gap-2 relative">
              <div className="flex items-center gap-3 border-b-2 border-black pb-2 mb-2">
                <Gauge className="w-5 h-5 text-green-600 animate-pulse" />
                <div className="flex-1">
                  <div className="text-[10px] font-mono text-gray-500 font-bold uppercase leading-none">MATCH COEFFICIENT:</div>
                  <div className="text-xl font-mono font-black text-black">
                    {matchRating}% SUITABILITY
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5 text-xs font-mono">
                  <span className="font-extrabold text-black uppercase">{affinity.role}</span>
                  <span className="text-gray-600 leading-relaxed">{affinity.text}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
