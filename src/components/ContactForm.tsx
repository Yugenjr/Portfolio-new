import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, Send, Terminal, MessageSquare, ExternalLink, Github } from 'lucide-react';
import { playBeep } from '../utils/sfx';
import { PERSONAL_BIO } from '../data';

export default function ContactForm() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [visitorMail, setVisitorMail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playBeep('success');
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setPostSuccess(false);

    if (!visitorMail.trim() || !body.trim()) {
      playBeep('error');
      setErrorMsg('Inquiry mail and details body input fields cannot be empty!');
      return;
    }

    playBeep('boot');
    setPostSuccess(true);
    // Reset fields
    setVisitorMail('');
    setSubject('');
    setBody('');
  };

  return (
    <section id="contact" className="py-16 px-4 max-w-7xl mx-auto font-sans">
      {/* Title block */}
      <div className="mb-12 text-center">
        <div className="inline-block bg-[#ff94e6] border-4 border-black brutal-shadow px-6 py-2.5 font-mono text-xs font-black uppercase mb-3 tracking-widest leading-none text-black">
          API_GATEWAY.DISPATCH
        </div>
        <h2 className="text-4xl lg:text-5xl font-black uppercase mb-3 text-black">
          Initiate Contact
        </h2>
        <p className="text-sm font-mono text-gray-700 max-w-xl mx-auto">
          Need a robust systems developer for a custom SaaS feature? Connect via secure web forms or direct communication portals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact form - Left Span 7 */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleInquirySubmit}
            className="bg-white brutal-border brutal-shadow-lg p-6 lg:p-8 flex flex-col gap-4 text-black h-full select-none"
          >
            <div className="bg-zinc-100 brutal-border-sm p-3.5 font-mono text-xs mb-2">
              <span className="font-extrabold uppercase">⚡ CHANNEL STATUS: ENCRYPTED // ENDPOINT DIRECT</span>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="con-email" className="font-mono text-xs font-bold uppercase">Sender Email Address:*</label>
              <input
                id="con-email"
                type="email"
                value={visitorMail}
                onChange={(e) => setVisitorMail(e.target.value)}
                placeholder="developer@workplace.com"
                className="w-full bg-white text-black brutal-border-sm p-3 font-mono text-xs outline-none focus:bg-zinc-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="con-sub" className="font-mono text-xs font-bold uppercase">Subject Header:</label>
              <input
                id="con-sub"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Inquiry: Technical Project Collaboration"
                className="w-full bg-white text-black brutal-border-sm p-3 font-mono text-xs outline-none focus:bg-zinc-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="con-body" className="font-mono text-xs font-bold uppercase">Specification Details:*</label>
              <textarea
                id="con-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Describe your tech stack, timelines, or specifications..."
                rows={5}
                className="w-full bg-white text-black brutal-border-sm p-3 font-mono text-xs outline-none focus:bg-zinc-50 resize-none"
              />
            </div>

            {/* Error notifications */}
            {errorMsg && (
              <div className="bg-red-200 border-2 border-red-800 p-2 text-xs font-mono font-bold text-red-900 uppercase">
                ⚠️ [ERROR]: {errorMsg}
              </div>
            )}

            {/* Success notifications */}
            {postSuccess && (
              <div className="bg-green-150 border-2 border-green-800 p-3 text-xs font-mono font-bold text-green-950 uppercase bg-lime-100">
                🚀 SPEED DISPATCH CONFIRMED: Inquiry queued. Yugen will reply shortly to your mailbox.
              </div>
            )}

            <motion.button
              id="btn-send-dispatch"
              type="submit"
              onMouseEnter={() => playBeep('hover')}
              whileHover={{ y: -3, x: -1, scale: 1.02, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 flex items-center justify-center gap-2 bg-[#ffeb3b] text-black font-mono text-sm font-bold brutal-border p-3 brutal-shadow cursor-pointer"
            >
              <Send className="w-4 h-4 animate-bounce" />
              <span>DISPATCH_MAIL_PACKET.BIN</span>
            </motion.button>
          </form>
        </div>

        {/* Copy Desk Widget - Right Span 5 */}
        <div className="lg:col-span-5">
          <div className="bg-yellow-100 brutal-border brutal-shadow-lg p-6 flex flex-col gap-5 text-black h-full justify-between select-none">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b-2 border-black pb-3 uppercase mb-2">
                <Terminal className="w-5 h-5" />
                <h3 className="font-extrabold text-lg tracking-tight">[ Copy Portal Desk ]</h3>
              </div>

              <p className="text-xs font-mono text-gray-800 leading-relaxed mb-1 bg-white/40 p-3.5 brutal-border-sm">
                Need details immediately? Copy credentials directly onto your dashboard clipboard.
              </p>

              {/* Email Copier */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] font-bold text-gray-650 uppercase">DIRECT MAIL:</span>
                <div className="flex brutal-border-sm bg-white overflow-hidden">
                  <div className="flex-1 p-2.5 font-mono text-xs font-bold overflow-x-auto whitespace-nowrap text-gray-800">
                    {PERSONAL_BIO.email}
                  </div>
                  <button
                    id="btn-copy-email"
                    onClick={() => copyToClipboard(PERSONAL_BIO.email, 'email')}
                    className="p-2.5 bg-black text-white hover:bg-zinc-800 transition-colors border-l-2 border-black cursor-pointer flex items-center justify-center shrink-0 w-12"
                    title="Copy Email"
                  >
                    {copiedKey === 'email' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Discord Copier */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] font-bold text-gray-650 uppercase">DISCORD HANDLE:</span>
                <div className="flex brutal-border-sm bg-white overflow-hidden">
                  <div className="flex-1 p-2.5 font-mono text-xs font-bold overflow-x-auto whitespace-nowrap text-gray-800">
                    {PERSONAL_BIO.discord}
                  </div>
                  <button
                    id="btn-copy-discord"
                    onClick={() => copyToClipboard(PERSONAL_BIO.discord, 'discord')}
                    className="p-2.5 bg-black text-white hover:bg-zinc-800 transition-colors border-l-2 border-black cursor-pointer flex items-center justify-center shrink-0 w-12"
                    title="Copy Discord Tag"
                  >
                    {copiedKey === 'discord' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links badges */}
            <div className="border-t-2 border-black/15 pt-5 flex flex-col gap-2 font-mono text-xs">
              <span className="font-bold text-[10px] text-gray-500 uppercase">EXTERNAL DIRECTORIES:</span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  id="contact-github"
                  href={PERSONAL_BIO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playBeep('click')}
                  className="flex items-center justify-between bg-white hover:bg-black hover:text-white transition-all p-3.5 brutal-border-sm font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Github className="w-4 h-4" />
                    <span>GITHUB</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  id="contact-leetcode"
                  href={PERSONAL_BIO.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playBeep('click')}
                  className="flex items-center justify-between bg-white hover:bg-black hover:text-white transition-all p-3.5 brutal-border-sm font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" />
                    <span>LEETCODE</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
