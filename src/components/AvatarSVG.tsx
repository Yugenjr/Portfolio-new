import { motion } from 'motion/react';

export default function AvatarSVG() {
  return (
    <div className="w-full h-full relative select-none">
      <svg 
        viewBox="0 0 160 160" 
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky / Morning atmosphere backdrop */}
        <rect x="0" y="0" width="160" height="160" fill="#a5f3fc" />
        
        {/* Sun in the background */}
        <circle cx="135" cy="50" r="14" fill="#fef08a" stroke="#000" strokeWidth="2" />
        
        {/* Hills (Tea Estate plantation terracing layers) */}
        {/* Far layer */}
        <path d="M-10,110 Q40,75 90,95 T170,80 L170,170 L-10,170 Z" fill="#15803d" stroke="#000" strokeWidth="2" />
        {/* Nearer layer */}
        <path d="M-10,125 Q45,105 100,115 T170,100 L170,170 L-10,170 Z" fill="#166534" stroke="#000" strokeWidth="2" />
        
        {/* Horizontal Terraced tea garden dashed guide-lines */}
        <path d="M0,115 Q40,95 80,105 T160,95" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="3,3.5" fill="none" />
        <path d="M0,130 Q45,115 90,125 T160,112" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4,3" fill="none" />
        <path d="M0,145 Q50,130 100,138 T160,126" stroke="#22c55e" strokeWidth="1.5" fill="none" />

        {/* Small tea bush illustrations */}
        <g stroke="#000000" strokeWidth="1" fill="#22c55e">
          <path d="M20,120 Q22,114 26,120 Z" />
          <path d="M24,120 Q27,112 31,120 Z" />
          <path d="M75,130 Q78,123 82,130 Z" />
          <path d="M125,122 Q128,115 132,122 Z" />
        </g>
        
        {/* Character Base - Neck */}
        <path d="M68,114 L68,135 L92,135 L92,114 Z" fill="#a16207" stroke="#000" strokeWidth="2" />
        
        {/* Character Ear */}
        <circle cx="63" cy="98" r="5.5" fill="#a16207" stroke="#000" strokeWidth="2" />
        <path d="M63,96 C62,97 62,99 64,99" stroke="#000" strokeWidth="1" fill="none" />
        
        {/* Main Head turned slightly to right (Profile view) */}
        <path d="M64,74 C64,58 84,56 94,61 C102,65 103,77 101,89 C99,101 92,111 80,111 C68,111 64,101 64,85 Z" fill="#d97706" stroke="#000" strokeWidth="2" />

        {/* Short Dark Curly/Wavy Hair texture (arranged cleanly to represent curls) */}
        <g fill="#18181b" stroke="#000000" strokeWidth="1.5">
          <circle cx="68" cy="65" r="7" />
          <circle cx="75" cy="59" r="8" />
          <circle cx="83" cy="57" r="8" />
          <circle cx="91" cy="59" r="7.5" />
          <circle cx="97" cy="65" r="7" />
          <circle cx="64" cy="73" r="6" />
          <circle cx="71" cy="69" r="7.5" />
          <circle cx="79" cy="65" r="8" />
          <circle cx="87" cy="67" r="7.5" />
          <circle cx="93" cy="73" r="6" />
          
          {/* Inner details for hair volume */}
          <circle cx="72" cy="61" r="5" fill="#000" />
          <circle cx="80" cy="59" r="6" fill="#000" />
          <circle cx="88" cy="61" r="5" fill="#000" />
        </g>

        {/* Glasses - Sleek Rounded Square Frames and Temples */}
        <g fill="#18181b" stroke="#000000" strokeWidth="2" strokeLinejoin="miter">
          {/* Left Lens */}
          <path d="M68,82 C68,76 77,76 79,82 C79,86 77,90 70,89 Z" />
          {/* Right Lens */}
          <path d="M83,82 C83,76 92,76 94,82 C94,86 92,90 85,89 Z" />
          {/* Bridge */}
          <line x1="79" y1="80" x2="83" y2="80" stroke="#000" strokeWidth="2.5" />
          {/* Side Temple bar */}
          <line x1="68" y1="81" x2="62" y2="82" stroke="#000" strokeWidth="2" />
          {/* Right Temple bar extension */}
          <line x1="94" y1="81" x2="100" y2="82" stroke="#000" strokeWidth="2" />
        </g>

        {/* Glasses White Light Reflections */}
        <ellipse cx="72" cy="80" rx="2" ry="1.2" fill="#ffffff" opacity="0.75" />
        <ellipse cx="87" cy="80" rx="2" ry="1.2" fill="#ffffff" opacity="0.75" />

        {/* Protruding nose silhouette looking slightly right */}
        <path d="M94,85 L98,87 L94,90" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Smart friendly smirk/smile lines */}
        <path d="M82,97 Q88,99 91,95" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Midnight navy sweatshirt with subtle graphic textured design */}
        <path d="M36,135 C48,124 68,121 80,121 C92,121 112,124 124,135 L132,170 L28,170 Z" fill="#1e1b4b" stroke="#000" strokeWidth="2" />

        {/* Sweatshirt collar border */}
        <path d="M68,123 Q80,128 92,123" fill="none" stroke="#000" strokeWidth="2" />

        {/* Subtle grey/lavender geometric grid/dash patterns on sweater */}
        <g stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round">
          {/* Vertical dash columns */}
          <line x1="44" y1="141" x2="44" y2="147" />
          <line x1="52" y1="146" x2="52" y2="152" />
          <line x1="61" y1="139" x2="61" y2="145" />
          <line x1="100" y1="139" x2="100" y2="145" />
          <line x1="108" y1="146" x2="108" y2="152" />
          <line x1="116" y1="141" x2="116" y2="147" />
          
          {/* Horizontal dashes */}
          <line x1="41" y1="154" x2="47" y2="154" />
          <line x1="55" y1="159" x2="61" y2="159" />
          <line x1="99" y1="159" x2="105" y2="159" />
          <line x1="113" y1="154" x2="119" y2="154" />
        </g>
        
        {/* Diagnostic Overlay Lines for brutalist feel */}
        <line x1="0" y1="0" x2="160" y2="0" stroke="#000" strokeWidth="2" />
        <line x1="160" y1="0" x2="160" y2="160" stroke="#000" strokeWidth="2" />
        <line x1="160" y1="160" x2="0" y2="160" stroke="#000" strokeWidth="2" />
        <line x1="0" y1="160" x2="0" y2="0" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
}
