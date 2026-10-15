import React, { useState } from 'react';
import type { AbilityCard } from '../types.ts';
import { CardIllustration, MoneySackIcon } from './CardIllustrations.tsx';

interface MonopolyCardProps {
  card: AbilityCard;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'print';
  showBack?: boolean;
  isFlippable?: boolean;
  onClick?: () => void;
  className?: string;
  forceFront?: boolean;
  cornerStyle?: 'squared' | 'rounded';
}

export const MonopolyCard: React.FC<MonopolyCardProps> = ({
  card,
  size = 'md',
  showBack = false,
  isFlippable = false,
  onClick,
  className = '',
  forceFront = false,
  cornerStyle,
}) => {
  const [flipped, setFlipped] = useState(showBack && !forceFront);

  const handleClick = () => {
    if (isFlippable) {
      setFlipped(!flipped);
    }
    if (onClick) {
      onClick();
    }
  };

  // Determine corner style: prop -> card.cornerStyle -> default to 'squared' (inspired by the original)
  const isSquared = (cornerStyle || card.cornerStyle || 'squared') === 'squared';

  // Dimensions based on size - calibrated for generous text breathing room
  const sizeStyles = {
    sm: 'w-[180px] h-[280px] text-[10px]',
    md: 'w-[240px] h-[375px] text-xs',
    lg: 'w-[315px] h-[495px] text-sm',
    xl: 'w-[375px] h-[590px] text-base',
    print: 'w-[64mm] h-[100mm] text-[10.5px] print:m-0',
  }[size];

  // Dynamic typography calculation so card text ALWAYS fits without ever overflowing
  const titleLen = card.title?.length || 0;
  const descLen = card.description?.length || 0;

  // Title sizing
  const titleSize = {
    sm: titleLen > 18 ? 'text-[9.5px]' : 'text-[11px]',
    md: titleLen > 20 ? 'text-[11.5px]' : titleLen > 16 ? 'text-[12.5px]' : 'text-[13.5px]',
    lg: titleLen > 20 ? 'text-[15px]' : titleLen > 16 ? 'text-[16.5px]' : 'text-[18px]',
    xl: titleLen > 20 ? 'text-[17px]' : titleLen > 16 ? 'text-[19px]' : 'text-[21px]',
    print: titleLen > 20 ? 'text-[11px]' : 'text-[12px]',
  }[size];

  // Subtitle sizing
  const subtitleSize = {
    sm: 'text-[8px] leading-tight',
    md: 'text-[9.5px] leading-tight',
    lg: 'text-[12px] leading-tight',
    xl: 'text-[13.5px] leading-tight',
    print: 'text-[9px] leading-tight',
  }[size];

  // Body rule description sizing - adapts to text length so it never touches or overflows borders
  const bodySize = {
    sm: descLen > 140 
      ? 'text-[7.5px] leading-[1.25]' 
      : descLen > 100 
      ? 'text-[8px] leading-[1.28]' 
      : 'text-[8.5px] leading-[1.32]',
    md: descLen > 150 
      ? 'text-[10px] leading-[1.28]' 
      : descLen > 115 
      ? 'text-[10.5px] leading-[1.32]' 
      : descLen > 80 
      ? 'text-[11px] leading-[1.35]' 
      : 'text-[12px] leading-[1.38]',
    lg: descLen > 150 
      ? 'text-[12.5px] leading-[1.32]' 
      : descLen > 115 
      ? 'text-[13px] leading-[1.36]' 
      : 'text-[14px] leading-[1.4]',
    xl: descLen > 150 
      ? 'text-[14.5px] leading-[1.35]' 
      : descLen > 115 
      ? 'text-[15.5px] leading-[1.38]' 
      : 'text-[16.5px] leading-[1.42]',
    print: descLen > 140 
      ? 'text-[8.5px] leading-[1.26]' 
      : descLen > 100 
      ? 'text-[9.2px] leading-[1.3]' 
      : 'text-[10px] leading-[1.34]',
  }[size];

  // Corner radius classes
  const outerRadius = isSquared ? 'rounded-none' : 'rounded-2xl';
  const cardRadius = isSquared ? 'rounded-none' : 'rounded-2xl';
  const outerBorderRadius = isSquared ? 'rounded-none' : 'rounded-xl';
  const innerBorderRadius = isSquared ? 'rounded-none' : 'rounded-lg';
  const bannerRadius = isSquared ? 'rounded-none' : 'rounded-t-[6px]';
  const backSealRadius = isSquared ? 'rounded-none' : 'rounded-full';

  return (
    <div
      onClick={handleClick}
      className={`relative select-none transition-transform duration-300 ${
        isFlippable ? 'cursor-pointer hover:scale-[1.02]' : ''
      } ${sizeStyles} ${outerRadius} ${className}`}
      style={{ perspective: '1000px' }}
      data-testid={`monopoly-card-${card.id}`}
      data-corner-style={isSquared ? 'squared' : 'rounded'}
    >
      <div
        className={`w-full h-full duration-500 shadow-xl transition-all ${cardRadius} ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        } [transform-style:preserve-3d]`}
      >
        {/* ================= FRONT OF CARD ================= */}
        <div
          className={`absolute inset-0 w-full h-full bg-white p-2 sm:p-2.5 [backface-visibility:hidden] flex flex-col box-border ${cardRadius}`}
          style={{
            boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Outer Black Border Frame */}
          <div className={`w-full h-full border-[3px] border-black p-[2px] flex flex-col bg-white ${outerBorderRadius}`}>
            {/* Inner Thin Black Border Frame */}
            <div className={`w-full h-full border-[1.5px] border-black flex flex-col overflow-hidden relative bg-[#F4FAF7] ${innerBorderRadius}`}>
              
              {/* Subtle Zig-Zag / Guilloche Watermark Pattern in Background */}
              <div 
                className="absolute inset-0 opacity-[0.24] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='16' viewBox='0 0 32 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8 L8 0 L16 8 L24 0 L32 8 L24 16 L16 8 L8 16 Z' fill='none' stroke='%2334D399' stroke-width='0.8' stroke-opacity='0.4'/%3E%3C/svg%3E")`,
                  backgroundSize: '24px 12px',
                }}
              />

              {/* Faint Center Watermark Stamp */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <svg width="170" height="170" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="#000000" strokeWidth="6" />
                  <path d="M20 75 L20 25 L50 60 L80 25 L80 75" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
                  <line x1="10" y1="45" x2="90" y2="45" stroke="#000000" strokeWidth="6" />
                  <line x1="10" y1="55" x2="90" y2="55" stroke="#000000" strokeWidth="6" />
                </svg>
              </div>

              {/* Top Section: Header Banner with Illustration & Money Sack (Calibrated h-[38%]) */}
              <div 
                className={`relative w-full h-[38%] border-b-[2.5px] border-black flex items-center justify-between px-2 overflow-hidden shadow-inner shrink-0 ${bannerRadius}`}
                style={{ backgroundColor: card.bannerColor }}
              >
                {/* Money Sack with Value & dynamic rays (Left) */}
                <div className="relative z-10 flex items-center justify-center -ml-1 shrink-0">
                  <MoneySackIcon 
                    amount={card.cost} 
                    size={size === 'sm' ? 48 : size === 'md' ? 62 : size === 'print' ? 58 : 78} 
                  />
                </div>

                {/* Character / Action Illustration Vignette (Center / Right) */}
                <div className="relative z-10 flex-1 h-full flex items-center justify-center -mr-1">
                  <CardIllustration 
                    illustrationKey={card.illustrationKey} 
                    customSvg={card.customSvg}
                    customImageUrl={card.customImageUrl}
                  />
                </div>
              </div>

              {/* Lower Section: Content Area - Guaranteed complete fit without overflow */}
              <div className="relative z-10 flex-1 flex flex-col justify-between items-center text-center p-2 sm:p-2.5 overflow-hidden">
                
                {/* Top: Card Title & Subtitle Header */}
                <div className="w-full flex flex-col items-center gap-0.5 shrink-0">
                  <h3 
                    className={`${titleSize} uppercase text-black tracking-tight leading-tight font-black`}
                    style={{ fontFamily: "'Outfit', 'Impact', sans-serif", letterSpacing: '-0.015em' }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className={`${subtitleSize} italic font-semibold text-slate-800 leading-tight px-0.5`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {card.subtitle}
                  </p>
                </div>

                {/* Middle: Card Description Rule Body - Centered, comfortable and guaranteed to fit */}
                <div className="flex-1 w-full flex items-center justify-center my-auto px-1 py-0.5 overflow-hidden">
                  <p 
                    className={`${bodySize} font-bold text-slate-950 text-center`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Bottom: Subtle Category & Type footer divider bar */}
                <div className="w-full pt-1 border-t border-black/15 flex items-center justify-between text-[7.5px] sm:text-[8px] md:text-[8.5px] font-black uppercase text-slate-600 tracking-wider shrink-0 select-none">
                  <span className="truncate max-w-[55%]">● {card.category}</span>
                  <span className="truncate max-w-[45%] text-right font-extrabold text-slate-700">{card.type}</span>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ================= BACK OF CARD ================= */}
        <div
          className={`absolute inset-0 w-full h-full bg-white p-2 sm:p-2.5 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col box-border ${cardRadius}`}
          style={{
            boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Outer Black Border Frame */}
          <div className={`w-full h-full border-[3px] border-black p-[2px] flex flex-col bg-white ${outerBorderRadius}`}>
            {/* Inner Thin Black Border Frame with Rich Green Monopoly Velvet Backing */}
            <div className={`w-full h-full border-[1.5px] border-black flex flex-col items-center justify-center p-3 relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-amber-200 overflow-hidden ${innerBorderRadius}`}>
              
              {/* Ornate Guilloche Border on Card Back */}
              <div className={`absolute inset-2 border-2 border-amber-400/50 pointer-events-none ${isSquared ? 'rounded-none' : 'rounded-sm'}`} />
              <div className={`absolute inset-3 border border-amber-300/30 pointer-events-none ${isSquared ? 'rounded-none' : 'rounded-sm'}`} />
              
              {/* Corner Ornaments */}
              <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-300" />
              <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-300" />
              <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-300" />
              <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-300" />

              {/* Repeating Money Diamond Texture */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#FDE047 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Center Seal */}
              <div className="relative z-10 flex flex-col items-center text-center px-2">
                
                {/* Golden Medallion with Crossed M */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 border-3 border-amber-400 bg-emerald-950/90 shadow-2xl flex items-center justify-center mb-2.5 ${backSealRadius}`}>
                  <div className={`w-13 h-13 sm:w-16 sm:h-16 border-2 border-dashed border-amber-300 flex items-center justify-center ${backSealRadius}`}>
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                      <path d="M15 80 L15 20 L50 65 L85 20 L85 80" stroke="#FDE047" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="5" y1="42" x2="95" y2="42" stroke="#FDE047" strokeWidth="8" strokeLinecap="round" />
                      <line x1="5" y1="56" x2="95" y2="56" stroke="#FDE047" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className={`bg-red-600 text-white font-black tracking-widest px-2.5 py-0.5 text-[10px] sm:text-xs uppercase border border-black shadow-md mb-1.5 ${isSquared ? 'rounded-none' : 'rounded'}`}>
                  MONOPOLY
                </div>

                <h4 className="text-amber-300 font-extrabold uppercase text-xs sm:text-sm tracking-wider font-['Outfit']">
                  CARTE ABILITÀ
                </h4>

                <p className="text-emerald-200/80 text-[8.5px] sm:text-[9.5px] tracking-wide mt-0.5 uppercase">
                  Edizione Completa Deluxe
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-amber-400/40" />
                  <span className="text-amber-300 text-[10px] sm:text-xs">★ ★ ★</span>
                  <span className="w-5 h-[1px] bg-amber-400/40" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
