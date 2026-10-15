import React from 'react';

export const MoneySackIcon: React.FC<{ amount: number | string; size?: number }> = ({ amount, size = 72 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm select-none"
    >
      {/* Dynamic speed/radiance lines radiating outward */}
      <path d="M12 28L4 25" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 45L4 46" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 62L8 66" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M86 28L94 25" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M84 45L94 46" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M82 62L90 66" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M35 12L31 4" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M65 12L69 4" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />

      {/* Bag top frills/ruffle */}
      <path 
        d="M38 25 C34 16 38 12 43 14 C48 11 52 11 57 14 C62 12 66 16 62 25 Z" 
        fill="#FFE853" 
        stroke="#111827" 
        strokeWidth="3" 
        strokeLinejoin="round" 
      />
      {/* Bag tie string */}
      <path d="M36 24 C44 26 56 26 64 24" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="24.5" r="2.5" fill="#111827" />

      {/* Bag body */}
      <path 
        d="M37 25 C25 32 18 45 20 64 C22 82 32 92 50 92 C68 92 78 82 80 64 C82 45 75 32 63 25 C55 27 45 27 37 25 Z" 
        fill="#FFE853" 
        stroke="#111827" 
        strokeWidth="3.5" 
        strokeLinejoin="round" 
      />

      {/* Sack wrinkle stitches */}
      <path d="M28 40 C32 44 33 48 30 52" stroke="#111827" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M72 40 C68 44 67 48 70 52" stroke="#111827" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* Inner badge / oval for amount */}
      <ellipse cx="50" cy="62" rx="26" ry="21" fill="#FFE853" stroke="#111827" strokeWidth="3" />

      {/* Monopoly Double-Bar M symbol */}
      <g transform="translate(42, 45) scale(0.65)">
        <path 
          d="M2 18 L2 2 L9 13 L16 2 L16 18" 
          stroke="#111827" 
          strokeWidth="3.8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
        {/* Two horizontal cross bars through M */}
        <line x1="-1" y1="8" x2="19" y2="8" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="-1" y1="12" x2="19" y2="12" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" />
      </g>

      {/* Number Value text */}
      <text 
        x="50" 
        y="75" 
        textAnchor="middle" 
        fontFamily="'Outfit', system-ui, sans-serif" 
        fontWeight="900" 
        fontSize="17" 
        fill="#111827"
        letterSpacing="-0.5"
      >
        {amount}
      </text>
    </svg>
  );
};

export const CardIllustration: React.FC<{ 
  illustrationKey: string; 
  className?: string;
  customSvg?: string;
  customImageUrl?: string;
}> = ({ 
  illustrationKey, 
  className = "w-full h-full",
  customSvg,
  customImageUrl,
}) => {
  // If custom AI-generated raster image URL is provided
  if (customImageUrl) {
    return (
      <div className={`relative flex items-center justify-center p-1 ${className}`}>
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[4px] border-[#111827] bg-white overflow-hidden shadow-md flex items-center justify-center">
          <img 
            src={customImageUrl} 
            alt="Icona personalizzata AI" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // If custom AI-generated SVG code is provided
  if (customSvg) {
    // If it's already an SVG string, inject it safely
    return (
      <div 
        className={`relative flex items-center justify-center w-full h-full overflow-hidden ${className}`}
        dangerouslySetInnerHTML={{ __html: customSvg }}
      />
    );
  }

  switch (illustrationKey) {
    case 'juggling-contracts':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Circular frame background vignette */}
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          
          {/* Mr. Monopoly Body inside vignette */}
          <g>
            {/* Tuxedo shoulders & torso */}
            <path d="M68 155 C70 135 90 128 120 128 C150 128 170 135 172 155 L180 185 L60 185 Z" fill="#111827" />
            {/* White Shirt Collar */}
            <path d="M106 128 L120 148 L134 128 L127 125 L120 129 L113 125 Z" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" />
            {/* Red / Dark Bowtie */}
            <path d="M112 131 L120 136 L128 131 L128 139 L120 136 L112 139 Z" fill="#111827" stroke="#111827" strokeWidth="1" />
            
            {/* Outstretched arms */}
            <path d="M72 135 C55 125 45 110 38 95 L48 90 C54 105 65 115 80 125 Z" fill="#111827" />
            <path d="M168 135 C185 125 195 110 202 95 L192 90 C186 105 175 115 160 125 Z" fill="#111827" />

            {/* White gloved hands fanning upwards */}
            {/* Left Hand */}
            <g transform="translate(34, 84)">
              <circle cx="8" cy="8" r="8" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
              <path d="M2 6 C-1 2 4 -2 8 2" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 3 C5 -1 10 -2 12 3" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 5 C12 2 15 4 14 8" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* Right Hand */}
            <g transform="translate(190, 84)">
              <circle cx="8" cy="8" r="8" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
              <path d="M14 6 C17 2 12 -2 8 2" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 3 C11 -1 6 -2 4 3" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 5 C4 2 1 4 2 8" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Head & Face */}
            <ellipse cx="120" cy="100" rx="22" ry="24" fill="#FEE2E2" stroke="#111827" strokeWidth="3" />
            
            {/* Happy eyes */}
            <path d="M110 93 C111 88 116 88 117 93" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M123 93 C124 88 129 88 130 93" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
            {/* Friendly Round Nose */}
            <circle cx="120" cy="98" r="3.5" fill="#FECDD3" stroke="#111827" strokeWidth="1.5" />
            
            {/* Big smiling mouth */}
            <path d="M110 106 C114 116 126 116 130 106 Z" fill="#EF4444" stroke="#111827" strokeWidth="2" />
            
            {/* White iconic bushy mustache */}
            <path 
              d="M120 101 C115 97 104 99 98 106 C105 109 114 105 120 103 C126 105 135 109 142 106 C136 99 125 97 120 101 Z" 
              fill="#FFFFFF" 
              stroke="#111827" 
              strokeWidth="2.5" 
            />

            {/* Top Hat */}
            <g>
              {/* Hat brim */}
              <ellipse cx="120" cy="80" rx="36" ry="8" fill="#111827" stroke="#111827" strokeWidth="2" />
              {/* Hat crown */}
              <path d="M100 80 L102 38 C102 36 104 34 107 34 L133 34 C136 34 138 36 138 38 L140 80 Z" fill="#111827" />
              {/* Hat top ellipse */}
              <ellipse cx="120" cy="34" rx="16" ry="4" fill="#374151" stroke="#111827" strokeWidth="2" />
              {/* Red ribbon band */}
              <path d="M101.5 73 L101.8 68 L138.2 68 L138.5 73 Z" fill="#DC2626" />
            </g>
          </g>

          {/* Juggled Monopoly Deed Cards Arch (Brown, Light Blue, Pink, Orange, Red, Yellow, Green, Dark Blue) */}
          {/* Card 1: Orange */}
          <g transform="translate(30, 75) rotate(-28)">
            <rect x="0" y="0" width="22" height="32" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <rect x="2" y="2" width="18" height="7" fill="#F97316" />
            <line x1="4" y1="13" x2="18" y2="13" stroke="#111827" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="4" y1="23" x2="18" y2="23" stroke="#9CA3AF" strokeWidth="1.2" />
          </g>

          {/* Card 2: Light Blue */}
          <g transform="translate(48, 40) rotate(-18)">
            <rect x="0" y="0" width="22" height="32" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <rect x="2" y="2" width="18" height="7" fill="#38BDF8" />
            <line x1="4" y1="13" x2="18" y2="13" stroke="#111827" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="4" y1="23" x2="18" y2="23" stroke="#9CA3AF" strokeWidth="1.2" />
          </g>

          {/* Card 3: Red */}
          <g transform="translate(78, 18) rotate(-8)">
            <rect x="0" y="0" width="22" height="32" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <rect x="2" y="2" width="18" height="7" fill="#EF4444" />
            <line x1="4" y1="13" x2="18" y2="13" stroke="#111827" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="4" y1="23" x2="18" y2="23" stroke="#9CA3AF" strokeWidth="1.2" />
          </g>

          {/* Card 4: Brown */}
          <g transform="translate(108, 12) rotate(2)">
            <rect x="0" y="0" width="22" height="32" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <rect x="2" y="2" width="18" height="7" fill="#92400E" />
            <line x1="4" y1="13" x2="18" y2="13" stroke="#111827" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="4" y1="23" x2="18" y2="23" stroke="#9CA3AF" strokeWidth="1.2" />
          </g>

          {/* Card 5: Dark Blue */}
          <g transform="translate(138, 16) rotate(12)">
            <rect x="0" y="0" width="22" height="32" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <rect x="2" y="2" width="18" height="7" fill="#1D4ED8" />
            <line x1="4" y1="13" x2="18" y2="13" stroke="#111827" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="4" y1="23" x2="18" y2="23" stroke="#9CA3AF" strokeWidth="1.2" />
          </g>

          {/* Card 6: Pink */}
          <g transform="translate(166, 32) rotate(22)">
            <rect x="0" y="0" width="22" height="32" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <rect x="2" y="2" width="18" height="7" fill="#F472B6" />
            <line x1="4" y1="13" x2="18" y2="13" stroke="#111827" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="4" y1="23" x2="18" y2="23" stroke="#9CA3AF" strokeWidth="1.2" />
          </g>

          {/* Card 7: Yellow */}
          <g transform="translate(186, 60) rotate(32)">
            <rect x="0" y="0" width="22" height="32" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <rect x="2" y="2" width="18" height="7" fill="#EAB308" />
            <line x1="4" y1="13" x2="18" y2="13" stroke="#111827" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="4" y1="23" x2="18" y2="23" stroke="#9CA3AF" strokeWidth="1.2" />
          </g>

          {/* Card 8: Green */}
          <g transform="translate(196, 92) rotate(40)">
            <rect x="0" y="0" width="22" height="32" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <rect x="2" y="2" width="18" height="7" fill="#22C55E" />
            <line x1="4" y1="13" x2="18" y2="13" stroke="#111827" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="4" y1="23" x2="18" y2="23" stroke="#9CA3AF" strokeWidth="1.2" />
          </g>
        </svg>
      );

    case 'umbrella-shield':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Deflected falling coins & cash bouncing off */}
          <g>
            <circle cx="65" cy="50" r="10" fill="#FBBF24" stroke="#111827" strokeWidth="2.5" />
            <path d="M52 42 L60 48" stroke="#111827" strokeWidth="2" />
            <circle cx="180" cy="60" r="11" fill="#FBBF24" stroke="#111827" strokeWidth="2.5" />
            <path d="M192 50 L184 58" stroke="#111827" strokeWidth="2" />
            {/* Rent Bill flying away */}
            <rect x="135" y="32" width="28" height="16" rx="2" transform="rotate(25 135 32)" fill="#86EFAC" stroke="#111827" strokeWidth="2" />
            <circle cx="152" cy="42" r="4" fill="#22C55E" />
          </g>

          {/* Large Golden Umbrella */}
          <path 
            d="M50 110 C55 60 185 60 190 110 C170 102 145 106 120 102 C95 106 70 102 50 110 Z" 
            fill="#10B981" 
            stroke="#111827" 
            strokeWidth="4" 
            strokeLinejoin="round" 
          />
          <path d="M120 62 L120 102" stroke="#047857" strokeWidth="3" />
          {/* Umbrella Top Spire */}
          <path d="M120 62 L120 48" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
          {/* Umbrella Gold Ribs */}
          <path d="M85 85 C95 72 108 65 120 62" stroke="#34D399" strokeWidth="2" />
          <path d="M155 85 C145 72 132 65 120 62" stroke="#34D399" strokeWidth="2" />

          {/* Mr. Monopoly under umbrella smiling */}
          <g transform="translate(0, 10)">
            <ellipse cx="120" cy="130" rx="18" ry="20" fill="#FEE2E2" stroke="#111827" strokeWidth="3" />
            {/* Mustache */}
            <path d="M120 132 C114 128 106 130 102 136 C108 138 116 135 120 133 C124 135 132 138 138 136 C134 130 126 128 120 132 Z" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            {/* Top Hat */}
            <ellipse cx="120" cy="116" rx="26" ry="6" fill="#111827" stroke="#111827" strokeWidth="2" />
            <path d="M106 116 L108 88 L132 88 L134 116 Z" fill="#111827" stroke="#111827" strokeWidth="2" />
            {/* Umbrella Handle gripped */}
            <path d="M120 102 L120 152 C120 162 110 162 108 155" stroke="#111827" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Gloved Hand */}
            <circle cx="120" cy="148" r="6" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'golden-crown':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* City skyline silhouette base */}
          <path d="M60 170 L60 145 L80 145 L80 130 L105 130 L105 150 L125 138 L145 138 L145 155 L165 142 L180 142 L180 170 Z" fill="#E2E8F0" stroke="#111827" strokeWidth="3" />
          {/* Glowing Golden Crown */}
          <path 
            d="M75 140 L85 92 L108 115 L120 78 L132 115 L155 92 L165 140 Z" 
            fill="#FBBF24" 
            stroke="#111827" 
            strokeWidth="4" 
            strokeLinejoin="round" 
          />
          {/* Crown Jewels */}
          <circle cx="85" cy="92" r="5" fill="#EF4444" stroke="#111827" strokeWidth="2" />
          <circle cx="120" cy="78" r="6" fill="#3B82F6" stroke="#111827" strokeWidth="2" />
          <circle cx="155" cy="92" r="5" fill="#10B981" stroke="#111827" strokeWidth="2" />
          <circle cx="120" cy="125" r="7" fill="#EF4444" stroke="#111827" strokeWidth="2" />
          <circle cx="95" cy="128" r="5" fill="#8B5CF6" stroke="#111827" strokeWidth="2" />
          <circle cx="145" cy="128" r="5" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
          {/* Radiance sparkles */}
          <path d="M120 54 L120 64" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M96 64 L102 72" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M144 64 L138 72" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'crane-hotel':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Construction crane tower */}
          <path d="M72 175 L72 65 L78 65 L78 175 Z" fill="#F97316" stroke="#111827" strokeWidth="2.5" />
          {/* Crane lattice diagonals */}
          <path d="M72 75 L78 85 M72 95 L78 105 M72 115 L78 125 M72 135 L78 145 M72 155 L78 165" stroke="#111827" strokeWidth="2" />
          {/* Crane arm horizontal jib */}
          <path d="M55 70 L175 70 L185 75 L55 75 Z" fill="#F97316" stroke="#111827" strokeWidth="2.5" />
          {/* Cables */}
          <path d="M75 50 L145 70" stroke="#111827" strokeWidth="2" />
          <path d="M75 50 L58 70" stroke="#111827" strokeWidth="2" />
          <line x1="140" y1="75" x2="140" y2="105" stroke="#111827" strokeWidth="2" />
          {/* Big Classic Red Monopoly Hotel being lowered */}
          <g transform="translate(118, 105)">
            <path d="M5 22 L22 5 L39 22 Z" fill="#DC2626" stroke="#111827" strokeWidth="3" />
            <rect x="5" y="22" width="34" height="30" fill="#EF4444" stroke="#111827" strokeWidth="3" />
            <rect x="10" y="28" width="6" height="8" fill="#FEE2E2" stroke="#111827" strokeWidth="1.5" />
            <rect x="28" y="28" width="6" height="8" fill="#FEE2E2" stroke="#111827" strokeWidth="1.5" />
            <rect x="18" y="40" width="8" height="12" fill="#7F1D1D" stroke="#111827" strokeWidth="1.5" />
          </g>
          {/* Green house on the ground */}
          <g transform="translate(75, 145)">
            <path d="M3 12 L12 3 L21 12 Z" fill="#15803D" stroke="#111827" strokeWidth="2" />
            <rect x="3" y="12" width="18" height="16" fill="#22C55E" stroke="#111827" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'bank-president':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Bank window / columns in background */}
          <rect x="80" y="65" width="80" height="40" fill="#FEF3C7" stroke="#111827" strokeWidth="2.5" />
          <line x1="120" y1="65" x2="120" y2="105" stroke="#111827" strokeWidth="2" />
          {/* Mr. Monopoly sitting behind desk */}
          <ellipse cx="120" cy="108" rx="20" ry="22" fill="#FEE2E2" stroke="#111827" strokeWidth="3" />
          {/* Eyes with monocle */}
          <circle cx="114" cy="103" r="6" fill="#E0F2FE" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M114 109 L112 120" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Mustache */}
          <path d="M120 110 C114 106 105 108 100 114 C107 116 115 113 120 111 C125 113 133 116 140 114 C135 108 126 106 120 110 Z" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
          {/* Top Hat */}
          <ellipse cx="120" cy="92" rx="28" ry="7" fill="#111827" stroke="#111827" strokeWidth="2" />
          <path d="M104 92 L106 65 L134 65 L136 92 Z" fill="#111827" stroke="#111827" strokeWidth="2" />
          {/* Mahogany Desk */}
          <rect x="58" y="132" width="124" height="40" rx="3" fill="#78350F" stroke="#111827" strokeWidth="3.5" />
          <rect x="62" y="136" width="116" height="6" fill="#9A3412" />
          {/* Stacks of Cash on Desk */}
          <g transform="translate(68, 115)">
            <rect x="0" y="8" width="22" height="10" rx="1" fill="#86EFAC" stroke="#111827" strokeWidth="1.5" />
            <rect x="0" y="4" width="22" height="10" rx="1" fill="#4ADE80" stroke="#111827" strokeWidth="1.5" />
            <rect x="0" y="0" width="22" height="10" rx="1" fill="#22C55E" stroke="#111827" strokeWidth="1.5" />
            <circle cx="11" cy="5" r="2" fill="#14532D" />
          </g>
          {/* Golden Bell & Stamps */}
          <path d="M155 125 C153 121 161 121 159 125 Z" fill="#FBBF24" stroke="#111827" strokeWidth="2" />
          <circle cx="157" cy="128" r="5" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
        </svg>
      );

    case 'magnetic-dice':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Red/Blue Horseshoe Magnet */}
          <path 
            d="M60 85 C60 55 110 55 110 85 L110 95 L98 95 L98 85 C98 67 72 67 72 85 L72 95 L60 95 Z" 
            fill="#EF4444" 
            stroke="#111827" 
            strokeWidth="3" 
          />
          {/* Silver Magnet Tips */}
          <rect x="60" y="95" width="12" height="10" fill="#E2E8F0" stroke="#111827" strokeWidth="2" />
          <rect x="98" y="95" width="12" height="10" fill="#E2E8F0" stroke="#111827" strokeWidth="2" />
          
          {/* Magnetic energy field waves */}
          <path d="M75 112 C85 118 95 118 105 112" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M70 120 C85 128 95 128 110 120" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="3 3" />

          {/* Golden Die 1 (showing 6) */}
          <g transform="translate(105, 95) rotate(15)">
            <rect x="0" y="0" width="38" height="38" rx="6" fill="#FDE047" stroke="#111827" strokeWidth="3" />
            <circle cx="10" cy="10" r="3" fill="#111827" />
            <circle cx="10" cy="19" r="3" fill="#111827" />
            <circle cx="10" cy="28" r="3" fill="#111827" />
            <circle cx="28" cy="10" r="3" fill="#111827" />
            <circle cx="28" cy="19" r="3" fill="#111827" />
            <circle cx="28" cy="28" r="3" fill="#111827" />
          </g>

          {/* Golden Die 2 (showing 5 or 6) */}
          <g transform="translate(145, 125) rotate(-10)">
            <rect x="0" y="0" width="36" height="36" rx="6" fill="#FACC15" stroke="#111827" strokeWidth="3" />
            <circle cx="9" cy="9" r="3" fill="#111827" />
            <circle cx="27" cy="9" r="3" fill="#111827" />
            <circle cx="18" cy="18" r="3" fill="#111827" />
            <circle cx="9" cy="27" r="3" fill="#111827" />
            <circle cx="27" cy="27" r="3" fill="#111827" />
          </g>
        </svg>
      );

    case 'penthouse-tower':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Glass skyscraper with luxury penthouse */}
          <path d="M85 175 L85 70 L155 70 L155 175 Z" fill="#DBEAFE" stroke="#111827" strokeWidth="3.5" />
          {/* Windows grid */}
          <g stroke="#93C5FD" strokeWidth="1.5">
            <line x1="95" y1="80" x2="95" y2="170" />
            <line x1="108" y1="80" x2="108" y2="170" />
            <line x1="120" y1="80" x2="120" y2="170" />
            <line x1="132" y1="80" x2="132" y2="170" />
            <line x1="145" y1="80" x2="145" y2="170" />
            <line x1="85" y1="95" x2="155" y2="95" />
            <line x1="85" y1="115" x2="155" y2="115" />
            <line x1="85" y1="135" x2="155" y2="135" />
            <line x1="85" y1="155" x2="155" y2="155" />
          </g>
          {/* Penthouse Rooftop Terrace with Swimming Pool & Palm */}
          <rect x="75" y="60" width="90" height="12" fill="#EC4899" stroke="#111827" strokeWidth="3" />
          {/* Helipad on roof */}
          <ellipse cx="120" cy="58" rx="20" ry="7" fill="#F472B6" stroke="#111827" strokeWidth="2" />
          <text x="120" y="62" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF">H</text>
          {/* Upward soaring financial arrow */}
          <path d="M60 150 L110 110 L140 125 L185 70" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M170 70 L185 70 L185 85" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'vault-door':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Outer heavy vault rim */}
          <circle cx="120" cy="120" r="54" fill="#94A3B8" stroke="#111827" strokeWidth="4" />
          {/* Vault locking bolts around perimeter */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <circle 
              key={i} 
              cx={120 + 44 * Math.cos((angle * Math.PI) / 180)} 
              cy={120 + 44 * Math.sin((angle * Math.PI) / 180)} 
              r="4" 
              fill="#F8FAFC" 
              stroke="#111827" 
              strokeWidth="2" 
            />
          ))}
          {/* Inner door */}
          <circle cx="120" cy="120" r="36" fill="#64748B" stroke="#111827" strokeWidth="3" />
          {/* Vault hand wheel */}
          <circle cx="120" cy="120" r="16" fill="#CBD5E1" stroke="#111827" strokeWidth="3" />
          <line x1="98" y1="120" x2="142" y2="120" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
          <line x1="120" y1="98" x2="120" y2="142" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
          <line x1="104" y1="104" x2="136" y2="136" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
          <line x1="104" y1="136" x2="136" y2="104" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
          <circle cx="120" cy="120" r="6" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
        </svg>
      );

    case 'prison-escape':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Prison iron bars bent open */}
          <line x1="68" y1="60" x2="68" y2="175" stroke="#111827" strokeWidth="4" />
          <path d="M92 60 L92 100 L76 130 L92 175" stroke="#111827" strokeWidth="4" strokeLinejoin="round" />
          <path d="M148 60 L148 100 L164 130 L148 175" stroke="#111827" strokeWidth="4" strokeLinejoin="round" />
          <line x1="172" y1="60" x2="172" y2="175" stroke="#111827" strokeWidth="4" />
          
          {/* Mr. Monopoly stepping proudly through the broken opening */}
          <ellipse cx="120" cy="115" rx="18" ry="20" fill="#FEE2E2" stroke="#111827" strokeWidth="2.5" />
          {/* Winking eye */}
          <path d="M112 110 L118 110" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
          <circle cx="126" cy="110" r="2.5" fill="#111827" />
          {/* Mustache */}
          <path d="M120 118 C115 113 105 115 101 120 C107 122 115 120 120 118 C125 120 133 122 139 120 C135 115 125 113 120 118 Z" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
          {/* Tipping Top Hat with hand */}
          <g transform="translate(10, -5) rotate(18 120 95)">
            <ellipse cx="120" cy="96" rx="24" ry="6" fill="#111827" stroke="#111827" strokeWidth="2" />
            <path d="M106 96 L108 72 L132 72 L134 96 Z" fill="#111827" stroke="#111827" strokeWidth="2" />
          </g>
          {/* Cane in hand */}
          <path d="M142 130 L152 175" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M138 128 C144 122 148 126 142 132" stroke="#F59E0B" strokeWidth="3.5" fill="none" />
        </svg>
      );

    case 'auction-paddle':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Large Auction Paddle with #1 */}
          <g transform="translate(100, 50)">
            {/* Wooden Handle */}
            <rect x="16" y="70" width="8" height="55" rx="3" fill="#92400E" stroke="#111827" strokeWidth="2.5" />
            {/* Round Paddle */}
            <circle cx="20" cy="40" r="36" fill="#06B6D4" stroke="#111827" strokeWidth="4" />
            <circle cx="20" cy="40" r="28" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
            <text x="20" y="50" textAnchor="middle" fontSize="30" fontWeight="900" fontFamily="sans-serif" fill="#111827">1</text>
          </g>
          {/* Auction gavel below */}
          <g transform="translate(48, 125) rotate(-20)">
            <rect x="0" y="8" width="55" height="7" rx="3" fill="#78350F" stroke="#111827" strokeWidth="2" />
            <rect x="36" y="0" width="22" height="24" rx="3" fill="#B45309" stroke="#111827" strokeWidth="2.5" />
          </g>
        </svg>
      );

    case 'sports-car':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* "P" Free Parking Sign */}
          <g transform="translate(145, 65)">
            <circle cx="16" cy="16" r="16" fill="#0284C7" stroke="#111827" strokeWidth="2.5" />
            <text x="16" y="24" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF">P</text>
          </g>
          {/* Red Vintage Monopoly Race Car Token */}
          <g transform="translate(55, 110)">
            {/* Car body */}
            <path d="M10 32 C15 20 30 18 60 18 C85 18 100 24 115 32 C120 35 125 40 120 45 L5 45 C0 40 5 35 10 32 Z" fill="#EF4444" stroke="#111827" strokeWidth="3.5" />
            {/* Cockpit & Windshield */}
            <path d="M48 18 L55 8 L72 8 L78 18 Z" fill="#93C5FD" stroke="#111827" strokeWidth="2.5" />
            {/* Exhaust pipe fire/sparkles */}
            <path d="M-2 40 L-14 36 L-6 42 L-16 46 L-2 44" fill="#F59E0B" stroke="#111827" strokeWidth="1.5" />
            {/* Front Wheel */}
            <circle cx="28" cy="44" r="14" fill="#111827" stroke="#111827" strokeWidth="2" />
            <circle cx="28" cy="44" r="6" fill="#E2E8F0" />
            {/* Rear Wheel */}
            <circle cx="96" cy="44" r="14" fill="#111827" stroke="#111827" strokeWidth="2" />
            <circle cx="96" cy="44" r="6" fill="#E2E8F0" />
          </g>
        </svg>
      );

    case 'wrecking-ball':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Heavy chain from top right */}
          <path d="M180 50 L125 110" stroke="#111827" strokeWidth="5" strokeDasharray="6 4" />
          {/* Giant spiked iron wrecking ball */}
          <circle cx="118" cy="118" r="28" fill="#334155" stroke="#111827" strokeWidth="4" />
          <circle cx="112" cy="112" r="5" fill="#64748B" />
          {/* Impact dust/shattered bricks */}
          <path d="M80 135 L68 145" stroke="#EF4444" strokeWidth="3" />
          <path d="M85 110 L65 105" stroke="#EF4444" strokeWidth="3" />
          {/* Crumbling red house */}
          <g transform="translate(62, 130)">
            <path d="M0 15 L18 0 L28 15 Z" fill="#DC2626" stroke="#111827" strokeWidth="2.5" />
            <rect x="0" y="15" width="28" height="20" fill="#EF4444" stroke="#111827" strokeWidth="2.5" />
            <path d="M12 18 L18 26 L12 34" stroke="#111827" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'bullet-train':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Railroad tracks */}
          <line x1="55" y1="160" x2="185" y2="160" stroke="#111827" strokeWidth="4" />
          <line x1="55" y1="168" x2="185" y2="168" stroke="#111827" strokeWidth="4" />
          {[65, 85, 105, 125, 145, 165].map((x, i) => (
            <line key={i} x1={x} y1="156" x2={x} y2="172" stroke="#78350F" strokeWidth="3" />
          ))}
          {/* Streamlined High-Speed Locomotive */}
          <g transform="translate(65, 95)">
            <path d="M0 45 L10 15 C25 8 70 8 95 8 C115 8 125 30 120 45 Z" fill="#4F46E5" stroke="#111827" strokeWidth="3.5" />
            {/* Front windshield */}
            <path d="M92 14 C106 14 114 26 112 32 L85 32 L85 14 Z" fill="#93C5FD" stroke="#111827" strokeWidth="2" />
            {/* Side windows */}
            <rect x="25" y="16" width="14" height="10" rx="2" fill="#E0E7FF" stroke="#111827" strokeWidth="1.5" />
            <rect x="45" y="16" width="14" height="10" rx="2" fill="#E0E7FF" stroke="#111827" strokeWidth="1.5" />
            <rect x="65" y="16" width="14" height="10" rx="2" fill="#E0E7FF" stroke="#111827" strokeWidth="1.5" />
            {/* Red racing stripe */}
            <rect x="0" y="34" width="118" height="4" fill="#EF4444" />
          </g>
        </svg>
      );

    case 'helicopter-money':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Helicopter Rotor spinning */}
          <line x1="60" y1="65" x2="180" y2="65" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
          <circle cx="120" cy="65" r="4" fill="#111827" />
          <line x1="120" y1="65" x2="120" y2="76" stroke="#111827" strokeWidth="4" />
          {/* Helicopter Cockpit */}
          <path d="M90 76 C70 76 65 95 65 110 C65 125 80 130 115 130 L160 130 C170 130 175 110 165 95 C155 80 135 76 115 76 Z" fill="#FB7185" stroke="#111827" strokeWidth="3.5" />
          {/* Glass window */}
          <path d="M72 90 C70 105 76 118 90 120 L90 90 Z" fill="#DBEAFE" stroke="#111827" strokeWidth="2" />
          {/* Skid landing gear */}
          <line x1="80" y1="145" x2="150" y2="145" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="95" y1="130" x2="90" y2="145" stroke="#111827" strokeWidth="2.5" />
          <line x1="135" y1="130" x2="140" y2="145" stroke="#111827" strokeWidth="2.5" />
          {/* Falling Golden Lifebuoy */}
          <g transform="translate(100, 140)">
            <circle cx="20" cy="20" r="18" fill="#FBBF24" stroke="#111827" strokeWidth="3" />
            <circle cx="20" cy="20" r="8" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
            <path d="M20 2 L20 12 M20 28 L20 38 M2 20 L12 20 M28 20 L38 20" stroke="#EF4444" strokeWidth="3" />
          </g>
        </svg>
      );

    case 'judge-gavel':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Sound block base */}
          <ellipse cx="120" cy="155" rx="36" ry="12" fill="#78350F" stroke="#111827" strokeWidth="3.5" />
          <ellipse cx="120" cy="150" rx="30" ry="8" fill="#92400E" stroke="#111827" strokeWidth="2" />
          {/* Impact lines */}
          <path d="M85 142 L72 136" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M155 142 L168 136" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M120 135 L120 124" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          {/* Gavel Head and Handle striking down */}
          <g transform="translate(105, 70) rotate(-25)">
            {/* Wooden Handle */}
            <rect x="18" y="35" width="8" height="65" rx="3" fill="#B45309" stroke="#111827" strokeWidth="3" />
            {/* Gavel Head */}
            <rect x="0" y="8" width="44" height="28" rx="4" fill="#78350F" stroke="#111827" strokeWidth="3.5" />
            {/* Brass Bands on head */}
            <rect x="8" y="8" width="5" height="28" fill="#FBBF24" />
            <rect x="31" y="8" width="5" height="28" fill="#FBBF24" />
          </g>
        </svg>
      );

    case 'power-grid':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Water Dam faucet & reservoir */}
          <path d="M65 170 C65 145 90 145 105 145 L105 170 Z" fill="#38BDF8" stroke="#111827" strokeWidth="3" />
          {/* Giant Lightbulb */}
          <g transform="translate(95, 60)">
            <path 
              d="M25 15 C10 15 0 28 0 42 C0 55 12 62 14 74 L36 74 C38 62 50 55 50 42 C50 28 40 15 25 15 Z" 
              fill="#FDE047" 
              stroke="#111827" 
              strokeWidth="3.5" 
            />
            {/* Bulb base screw */}
            <rect x="15" y="74" width="20" height="12" fill="#94A3B8" stroke="#111827" strokeWidth="2.5" />
            {/* Glowing filament */}
            <path d="M18 45 L22 35 L28 35 L32 45" stroke="#F97316" strokeWidth="2.5" fill="none" />
          </g>
          {/* Electric Lightning bolt */}
          <path d="M155 70 L135 105 L152 105 L130 155" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'train-station':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Steam train engine locomotive */}
          <g transform="translate(62, 75)">
            {/* Train body */}
            <rect x="25" y="30" width="75" height="40" rx="4" fill="#15803D" stroke="#111827" strokeWidth="3.5" />
            {/* Cab */}
            <rect x="75" y="15" width="30" height="55" rx="3" fill="#DC2626" stroke="#111827" strokeWidth="3.5" />
            <rect x="82" y="22" width="16" height="18" rx="2" fill="#BAE6FD" stroke="#111827" strokeWidth="2" />
            {/* Smokestack chimney */}
            <rect x="35" y="12" width="14" height="20" fill="#111827" stroke="#111827" strokeWidth="2.5" />
            <path d="M30 12 L54 12 L48 20 L36 20 Z" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
            {/* Cowcatcher cow-guard */}
            <path d="M15 70 L25 50 L25 70 Z" fill="#EF4444" stroke="#111827" strokeWidth="2.5" />
            {/* Steam clouds */}
            <circle cx="28" cy="4" r="6" fill="#E2E8F0" />
            <circle cx="18" cy="-2" r="9" fill="#F1F5F9" />
            <circle cx="5" cy="-8" r="12" fill="#F8FAFC" />
            {/* Wheels */}
            <circle cx="40" cy="72" r="12" fill="#111827" stroke="#111827" strokeWidth="2" />
            <circle cx="40" cy="72" r="5" fill="#E2E8F0" />
            <circle cx="68" cy="72" r="12" fill="#111827" stroke="#111827" strokeWidth="2" />
            <circle cx="68" cy="72" r="5" fill="#E2E8F0" />
            <circle cx="94" cy="70" r="14" fill="#111827" stroke="#111827" strokeWidth="2" />
            <circle cx="94" cy="70" r="6" fill="#E2E8F0" />
            <line x1="40" y1="72" x2="68" y2="72" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'grand-hotel':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Luxury Grand Hotel building (Parco della Vittoria) */}
          <g transform="translate(68, 65)">
            {/* Roof pediment */}
            <path d="M10 25 L52 2 L94 25 Z" fill="#DC2626" stroke="#111827" strokeWidth="3" />
            {/* Hotel body */}
            <rect x="10" y="25" width="84" height="65" fill="#EF4444" stroke="#111827" strokeWidth="3.5" />
            {/* Balconies and windows */}
            <rect x="20" y="35" width="14" height="16" rx="2" fill="#FEF08A" stroke="#111827" strokeWidth="1.8" />
            <rect x="45" y="35" width="14" height="16" rx="2" fill="#FEF08A" stroke="#111827" strokeWidth="1.8" />
            <rect x="70" y="35" width="14" height="16" rx="2" fill="#FEF08A" stroke="#111827" strokeWidth="1.8" />
            <rect x="20" y="60" width="14" height="16" rx="2" fill="#FEF08A" stroke="#111827" strokeWidth="1.8" />
            <rect x="70" y="60" width="14" height="16" rx="2" fill="#FEF08A" stroke="#111827" strokeWidth="1.8" />
            {/* Main Entrance Door with Golden Canopy */}
            <rect x="42" y="62" width="20" height="28" fill="#78350F" stroke="#111827" strokeWidth="2" />
            <path d="M38 60 L66 60 L62 55 L42 55 Z" fill="#F59E0B" stroke="#111827" strokeWidth="1.8" />
            {/* Five stars overhead */}
            <text x="52" y="20" textAnchor="middle" fontSize="11" fill="#FDE047">★★★★★</text>
          </g>
        </svg>
      );

    case 'fifty-cash':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Stacks of 50-value Monopoly banknotes with strap */}
          <g transform="translate(65, 80)">
            {/* Lower bills in stack */}
            <rect x="6" y="24" width="98" height="42" rx="3" fill="#F97316" stroke="#111827" strokeWidth="2.5" />
            <rect x="3" y="16" width="98" height="42" rx="3" fill="#FB923C" stroke="#111827" strokeWidth="2.5" />
            <rect x="0" y="8" width="98" height="42" rx="3" fill="#FDBA74" stroke="#111827" strokeWidth="3" />
            {/* Top 50 banknote */}
            <rect x="0" y="0" width="98" height="44" rx="3" fill="#FFEDD5" stroke="#111827" strokeWidth="3" />
            {/* Inner border of banknote */}
            <rect x="4" y="4" width="90" height="36" rx="2" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
            {/* Number 50 in center and corners */}
            <text x="49" y="28" textAnchor="middle" fontSize="20" fontWeight="900" fill="#C2410C" fontFamily="sans-serif">50</text>
            <text x="12" y="15" textAnchor="middle" fontSize="9" fontWeight="900" fill="#9A3412">50</text>
            <text x="86" y="37" textAnchor="middle" fontSize="9" fontWeight="900" fill="#9A3412">50</text>
            {/* Golden bank strap band */}
            <rect x="38" y="-2" width="22" height="48" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
            <line x1="42" y1="-2" x2="42" y2="46" stroke="#D97706" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'deed-scroll':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Rolled contract deed with colored banner and seal */}
          <g transform="translate(75, 68)">
            {/* Main Deed Card */}
            <rect x="15" y="0" width="60" height="85" rx="3" fill="#FFFFFF" stroke="#111827" strokeWidth="3" />
            {/* Red Property Header bar */}
            <rect x="18" y="3" width="54" height="20" fill="#EF4444" stroke="#111827" strokeWidth="1.5" />
            <text x="45" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF">CONTRATTO</text>
            {/* Text lines */}
            <line x1="22" y1="32" x2="68" y2="32" stroke="#111827" strokeWidth="2" />
            <line x1="22" y1="42" x2="68" y2="42" stroke="#94A3B8" strokeWidth="1.8" />
            <line x1="22" y1="52" x2="68" y2="52" stroke="#94A3B8" strokeWidth="1.8" />
            <line x1="22" y1="62" x2="68" y2="62" stroke="#94A3B8" strokeWidth="1.8" />
            {/* Golden Wax Seal with Ribbon */}
            <g transform="translate(45, 75)">
              <path d="M-8 0 L-14 16 L-4 12 L0 18 L0 0 Z" fill="#DC2626" />
              <path d="M8 0 L14 16 L4 12 L0 18 L0 0 Z" fill="#B91C1C" />
              <circle cx="0" cy="0" r="10" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
              <circle cx="0" cy="0" r="7" fill="#FBBF24" />
              <text x="0" y="3" textAnchor="middle" fontSize="8" fontWeight="900" fill="#78350F">M</text>
            </g>
          </g>
        </svg>
      );

    case 'auction-hammer':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Classic wooden auction gavel striking block */}
          <g transform="translate(68, 65)">
            {/* Sound block base */}
            <rect x="18" y="75" width="68" height="16" rx="4" fill="#92400E" stroke="#111827" strokeWidth="3" />
            {/* Impact action lines */}
            <path d="M42 68 L34 60" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <path d="M62 68 L70 60" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            {/* Gavel hammer head and handle striking */}
            <g transform="translate(52, 45) rotate(-30)">
              <rect x="0" y="-12" width="28" height="24" rx="3" fill="#78350F" stroke="#111827" strokeWidth="3" />
              <rect x="4" y="-12" width="4" height="24" fill="#FBBF24" />
              <rect x="20" y="-12" width="4" height="24" fill="#FBBF24" />
              <rect x="10" y="12" width="8" height="55" rx="3" fill="#B45309" stroke="#111827" strokeWidth="3" />
            </g>
          </g>
        </svg>
      );

    case 'jetpack-rocket':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Retro Rocket / Jetpack blasting with exhaust */}
          <g transform="translate(75, 60)">
            {/* Rocket fuselage */}
            <path d="M45 5 C30 20 25 50 25 65 L65 65 C65 50 60 20 45 5 Z" fill="#EF4444" stroke="#111827" strokeWidth="3.5" />
            {/* Round cockpit window */}
            <circle cx="45" cy="35" r="10" fill="#38BDF8" stroke="#111827" strokeWidth="2.5" />
            <circle cx="43" cy="32" r="3" fill="#FFFFFF" />
            {/* Fins */}
            <path d="M25 50 L8 68 L25 66 Z" fill="#DC2626" stroke="#111827" strokeWidth="2.5" />
            <path d="M65 50 L82 68 L65 66 Z" fill="#DC2626" stroke="#111827" strokeWidth="2.5" />
            {/* Rocket Exhaust Thruster */}
            <rect x="35" y="65" width="20" height="8" rx="2" fill="#64748B" stroke="#111827" strokeWidth="2" />
            {/* Fire flame */}
            <path d="M36 73 C30 92 45 105 45 110 C45 105 60 92 54 73 Z" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
            <path d="M40 73 C36 86 45 94 45 97 C45 94 54 86 50 73 Z" fill="#FDE047" />
          </g>
        </svg>
      );

    case 'single-house':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Single green house with red roof */}
          <g transform="translate(75, 72)">
            {/* Red roof */}
            <path d="M5 40 L45 8 L85 40 Z" fill="#DC2626" stroke="#111827" strokeWidth="3.5" />
            {/* Chimney */}
            <rect x="62" y="14" width="10" height="18" fill="#B91C1C" stroke="#111827" strokeWidth="2" />
            {/* House body */}
            <rect x="12" y="40" width="66" height="48" fill="#16A34A" stroke="#111827" strokeWidth="3.5" />
            {/* Windows and Door */}
            <rect x="22" y="48" width="14" height="14" rx="2" fill="#FEF08A" stroke="#111827" strokeWidth="1.8" />
            <rect x="54" y="48" width="14" height="14" rx="2" fill="#FEF08A" stroke="#111827" strokeWidth="1.8" />
            <rect x="37" y="62" width="16" height="26" fill="#78350F" stroke="#111827" strokeWidth="2" />
            <circle cx="49" cy="75" r="1.5" fill="#F59E0B" />
          </g>
        </svg>
      );

    case 'monopoly-set':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Row of 3 houses on colored monopoly street */}
          <g transform="translate(62, 85)">
            {/* Green base avenue */}
            <rect x="0" y="45" width="115" height="14" rx="3" fill="#15803D" stroke="#111827" strokeWidth="3" />
            {/* House 1 */}
            <g transform="translate(10, 8)">
              <path d="M0 16 L14 2 L28 16 Z" fill="#DC2626" stroke="#111827" strokeWidth="2" />
              <rect x="0" y="16" width="28" height="22" fill="#EF4444" stroke="#111827" strokeWidth="2" />
            </g>
            {/* House 2 */}
            <g transform="translate(44, 4)">
              <path d="M0 18 L14 2 L28 18 Z" fill="#DC2626" stroke="#111827" strokeWidth="2" />
              <rect x="0" y="18" width="28" height="24" fill="#EF4444" stroke="#111827" strokeWidth="2" />
            </g>
            {/* House 3 */}
            <g transform="translate(78, 8)">
              <path d="M0 16 L14 2 L28 16 Z" fill="#DC2626" stroke="#111827" strokeWidth="2" />
              <rect x="0" y="16" width="28" height="22" fill="#EF4444" stroke="#111827" strokeWidth="2" />
            </g>
          </g>
        </svg>
      );

    case 'all-buildings':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Green house + Red Hotel side by side */}
          <g transform="translate(68, 75)">
            {/* Green House */}
            <g transform="translate(0, 15)">
              <path d="M2 18 L18 2 L34 18 Z" fill="#15803D" stroke="#111827" strokeWidth="2.5" />
              <rect x="2" y="18" width="32" height="30" fill="#22C55E" stroke="#111827" strokeWidth="2.5" />
              <rect x="8" y="24" width="8" height="8" fill="#FEF08A" stroke="#111827" strokeWidth="1.5" />
              <rect x="14" y="36" width="9" height="12" fill="#78350F" stroke="#111827" strokeWidth="1.5" />
            </g>
            {/* Big Red Hotel */}
            <g transform="translate(44, 0)">
              <path d="M4 25 L32 2 L60 25 Z" fill="#DC2626" stroke="#111827" strokeWidth="3" />
              <rect x="4" y="25" width="56" height="45" fill="#EF4444" stroke="#111827" strokeWidth="3" />
              <rect x="12" y="32" width="10" height="10" fill="#FEF08A" stroke="#111827" strokeWidth="1.5" />
              <rect x="42" y="32" width="10" height="10" fill="#FEF08A" stroke="#111827" strokeWidth="1.5" />
              <rect x="25" y="52" width="14" height="18" fill="#7F1D1D" stroke="#111827" strokeWidth="2" />
            </g>
          </g>
        </svg>
      );

    case 'bank-vault-cash':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Bank stacks of green Monopoly cash with golden band */}
          <g transform="translate(68, 80)">
            <rect x="6" y="20" width="92" height="40" rx="3" fill="#15803D" stroke="#111827" strokeWidth="3" />
            <rect x="3" y="10" width="92" height="40" rx="3" fill="#22C55E" stroke="#111827" strokeWidth="3" />
            <rect x="0" y="0" width="92" height="40" rx="3" fill="#86EFAC" stroke="#111827" strokeWidth="3" />
            <circle cx="46" cy="20" r="12" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
            <text x="46" y="25" textAnchor="middle" fontSize="16" fontWeight="900" fill="#14532D">M</text>
            {/* Golden Ribbon Band */}
            <rect x="36" y="-2" width="20" height="44" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'purchase-die':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Monopoly die with little house on face */}
          <g transform="translate(75, 75)">
            <rect x="0" y="0" width="90" height="90" rx="14" fill="#F8FAFC" stroke="#111827" strokeWidth="4" />
            {/* Little house illustration on die face */}
            <path d="M25 45 L45 25 L65 45 Z" fill="#DC2626" stroke="#111827" strokeWidth="3" />
            <rect x="25" y="45" width="40" height="32" fill="#16A34A" stroke="#111827" strokeWidth="3" />
            <rect x="38" y="56" width="14" height="21" fill="#78350F" stroke="#111827" strokeWidth="1.8" />
          </g>
        </svg>
      );

    case 'golden-hardhat':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Golden construction worker helmet / Caschetto d'oro */}
          <g transform="translate(70, 70)">
            {/* Helmet dome */}
            <path d="M15 50 C15 20 85 20 85 50 Z" fill="#FBBF24" stroke="#111827" strokeWidth="4" />
            {/* Helmet ridge */}
            <path d="M42 22 L58 22 L56 50 L44 50 Z" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
            {/* Brim */}
            <ellipse cx="50" cy="52" rx="45" ry="9" fill="#F59E0B" stroke="#111827" strokeWidth="3.5" />
            {/* Construction Worker Face */}
            <ellipse cx="50" cy="72" rx="20" ry="20" fill="#FEE2E2" stroke="#111827" strokeWidth="3" />
            <circle cx="43" cy="68" r="3" fill="#111827" />
            <circle cx="57" cy="68" r="3" fill="#111827" />
            <path d="M44 80 C48 85 52 85 56 80" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'star-card':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Card with big black star (Piazza Pulita) */}
          <g transform="translate(85, 62)">
            <rect x="0" y="0" width="70" height="95" rx="5" fill="#FFFFFF" stroke="#111827" strokeWidth="4" />
            <rect x="5" y="5" width="60" height="85" rx="3" fill="#F8FAFC" stroke="#111827" strokeWidth="2" />
            {/* Big 5-point star */}
            <path 
              d="M35 22 L41 38 L58 38 L44 48 L49 64 L35 54 L21 64 L26 48 L12 38 L29 38 Z" 
              fill="#111827" 
              stroke="#111827" 
              strokeWidth="2" 
            />
          </g>
        </svg>
      );

    case 'checkered-flag':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Racing Checkered Flag for Victory (VIA!) */}
          <g transform="translate(70, 65)">
            {/* Flagpole */}
            <line x1="20" y1="10" x2="20" y2="105" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
            <circle cx="20" cy="8" r="5" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
            {/* Checkered flag waving */}
            <g transform="translate(22, 12)">
              <rect x="0" y="0" width="70" height="50" fill="#FFFFFF" stroke="#111827" strokeWidth="3" />
              {/* Checkers */}
              <rect x="0" y="0" width="17.5" height="12.5" fill="#111827" />
              <rect x="35" y="0" width="17.5" height="12.5" fill="#111827" />
              <rect x="17.5" y="12.5" width="17.5" height="12.5" fill="#111827" />
              <rect x="52.5" y="12.5" width="17.5" height="12.5" fill="#111827" />
              <rect x="0" y="25" width="17.5" height="12.5" fill="#111827" />
              <rect x="35" y="25" width="17.5" height="12.5" fill="#111827" />
              <rect x="17.5" y="37.5" width="17.5" height="12.5" fill="#111827" />
              <rect x="52.5" y="37.5" width="17.5" height="12.5" fill="#111827" />
            </g>
          </g>
        </svg>
      );

    case 'vault-temple':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Bank Temple Facade with red number 7 inside */}
          <g transform="translate(68, 65)">
            {/* Pediment roof */}
            <path d="M5 25 L52 2 L99 25 Z" fill="#CBD5E1" stroke="#111827" strokeWidth="3.5" />
            {/* Columns */}
            <rect x="12" y="25" width="12" height="55" fill="#94A3B8" stroke="#111827" strokeWidth="2.5" />
            <rect x="34" y="25" width="12" height="55" fill="#94A3B8" stroke="#111827" strokeWidth="2.5" />
            <rect x="58" y="25" width="12" height="55" fill="#94A3B8" stroke="#111827" strokeWidth="2.5" />
            <rect x="80" y="25" width="12" height="55" fill="#94A3B8" stroke="#111827" strokeWidth="2.5" />
            {/* Base */}
            <rect x="2" y="78" width="100" height="14" rx="2" fill="#64748B" stroke="#111827" strokeWidth="3" />
            {/* Red number 7 in center */}
            <text x="52" y="65" textAnchor="middle" fontSize="38" fontWeight="900" fill="#DC2626" stroke="#B91C1C" strokeWidth="1">7</text>
          </g>
        </svg>
      );

    case 'double-dice':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Pair of dice with red dots (Doppi) */}
          <g transform="translate(65, 80)">
            {/* Die 1 */}
            <rect x="5" y="5" width="45" height="45" rx="8" fill="#F8FAFC" stroke="#111827" strokeWidth="3" />
            <circle cx="17" cy="17" r="4" fill="#DC2626" />
            <circle cx="38" cy="38" r="4" fill="#DC2626" />
            <circle cx="27" cy="27" r="4" fill="#DC2626" />
            {/* Die 2 */}
            <rect x="58" y="15" width="45" height="45" rx="8" fill="#F8FAFC" stroke="#111827" strokeWidth="3" />
            <circle cx="70" cy="27" r="4" fill="#DC2626" />
            <circle cx="91" cy="48" r="4" fill="#DC2626" />
            <circle cx="80" cy="37" r="4" fill="#DC2626" />
            {/* Slash line */}
            <line x1="27" y1="-2" x2="27" y2="52" stroke="#EF4444" strokeWidth="2.5" />
          </g>
        </svg>
      );

    case 'idea-lightbulb':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Glowing yellow lightbulb for Ricerca del Successo */}
          <g transform="translate(85, 60)">
            <path 
              d="M35 15 C15 15 5 30 5 48 C5 62 18 72 20 84 L50 84 C52 72 65 62 65 48 C65 30 55 15 35 15 Z" 
              fill="#FBBF24" 
              stroke="#111827" 
              strokeWidth="4" 
            />
            {/* Screw base */}
            <rect x="22" y="84" width="26" height="6" fill="#94A3B8" stroke="#111827" strokeWidth="2" />
            <rect x="24" y="90" width="22" height="6" fill="#94A3B8" stroke="#111827" strokeWidth="2" />
            <ellipse cx="35" cy="98" rx="8" ry="4" fill="#64748B" stroke="#111827" strokeWidth="2" />
            {/* Filament */}
            <path d="M26 50 L31 38 L39 38 L44 50" stroke="#F97316" strokeWidth="3" fill="none" />
            {/* Radiance sparkles */}
            <line x1="35" y1="2" x2="35" y2="10" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="5" y1="20" x2="12" y2="25" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="65" y1="20" x2="58" y2="25" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'golden-trophy':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Big Golden Trophy Cup (Campione Assoluto) */}
          <g transform="translate(75, 62)">
            {/* Cup Body */}
            <path d="M15 15 L75 15 C75 48 55 60 45 60 C35 60 15 48 15 15 Z" fill="#FBBF24" stroke="#111827" strokeWidth="3.5" />
            {/* Handles */}
            <path d="M15 22 C-2 22 -2 45 15 45" stroke="#111827" strokeWidth="3.5" fill="none" />
            <path d="M75 22 C92 22 92 45 75 45" stroke="#111827" strokeWidth="3.5" fill="none" />
            {/* Stem & Pedestal */}
            <rect x="40" y="60" width="10" height="18" fill="#F59E0B" stroke="#111827" strokeWidth="2.5" />
            <rect x="25" y="78" width="40" height="18" rx="2" fill="#78350F" stroke="#111827" strokeWidth="3" />
            <rect x="32" y="82" width="26" height="10" rx="1" fill="#FDE047" stroke="#111827" strokeWidth="1.2" />
            {/* Star on Cup */}
            <text x="45" y="42" textAnchor="middle" fontSize="18" fill="#FFFFFF">★</text>
          </g>
        </svg>
      );

    case 'lucky-number-seven':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Bold Red 7 in circular badge (Il Numero 7) */}
          <g transform="translate(85, 65)">
            <circle cx="35" cy="45" r="42" fill="#FEF2F2" stroke="#EF4444" strokeWidth="3" strokeDasharray="4 4" />
            <text 
              x="35" 
              y="68" 
              textAnchor="middle" 
              fontSize="68" 
              fontWeight="900" 
              fontFamily="'Outfit', sans-serif" 
              fill="#DC2626" 
              stroke="#991B1B" 
              strokeWidth="2"
            >
              7
            </text>
          </g>
        </svg>
      );

    case 'green-houses':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Subtle blueprint grid in background */}
          <g opacity="0.25">
            <line x1="70" y1="90" x2="170" y2="90" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="70" y1="120" x2="170" y2="120" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="70" y1="150" x2="170" y2="150" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="100" y1="70" x2="100" y2="170" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="140" y1="70" x2="140" y2="170" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
          {/* Ground grass patch */}
          <ellipse cx="120" cy="165" rx="55" ry="10" fill="#86EFAC" stroke="#111827" strokeWidth="2.5" />
          {/* House 1 (Left - Green Monopoly House) */}
          <g transform="translate(74, 98)">
            {/* Chimney */}
            <rect x="7" y="2" width="6" height="12" fill="#15803D" stroke="#111827" strokeWidth="2.5" />
            {/* Roof */}
            <path d="M-2 16 L22 0 L46 16 Z" fill="#22C55E" stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
            {/* House body */}
            <rect x="2" y="16" width="40" height="30" fill="#16A34A" stroke="#111827" strokeWidth="3" />
            {/* Door */}
            <rect x="16" y="28" width="12" height="18" fill="#14532D" stroke="#111827" strokeWidth="2" />
            {/* Windows */}
            <rect x="6" y="20" width="7" height="7" fill="#FEF08A" stroke="#111827" strokeWidth="1.5" />
            <rect x="31" y="20" width="7" height="7" fill="#FEF08A" stroke="#111827" strokeWidth="1.5" />
          </g>
          {/* House 2 (Right - Green Monopoly House slightly overlapping) */}
          <g transform="translate(122, 106)">
            {/* Chimney */}
            <rect x="31" y="2" width="6" height="12" fill="#15803D" stroke="#111827" strokeWidth="2.5" />
            {/* Roof */}
            <path d="M-2 16 L22 0 L46 16 Z" fill="#4ADE80" stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
            {/* House body */}
            <rect x="2" y="16" width="40" height="30" fill="#22C55E" stroke="#111827" strokeWidth="3" />
            {/* Door */}
            <rect x="16" y="28" width="12" height="18" fill="#14532D" stroke="#111827" strokeWidth="2" />
            {/* Windows */}
            <rect x="6" y="20" width="7" height="7" fill="#FEF08A" stroke="#111827" strokeWidth="1.5" />
            <rect x="31" y="20" width="7" height="7" fill="#FEF08A" stroke="#111827" strokeWidth="1.5" />
          </g>
          {/* Golden Approved Stamp Ribbon badge */}
          <g transform="translate(142, 68) scale(0.85)">
            <circle cx="20" cy="20" r="18" fill="#FBBF24" stroke="#111827" strokeWidth="3" />
            <path d="M12 20 L18 26 L29 14" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </svg>
      );

    case 'solar-energy':
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Sky background aura */}
          <circle cx="120" cy="120" r="66" fill="#ECFDF5" />
          {/* Radiant Sun in top right */}
          <g transform="translate(145, 65)">
            <circle cx="15" cy="15" r="14" fill="#FBBF24" stroke="#111827" strokeWidth="3" />
            {/* Sun rays */}
            <line x1="15" y1="-3" x2="15" y2="4" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="33" y1="15" x2="26" y2="15" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="28" y1="2" x2="22" y2="8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="2" y1="2" x2="8" y2="8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* Eco Shield Badge */}
          <path 
            d="M85 85 L155 85 L155 125 C155 155 120 168 120 168 C120 168 85 155 85 125 Z" 
            fill="#059669" 
            stroke="#111827" 
            strokeWidth="4" 
          />
          {/* Inner Shield */}
          <path 
            d="M93 92 L147 92 L147 122 C147 145 120 156 120 156 C120 156 93 145 93 122 Z" 
            fill="#10B981" 
            stroke="#111827" 
            strokeWidth="2" 
          />
          {/* Solar Panel pattern on top of shield */}
          <g opacity="0.4">
            <line x1="95" y1="102" x2="145" y2="102" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="98" y1="112" x2="142" y2="112" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="108" y1="92" x2="108" y2="120" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="120" y1="92" x2="120" y2="135" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="132" y1="92" x2="132" y2="120" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
          {/* Green Sprout / Leaf & Monopoly M */}
          <g transform="translate(108, 114) scale(1.35)">
            <path d="M2 18 L2 2 L9 13 L16 2 L16 18" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="-1" y1="8" x2="19" y2="8" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
            <line x1="-1" y1="12" x2="19" y2="12" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* Green Leaf accent */}
          <path d="M80 120 C70 95 90 75 105 78 C105 95 95 115 80 120 Z" fill="#34D399" stroke="#111827" strokeWidth="2.5" />
        </svg>
      );

    default:
      // Generic luxury Monopoly symbol (Gold Medallion with M & stars)
      return (
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
          {/* Golden Shield / Medallion */}
          <path 
            d="M85 85 L155 85 L155 125 C155 155 120 168 120 168 C120 168 85 155 85 125 Z" 
            fill="#FBBF24" 
            stroke="#111827" 
            strokeWidth="3.5" 
          />
          {/* Inner Shield */}
          <path 
            d="M93 92 L147 92 L147 122 C147 145 120 156 120 156 C120 156 93 145 93 122 Z" 
            fill="#F59E0B" 
            stroke="#111827" 
            strokeWidth="2" 
          />
          {/* Monopoly Double-Bar M inside */}
          <g transform="translate(108, 105) scale(1.4)">
            <path d="M2 18 L2 2 L9 13 L16 2 L16 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="-1" y1="8" x2="19" y2="8" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="-1" y1="12" x2="19" y2="12" stroke="#FFFFFF" strokeWidth="2" />
          </g>
          {/* Laurel Wreath leaves */}
          <path d="M72 110 C68 135 85 155 105 168" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M168 110 C172 135 155 155 135 168" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
  }
};
