import React, { useState, useRef, useCallback } from 'react';
import { INITIAL_PERFUMES, INITIAL_BUSINESS_INFO } from './data/initialPerfumes';
import { PerfumeItem, BusinessInfo, PosterTheme } from './types';
import { Poster4x3 } from './components/Poster4x3';
import { Calculator } from './components/Calculator';
import { TableEditor } from './components/TableEditor';
import { BrandingSettings } from './components/BrandingSettings';
import { TopNav } from './components/TopNav';
import { toPng, toJpeg } from 'html-to-image';
import {
  Download,
  Copy,
  Sparkles,
  Check,
  Palette,
  Info,
} from 'lucide-react';

export default function App() {
  const [perfumes, setPerfumes] = useState<PerfumeItem[]>(INITIAL_PERFUMES);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(INITIAL_BUSINESS_INFO);
  const [theme, setTheme] = useState<PosterTheme>('noir');
  const [activeTab, setActiveTab] = useState<'poster' | 'calculator' | 'editor'>('poster');
  const [showBranding, setShowBranding] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [highlightedPerfumeId, setHighlightedPerfumeId] = useState<string | null>(null);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);

  const posterRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownloadPng = useCallback(async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);
    try {
      // 2x high resolution capture for crisp print & social media sharing
      const dataUrl = await toPng(posterRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
      });

      const link = document.createElement('a');
      const safeName = businessInfo.shopName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      link.download = `${safeName}_decant_prices_4x3.png`;
      link.href = dataUrl;
      link.click();
      showToast('Downloaded High-Res 4:3 Poster (PNG)!');
    } catch (err) {
      console.error('Error generating PNG:', err);
      showToast('Could not generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [businessInfo.shopName]);

  const handleDownloadJpeg = useCallback(async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toJpeg(posterRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
      });

      const link = document.createElement('a');
      const safeName = businessInfo.shopName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      link.download = `${safeName}_decant_prices_4x3.jpg`;
      link.href = dataUrl;
      link.click();
      showToast('Downloaded 4:3 Poster (JPEG)!');
    } catch (err) {
      console.error('Error generating JPEG:', err);
      showToast('Could not generate image.');
    } finally {
      setIsDownloading(false);
    }
  }, [businessInfo.shopName]);

  const handleCopyImageToClipboard = useCallback(async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(posterRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
      });
      // Convert to blob
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      showToast('Copied 4:3 Image to Clipboard! Ready to paste into WhatsApp/Messenger.');
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      showToast('Direct copy not supported in this browser. Please use Download button.');
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c12] text-slate-100 flex flex-col font-sans-clean antialiased selection:bg-amber-500/20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 text-xs font-medium">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Bar Header Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadImage={handleDownloadPng}
        isDownloading={isDownloading}
        onToggleBranding={() => setShowBranding(!showBranding)}
        showBranding={showBranding}
      />

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-b border-slate-800 bg-[#0e1018] px-2 py-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('poster')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeTab === 'poster' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400'
          }`}
        >
          4:3 Poster
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('calculator')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeTab === 'calculator' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400'
          }`}
        >
          Calculator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeTab === 'editor' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400'
          }`}
        >
          Edit Prices
        </button>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-3 sm:p-5 md:p-6 space-y-6">
        {/* Optional Branding Settings Panel */}
        {showBranding && (
          <BrandingSettings
            businessInfo={businessInfo}
            onChangeBusinessInfo={setBusinessInfo}
            onClose={() => setShowBranding(false)}
          />
        )}

        {/* Tab 1: 4:3 Poster Studio */}
        {activeTab === 'poster' && (
          <div className="space-y-4">
            {/* Control Bar: Theme switcher, Ratio Badge, and Export options */}
            <div className="bg-[#13151f] border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
              {/* Left: Theme Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Theme:
                </span>
                <div className="flex items-center gap-1 bg-[#1a1c28] p-1 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setTheme('noir')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      theme === 'noir'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Noir Gold
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('emerald')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      theme === 'emerald'
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Imperial Emerald
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('sapphire')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      theme === 'sapphire'
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Sapphire Blue
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('ivory')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      theme === 'ivory'
                        ? 'bg-[#ede8de] text-stone-900 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Ivory Atelier
                  </button>
                </div>
              </div>

              {/* Middle: Ratio & Spec Indicators */}
              <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold">
                  Exact 4:3 Ratio
                </span>
                <span>•</span>
                <span>{perfumes.length} Fragrances</span>
                <span>•</span>
                <span>6 Decant Sizes (3ml - 30ml)</span>
              </div>

              {/* Right: Quick Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyImageToClipboard}
                  disabled={isDownloading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e2230] hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors disabled:opacity-50"
                  title="Copy graphic to clipboard"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Image</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadJpeg}
                  disabled={isDownloading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e2230] hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors disabled:opacity-50"
                  title="Download lightweight JPEG"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JPG</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={isDownloading}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                  title="Download Ultra HD 2x PNG (Recommended for Facebook & Instagram)"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Download Ultra HD PNG</span>
                </button>
              </div>
            </div>

            {/* Poster Canvas Preview */}
            <div className="relative">
              <Poster4x3
                ref={posterRef}
                perfumes={perfumes}
                businessInfo={businessInfo}
                theme={theme}
                highlightedId={highlightedPerfumeId}
              />
            </div>

            {/* User Guidance Banner */}
            <div className="bg-[#12141d] border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Tip for posting on Social Media:</strong> The 4:3 picture ratio fits Facebook posts, Instagram portrait/landscape feeds, and fragrance community groups perfectly without cropping. Click <strong>&quot;Download Ultra HD PNG&quot;</strong> for crisp 1600x1200 resolution.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowBranding(true)}
                  className="text-amber-400 hover:underline font-medium"
                >
                  Customize Shop Name & Contacts →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Order Calculator */}
        {activeTab === 'calculator' && (
          <Calculator perfumes={perfumes} businessInfo={businessInfo} />
        )}

        {/* Tab 3: Table Price Editor */}
        {activeTab === 'editor' && (
          <TableEditor
            perfumes={perfumes}
            onUpdatePerfumes={setPerfumes}
            businessInfo={businessInfo}
            onSelectPerfumeToHighlight={setHighlightedPerfumeId}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090a0f] py-4 px-6 text-center text-xs text-slate-500">
        <p>
          {businessInfo.shopName} · Decant Price Chart Studio · 4:3 Aspect Ratio Social Media Export
        </p>
      </footer>
    </div>
  );
}
