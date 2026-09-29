import React from 'react';
import { Download, Sliders, Image as ImageIcon, Calculator as CalcIcon, Table, Sparkles } from 'lucide-react';

interface TopNavProps {
  activeTab: 'poster' | 'calculator' | 'editor';
  setActiveTab: (tab: 'poster' | 'calculator' | 'editor') => void;
  onDownloadImage: () => void;
  isDownloading: boolean;
  onToggleBranding: () => void;
  showBranding: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onDownloadImage,
  isDownloading,
  onToggleBranding,
  showBranding,
}) => {
  return (
    <header className="w-full bg-[#0d0e15] border-b border-slate-800/80 sticky top-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('poster');
        }}
        className="font-display text-lg md:text-xl font-bold tracking-wider text-slate-100 flex items-center gap-2 hover:text-amber-400 transition-colors whitespace-nowrap"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
        AURA DECANT STUDIO
      </a>

      {/* Zone 2: Clean navigation controls */}
      <nav className="hidden md:flex items-center gap-1 bg-[#141620] p-1 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('poster')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'poster'
              ? 'bg-amber-500/20 text-amber-300 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          4:3 Poster Studio
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'calculator'
              ? 'bg-amber-500/20 text-amber-300 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CalcIcon className="w-3.5 h-3.5" />
          Order Calculator
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'editor'
              ? 'bg-amber-500/20 text-amber-300 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          Manage Prices
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onToggleBranding}
          className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
            showBranding
              ? 'bg-slate-800 text-amber-300 border-amber-500/50'
              : 'bg-[#141620] text-slate-300 border-slate-700 hover:border-slate-600'
          }`}
          title="Customize Brand, Phone, Socials"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Branding</span>
        </button>

        <button
          type="button"
          onClick={onDownloadImage}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md shadow-amber-500/20 whitespace-nowrap disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Rendering 4:3...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Download 4:3 Image</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
