import React, { forwardRef } from 'react';
import { BusinessInfo, PerfumeItem, PosterTheme } from '../types';
import { Sparkles, Phone, MessageCircle, Droplet, ShieldCheck, Award } from 'lucide-react';

interface Poster4x3Props {
  perfumes: PerfumeItem[];
  businessInfo: BusinessInfo;
  theme: PosterTheme;
  highlightedId?: string | null;
}

export const Poster4x3 = forwardRef<HTMLDivElement, Poster4x3Props>(
  ({ perfumes, businessInfo, theme, highlightedId }, ref) => {
    // Theme configurations
    const themeStyles = {
      noir: {
        bg: 'bg-gradient-to-b from-[#0a0a0f] via-[#12131a] to-[#08080c]',
        cardBg: 'bg-[#151722]/90',
        tableHeaderBg: 'bg-gradient-to-r from-[#1c1f2e] via-[#24283b] to-[#1c1f2e]',
        rowEven: 'bg-[#12141e]/70',
        rowOdd: 'bg-[#0f111a]/40',
        rowHover: 'hover:bg-[#1f2335]/60',
        border: 'border-[#363b52]/50',
        accentGold: 'text-[#d4af37]',
        accentGoldBg: 'bg-[#d4af37]/15 border-[#d4af37]/40 text-[#f5d77f]',
        goldBorder: 'border-[#d4af37]/35',
        titleColor: 'text-[#f5eedc]',
        priceColor: 'text-[#f8fafc]',
        dupeBadge: 'bg-[#212638] text-[#e2b170] border border-[#d4af37]/25',
        heavyGlassBadge: 'bg-[#1e293b] text-[#38bdf8] border border-[#0284c7]/40',
        footerBg: 'bg-[#0b0c12] border-t border-[#232738]',
        bannerGold: 'from-[#2a2415] to-[#1a1710] border-[#d4af37]/30 text-[#e9d5a1]',
        bannerRed: 'from-[#2b1416] to-[#1a0c0e] border-[#f43f5e]/30 text-[#fda4af]',
      },
      emerald: {
        bg: 'bg-gradient-to-b from-[#04100c] via-[#081a13] to-[#030c09]',
        cardBg: 'bg-[#0a231b]/90',
        tableHeaderBg: 'bg-gradient-to-r from-[#0d2e23] via-[#133d30] to-[#0d2e23]',
        rowEven: 'bg-[#081e17]/70',
        rowOdd: 'bg-[#051711]/40',
        rowHover: 'hover:bg-[#12382c]/60',
        border: 'border-[#1b4b3c]/50',
        accentGold: 'text-[#e5c158]',
        accentGoldBg: 'bg-[#e5c158]/15 border-[#e5c158]/40 text-[#fceda2]',
        goldBorder: 'border-[#e5c158]/35',
        titleColor: 'text-[#f4f7f4]',
        priceColor: 'text-[#f8fafc]',
        dupeBadge: 'bg-[#0e3327] text-[#fcd34d] border border-[#e5c158]/30',
        heavyGlassBadge: 'bg-[#0f2e24] text-[#34d399] border border-[#059669]/40',
        footerBg: 'bg-[#030e0a] border-t border-[#13382c]',
        bannerGold: 'from-[#1f2e1e] to-[#111f13] border-[#e5c158]/30 text-[#fde68a]',
        bannerRed: 'from-[#2d1215] to-[#1c0c0e] border-[#fb7185]/30 text-[#fecdd3]',
      },
      sapphire: {
        bg: 'bg-gradient-to-b from-[#060b17] via-[#0b1529] to-[#040812]',
        cardBg: 'bg-[#0f1d38]/90',
        tableHeaderBg: 'bg-gradient-to-r from-[#14264a] via-[#1b325f] to-[#14264a]',
        rowEven: 'bg-[#0d1a33]/70',
        rowOdd: 'bg-[#091326]/40',
        rowHover: 'hover:bg-[#1a315c]/60',
        border: 'border-[#223f73]/50',
        accentGold: 'text-[#60a5fa]',
        accentGoldBg: 'bg-[#3b82f6]/15 border-[#60a5fa]/40 text-[#93c5fd]',
        goldBorder: 'border-[#60a5fa]/35',
        titleColor: 'text-[#f0f6ff]',
        priceColor: 'text-[#ffffff]',
        dupeBadge: 'bg-[#152a4f] text-[#93c5fd] border border-[#3b82f6]/30',
        heavyGlassBadge: 'bg-[#0f2847] text-[#38bdf8] border border-[#0284c7]/40',
        footerBg: 'bg-[#040814] border-t border-[#182b4d]',
        bannerGold: 'from-[#172554] to-[#0f172a] border-[#60a5fa]/30 text-[#bfdbfe]',
        bannerRed: 'from-[#31131b] to-[#1e0a11] border-[#f43f5e]/30 text-[#fecdd3]',
      },
      ivory: {
        bg: 'bg-gradient-to-b from-[#fbfaf6] via-[#f5f2eb] to-[#ede8de]',
        cardBg: 'bg-[#ffffff]/95',
        tableHeaderBg: 'bg-gradient-to-r from-[#e8e2d4] via-[#dfd7c5] to-[#e8e2d4]',
        rowEven: 'bg-[#f8f5ee]',
        rowOdd: 'bg-[#ffffff]',
        rowHover: 'hover:bg-[#eee8dc]',
        border: 'border-[#d6cbb8]',
        accentGold: 'text-[#966b1a]',
        accentGoldBg: 'bg-[#b8860b]/15 border-[#b8860b]/40 text-[#855905]',
        goldBorder: 'border-[#b8860b]/35',
        titleColor: 'text-[#1c1917]',
        priceColor: 'text-[#1c1917]',
        dupeBadge: 'bg-[#f1ebe0] text-[#78350f] border border-[#d6cbb8]',
        heavyGlassBadge: 'bg-[#e0f2fe] text-[#0369a1] border border-[#7dd3fc]',
        footerBg: 'bg-[#e8e2d5] border-t border-[#d6cbb8]',
        bannerGold: 'from-[#fef3c7] to-[#fde68a] border-[#b8860b]/30 text-[#78350f]',
        bannerRed: 'from-[#ffe4e6] to-[#fecdd3] border-[#f43f5e]/30 text-[#9f1239]',
      },
    };

    const curTheme = themeStyles[theme] || themeStyles.noir;
    const isLight = theme === 'ivory';

    return (
      <div className="w-full flex items-center justify-center p-1 md:p-3">
        {/* 
          Container with explicit 4:3 Aspect Ratio 
          Width 1200px max, scalable on smaller screens while locking strictly to 4:3 ratio.
        */}
        <div
          ref={ref}
          id="decant-poster-4x3"
          className={`w-full max-w-[1200px] aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between border ${curTheme.goldBorder} ${curTheme.bg} relative transition-all duration-300 selection:bg-amber-500/20`}
          style={{ boxSizing: 'border-box' }}
        >
          {/* Subtle luxury ambient texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />

          {/* TOP SECTION: Header Branding & Add-On Banners */}
          <div className="relative z-10 px-6 pt-5 pb-2">
            {/* Header Lockup */}
            <div className="flex items-center justify-between border-b pb-3 mb-3 border-opacity-30 border-slate-700">
              {/* Left: Brand Identity */}
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner ${isLight ? 'bg-amber-100/70 border-amber-300 text-amber-800' : 'bg-[#1e1f2b] border-[#d4af37]/40 text-[#f5d77f]'}`}>
                  <Droplet className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-wider ${curTheme.titleColor}`}>
                      {businessInfo.shopName}
                    </h1>
                    <span className="hidden sm:inline-block text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 uppercase">
                      Official Rate Card
                    </span>
                  </div>
                  <p className={`text-xs md:text-sm font-serif-luxury tracking-wide mt-0.5 ${isLight ? 'text-stone-600' : 'text-slate-400'}`}>
                    {businessInfo.tagline}
                  </p>
                </div>
              </div>

              {/* Right: Contact & Authenticity Badges */}
              <div className="flex flex-col items-end gap-1 text-right">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${curTheme.accentGoldBg}`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>100% Genuine Juice</span>
                  </span>
                </div>
                <div className={`flex items-center gap-3 text-xs ${isLight ? 'text-stone-600' : 'text-slate-300'}`}>
                  {businessInfo.whatsapp && (
                    <span className="flex items-center gap-1 font-mono">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{businessInfo.whatsapp}</span>
                    </span>
                  )}
                  {businessInfo.phone && businessInfo.phone !== businessInfo.whatsapp && (
                    <span className="hidden md:flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{businessInfo.phone}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* UPGRADE TIERS & ADD-ON RULES (Restyled from the original spreadsheet banners) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-1">
              {/* Baseline Note (Left side in original chart) */}
              <div className={`md:col-span-6 rounded-lg p-2 border flex flex-col justify-between ${isLight ? 'bg-amber-50/80 border-amber-200' : 'bg-gradient-to-r from-[#171a25] to-[#12141c] border-slate-700/60'}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                      Standard Atomizer (Included)
                    </span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${isLight ? 'bg-amber-200/80 text-amber-900' : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'}`}>
                    Free Base Bottle
                  </span>
                </div>
                <p className={`text-[11px] font-medium leading-relaxed ${isLight ? 'text-stone-700' : 'text-slate-300'}`}>
                  Standard Glass Atomizer with Precision Plastic Sprayer included with every size.
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className={`font-semibold px-2 py-0.5 rounded border ${isLight ? 'bg-stone-100 border-stone-300 text-stone-800' : 'bg-[#1e2230] border-slate-700 text-slate-200'}`}>
                    3ml / 5ml Premium Glass: <strong className="text-amber-400 font-mono">+25 {businessInfo.currency}</strong>
                  </span>
                  <span className={`font-semibold px-2 py-0.5 rounded border ${isLight ? 'bg-stone-100 border-stone-300 text-stone-800' : 'bg-[#1e2230] border-slate-700 text-slate-200'}`}>
                    10ml Premium Glass: <strong className="text-amber-400 font-mono">+30 {businessInfo.currency}</strong>
                  </span>
                  <span className={`font-semibold px-2 py-0.5 rounded border ${isLight ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-rose-950/40 border-rose-800/40 text-rose-300'}`}>
                    Travel Metal Atomizer: <strong className="font-mono">+70 {businessInfo.currency}</strong>
                  </span>
                </div>
              </div>

              {/* Designer Flacon Options (Right side in original chart) */}
              <div className={`md:col-span-6 rounded-lg p-2 border flex flex-col justify-between ${isLight ? 'bg-rose-50/70 border-rose-200' : 'bg-gradient-to-r from-[#20141a] to-[#170e13] border-rose-900/40'}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-rose-400" />
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>
                      Designer Decant Bottle Upgrades
                    </span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${isLight ? 'bg-rose-200 text-rose-900' : 'bg-rose-950/80 text-rose-300 border border-rose-800/50'}`}>
                    Luxury Caps & Bottles
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className={`px-2 py-1 rounded flex items-center justify-between border ${isLight ? 'bg-white/80 border-rose-200 text-stone-800' : 'bg-[#181116] border-rose-950/60 text-slate-200'}`}>
                    <span>Dior</span>
                    <span className="font-mono font-bold text-rose-400">+20 {businessInfo.currency}</span>
                  </div>
                  <div className={`px-2 py-1 rounded flex items-center justify-between border ${isLight ? 'bg-white/80 border-rose-200 text-stone-800' : 'bg-[#181116] border-rose-950/60 text-slate-200'}`}>
                    <span>LV, ADG, Versace</span>
                    <span className="font-mono font-bold text-rose-400">+40 {businessInfo.currency}</span>
                  </div>
                  <div className={`px-2 py-1 rounded flex items-center justify-between border ${isLight ? 'bg-white/80 border-rose-200 text-stone-800' : 'bg-[#181116] border-rose-950/60 text-slate-200'}`}>
                    <span>Hawas, Valentino</span>
                    <span className="font-mono font-bold text-rose-400">+50 {businessInfo.currency}</span>
                  </div>
                  <div className={`px-2 py-1 rounded flex items-center justify-between border ${isLight ? 'bg-white/80 border-rose-200 text-stone-800' : 'bg-[#181116] border-rose-950/60 text-slate-200'}`}>
                    <span>Creed Style Flacon</span>
                    <span className="font-mono font-bold text-rose-400">+70 {businessInfo.currency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN PRICE TABLE (Clean, High-Legibility, Tabular Figures) */}
          <div className="relative z-10 px-6 flex-1 flex flex-col justify-start overflow-hidden">
            <div className={`rounded-xl border overflow-hidden ${curTheme.border} ${curTheme.cardBg} shadow-xl`}>
              <table className="w-full text-left border-collapse text-[11px] md:text-xs">
                <thead>
                  <tr className={`${curTheme.tableHeaderBg} border-b ${curTheme.border}`}>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-slate-300 w-[27%]">
                      Fragrance Name
                    </th>
                    <th className="py-2.5 px-2 font-semibold text-center uppercase tracking-wider text-amber-300">
                      3 ml
                    </th>
                    <th className="py-2.5 px-2 font-semibold text-center uppercase tracking-wider text-amber-300">
                      5 ml
                    </th>
                    <th className="py-2.5 px-2 font-semibold text-center uppercase tracking-wider text-amber-300">
                      10 ml
                    </th>
                    <th className="py-2.5 px-2 font-semibold text-center uppercase tracking-wider text-sky-400 bg-sky-950/20 border-x border-sky-800/30">
                      <div className="flex flex-col items-center">
                        <span>15 ml</span>
                        <span className="text-[9px] font-normal text-sky-300/80 lowercase">heavy glass</span>
                      </div>
                    </th>
                    <th className="py-2.5 px-2 font-semibold text-center uppercase tracking-wider text-amber-300">
                      20 ml
                    </th>
                    <th className="py-2.5 px-2 font-semibold text-center uppercase tracking-wider text-amber-300">
                      30 ml
                    </th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-amber-400 w-[23%] text-right">
                      Inspiration / Dupe Of
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {perfumes.map((p, idx) => {
                    const isHighlighted = highlightedId === p.id;
                    const rowBg = isHighlighted
                      ? 'bg-amber-500/20 ring-1 ring-amber-400/50'
                      : idx % 2 === 0
                      ? curTheme.rowEven
                      : curTheme.rowOdd;

                    return (
                      <tr
                        key={p.id}
                        className={`${rowBg} ${curTheme.rowHover} transition-colors duration-150`}
                      >
                        {/* Fragrance Name */}
                        <td className="py-1.5 px-3 font-medium text-slate-100 flex items-center justify-between gap-1">
                          <span className={`font-semibold tracking-wide truncate ${isLight ? 'text-stone-900' : 'text-slate-100'}`}>
                            {p.name}
                          </span>
                          {p.brand && (
                            <span className="text-[10px] text-slate-400 font-normal px-1 rounded bg-slate-800/40 shrink-0">
                              {p.brand}
                            </span>
                          )}
                        </td>

                        {/* 3 ml */}
                        <td className="py-1.5 px-2 text-center font-mono font-semibold tabular-nums text-slate-200">
                          {p.prices.ml3}
                        </td>

                        {/* 5 ml */}
                        <td className="py-1.5 px-2 text-center font-mono font-semibold tabular-nums text-slate-200">
                          {p.prices.ml5}
                        </td>

                        {/* 10 ml */}
                        <td className="py-1.5 px-2 text-center font-mono font-semibold tabular-nums text-slate-200">
                          {p.prices.ml10}
                        </td>

                        {/* 15 ml Heavy Glass */}
                        <td className="py-1.5 px-2 text-center font-mono font-bold tabular-nums text-sky-300 bg-sky-950/20 border-x border-sky-800/30">
                          {p.prices.ml15}
                        </td>

                        {/* 20 ml */}
                        <td className="py-1.5 px-2 text-center font-mono font-semibold tabular-nums text-slate-200">
                          {p.prices.ml20}
                        </td>

                        {/* 30 ml */}
                        <td className="py-1.5 px-2 text-center font-mono font-bold tabular-nums text-amber-300">
                          {p.prices.ml30}
                        </td>

                        {/* Dupe of */}
                        <td className="py-1.5 px-3 text-right">
                          <span
                            className={`inline-block text-[11px] font-serif-luxury italic px-2 py-0.5 rounded ${curTheme.dupeBadge}`}
                          >
                            {p.dupeOf}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* BOTTOM FOOTER: Delivery & Socials */}
          <div className={`relative z-10 px-6 py-2.5 mt-2 ${curTheme.footerBg} flex items-center justify-between text-[11px]`}>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className={isLight ? 'text-stone-700' : 'text-slate-300'}>
                  {businessInfo.deliveryNote}
                </span>
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-slate-400">
                All prices in Bangladeshi Taka ({businessInfo.currency})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-amber-400 font-semibold">
                {businessInfo.socialHandle}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Poster4x3.displayName = 'Poster4x3';
