import { useState, useRef, useEffect, FormEvent } from 'react';
import { Terminal, Trash2, Key, HelpCircle, ArrowRight } from 'lucide-react';
import { playBeep } from '../utils/sfx';
import { PERSONAL_BIO, PROJECTS, SKILL_CATEGORIES } from '../data';

interface LogLine {
  type: 'command' | 'output' | 'system' | 'secret';
  text: string;
  isHtml?: boolean;
}

export default function TerminalShell() {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([
    { type: 'system', text: 'YUGEN COMPILER SHELL v1.4.2 [BOOT COMPLETED]' },
    { type: 'system', text: 'Type "help" to list available developer commands' },
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const commandButtons = ['help', 'whoami', 'skills', 'projects', 'secrets', 'clear'];

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const newLogs = [...logs, { type: 'command' as const, text: `$ ${trimmed}` }];
    playBeep('click');

    switch (lower) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `Available system tasks:
  whoami   - Print bio & core focus.
  skills   - List technical engineering toolset.
  projects - Output top-tier open-source projects.
  secrets  - Unlock hidden developer statistics.
  sfx      - Trigger synth 8-bit auditory test.
  contact  - Show secure email & socials.
  clear    - Clear terminal registry.`,
        });
        break;
      case 'whoami':
        newLogs.push({
          type: 'output',
          text: `Name: ${PERSONAL_BIO.name}
Role: ${PERSONAL_BIO.title}
Bio: ${PERSONAL_BIO.about}
Location: ${PERSONAL_BIO.location}`,
        });
        break;
      case 'skills':
        const skillsText = SKILL_CATEGORIES.map(category => {
          const sList = category.skills.map(s => `  * ${s.name} (Lvl ${s.level}%) - ${s.description}`).join('\n');
          return `[${category.title}]\n${sList}`;
        }).join('\n\n');
        newLogs.push({ type: 'output', text: skillsText });
        break;
      case 'projects':
        const projectsText = PROJECTS.map(p => {
          return `* ${p.title} (${p.category})
  Tech Stack: ${p.techStack.join(', ')}
  Stars: ★ ${p.stars || 0} | Forks: ${p.forks || 0}
  Repo: ${p.githubUrl}`;
        }).join('\n\n');
        newLogs.push({ type: 'output', text: `TOP REPOSITORIES:\n\n${projectsText}` });
        break;
      case 'secrets':
        playBeep('success');
        newLogs.push({
          type: 'secret',
          text: `🔓 ACCESS GRANTED TO RETINA VAULT:
  - Coffee Consumed (2026): ~184 Liters
  - Git Commits: 1,842 (Over 4 Projects)
  - StackOverflow Search Ratio: 32.4%
  - Best Ideal Coding Hours: 22:00 - 04:00 UTC
  - Music Grid: Synthwave // Brutal Phonk // Lofi Chill
  - Current Status: Open for dynamic full-time roles & contracting`,
        });
        break;
      case 'sfx':
        playBeep('boot');
        newLogs.push({ type: 'system', text: '🔔 SFX diagnostics triggered. High tone chime completed.' });
        break;
      case 'contact':
        newLogs.push({
          type: 'output',
          text: `CONTACT DEETS:
  - Email: ${PERSONAL_BIO.email}
  - GitHub: ${PERSONAL_BIO.github}
  - LeetCode: ${PERSONAL_BIO.leetcode}
  - Discord: ${PERSONAL_BIO.discord}`,
        });
        break;
      case 'clear':
        setLogs([]);
        setInputVal('');
        return;
      default:
        playBeep('error');
        newLogs.push({
          type: 'output',
          text: `Command "${trimmed}" not recognized. Run "help" to review valid tasks.`,
        });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleQuickTabClick = (cmd: string) => {
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full bg-black text-lime-400 font-mono text-sm brutal-border brutal-shadow-lg p-1 scanline-container overflow-hidden rounded-none">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-zinc-900 border-b-4 border-black p-2 mx-1 mt-1 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-lime-400" />
          <span className="text-white font-semibold">yugen_shell.sh - v1.4</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black inline-block"></span>
        </div>
      </div>

      {/* Output Console Log */}
      <div className="h-80 overflow-y-auto p-4 flex flex-col gap-2 bg-black whitespace-pre-wrap leading-relaxed select-text select-all">
        {logs.map((line, idx) => (
          <div
            key={idx}
            className={`${
              line.type === 'command'
                ? 'text-cyan-400 font-bold'
                : line.type === 'system'
                ? 'text-yellow-300 font-medium'
                : line.type === 'secret'
                ? 'text-pink-400 font-bold'
                : 'text-lime-200'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={consoleBottomRef} />
      </div>

      {/* Input Form Prompt */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-2 border-t-4 border-black bg-zinc-950 p-2 text-white"
      >
        <span className="text-cyan-400 font-bold ml-1 flex items-center gap-1">
          <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>$</span>
        </span>
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'help' and hit enter..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-cyan-300 text-sm focus:ring-0"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          id="btn-terminal-clear"
          type="button"
          onClick={() => {
            playBeep('click');
            setLogs([]);
          }}
          className="p-1 text-gray-400 hover:text-white transition-colors mr-1 cursor-pointer"
          title="Clear registry log"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Click Task Tags */}
      <div className="bg-zinc-900 px-3 py-2 border-t-4 border-black flex flex-wrap items-center gap-2.5 text-xs text-white">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Quick Click Tags:</span>
        {commandButtons.map((btn) => (
          <button
            id={`terminal-quick-${btn}`}
            key={btn}
            type="button"
            onClick={() => handleQuickTabClick(btn)}
            className="px-2 py-0.5 bg-black border border-gray-600 text-lime-300 hover:border-lime-400 hover:bg-zinc-800 active:translate-y-0.5 transition-all text-xs font-mono cursor-pointer"
          >
            {btn === 'secrets' ? '🔓 ' : ''}
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
