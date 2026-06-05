import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, User, Compass, PenTool, Flame } from 'lucide-react';
import { GuestbookEntry } from '../types';
import { playBeep } from '../utils/sfx';

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: 'g-1',
    name: 'Linus Torvalds',
    tagline: 'Kernel Dictator // Finland',
    message: 'Your compiling terminal widget is acceptable. It does not use C++, so I approve. Nice thick borders.',
    timestamp: '2026-06-03 14:24',
  },
  {
    id: 'g-2',
    name: 'Ada Lovelace',
    tagline: 'First Compiler Programmer // London',
    message: 'Astounding layout! The 8-bit sound synth blips when entering inputs is highly creative. Dynamic clock works wonderfully.',
    timestamp: '2026-06-02 10:15',
  },
  {
    id: 'g-3',
    name: 'Dan Abramov',
    tagline: 'Overreacted Author // React Core',
    message: 'The state management of this guestbook and starry toggle widgets is very pristine. Built on React 19, superb!',
    timestamp: '2026-05-30 18:42',
  },
];

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Read from local storage
    const stored = localStorage.getItem('yugen_guestbook');
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        setEntries(INITIAL_ENTRIES);
      }
    } else {
      setEntries(INITIAL_ENTRIES);
      localStorage.setItem('yugen_guestbook', JSON.stringify(INITIAL_ENTRIES));
    }
  }, []);

  const handlePostEntry = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !message.trim()) {
      playBeep('error');
      setErrorMsg('Name and message registry inputs are required!');
      return;
    }

    const t = tagline.trim() || 'Software Enthusiast';
    const dateObj = new Date();
    const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')} ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;

    const newEntry: GuestbookEntry = {
      id: `visitor-${Date.now()}`,
      name: name.trim(),
      tagline: t,
      message: message.trim(),
      timestamp: dateStr,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('yugen_guestbook', JSON.stringify(updatedEntries));

    playBeep('success');
    setName('');
    setTagline('');
    setMessage('');
  };

  return (
    <section id="guestbook" className="py-16 px-4 max-w-7xl mx-auto font-sans">
      {/* Title block */}
      <div className="mb-12 text-center">
        <div className="inline-block bg-orange-300 border-4 border-black brutal-shadow px-6 py-2.5 font-mono text-xs font-black uppercase mb-3 tracking-widest leading-none text-black">
          VISITOR_FORUM.HTML
        </div>
        <h2 className="text-4xl lg:text-5xl font-black uppercase mb-3 text-black">
          Visitor Guestbook
        </h2>
        <p className="text-sm font-mono text-gray-700 max-w-xl mx-auto">
          Sign this space in real-time. Comments are cached locally inside the browser client registry interface.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Entry submission form - Left Span 5 */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <form
            onSubmit={handlePostEntry}
            className="bg-[#fed7aa] brutal-border brutal-shadow-lg p-6 flex flex-col gap-4 text-black select-none"
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-2 uppercase">
              <PenTool className="w-5 h-5 text-black" />
              <h3 className="font-extrabold text-lg tracking-tight">[ Sign The Ledger ]</h3>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-1">
              <label htmlFor="vis-name" className="font-mono text-xs font-bold uppercase flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>Identification / Name:*</span>
              </label>
              <input
                id="vis-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Grace Hopper"
                maxLength={40}
                className="w-full bg-white text-black brutal-border-sm p-3 font-mono text-xs outline-none focus:bg-amber-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="vis-tag" className="font-mono text-xs font-bold uppercase flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Job Tagline / Org:</span>
              </label>
              <input
                id="vis-tag"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Systems Engineer @ NASA"
                maxLength={60}
                className="w-full bg-white text-black brutal-border-sm p-3 font-mono text-xs outline-none focus:bg-amber-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="vis-msg" className="font-mono text-xs font-bold uppercase flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Secure Broadcast Message:*</span>
              </label>
              <textarea
                id="vis-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Drop a note for Yugen..."
                maxLength={300}
                rows={4}
                className="w-full bg-white text-black brutal-border-sm p-3 font-mono text-xs outline-none focus:bg-amber-50 resize-none"
              />
            </div>

            {/* Error messaging state */}
            {errorMsg && (
              <div className="bg-red-200 border-2 border-red-800 p-2 text-xs font-mono font-bold text-red-900 uppercase">
                ⚠️ [ERROR]: {errorMsg}
              </div>
            )}

            {/* Submit button */}
            <motion.button
              id="btn-sign-guestbook"
              type="submit"
              onMouseEnter={() => playBeep('hover')}
              whileHover={{ y: -3, x: -1, scale: 1.02, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 flex items-center justify-center gap-2 bg-black text-lime-400 font-mono text-sm font-bold brutal-border p-3 brutal-shadow cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>RECORD_BROADCAST.SH</span>
            </motion.button>
          </form>
        </div>

        {/* Existing guestbook logs lists - Right Span 7 */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Header block with total count */}
          <div className="bg-zinc-900 text-white brutal-border p-4 flex justify-between items-center select-none font-mono text-xs">
            <span className="font-bold flex items-center gap-1.5 uppercase">
              <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
              SIGNATURES_LISTING.BIN
            </span>
            <span className="bg-lime-400 text-black px-2 py-0.5 brutal-border-sm font-black font-mono">
              TOTAL: {entries.length} RECORDS
            </span>
          </div>

          {/* List element container */}
          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <motion.div
                  id={`guestbook-entry-${entry.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: 'spring', damping: 18 }}
                  key={entry.id}
                  className="bg-white brutal-border brutal-shadow p-5 text-black"
                >
                  <div className="flex flex-wrap justify-between items-start border-b border-dashed border-black/25 pb-2.5 mb-3 gap-2">
                    <div>
                      <h4 className="text-lg font-black uppercase leading-none mb-1 text-black">
                        {entry.name}
                      </h4>
                      <p className="font-mono text-[9px] font-bold text-gray-500 uppercase">
                        {entry.tagline}
                      </p>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-gray-900 bg-zinc-100 px-2 py-1 brutal-border-sm">
                      {entry.timestamp}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-800 leading-relaxed font-sans">
                    {entry.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
