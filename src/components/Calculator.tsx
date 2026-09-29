import React, { useState } from 'react';
import { BusinessInfo, OrderItem, PerfumeItem } from '../types';
import { ShoppingBag, Plus, Trash2, Copy, Check, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';

interface CalculatorProps {
  perfumes: PerfumeItem[];
  businessInfo: BusinessInfo;
}

export const Calculator: React.FC<CalculatorProps> = ({ perfumes, businessInfo }) => {
  const [selectedPerfumeId, setSelectedPerfumeId] = useState<string>(perfumes[0]?.id || '');
  const [sizeKey, setSizeKey] = useState<'ml3' | 'ml5' | 'ml10' | 'ml15' | 'ml20' | 'ml30'>('ml5');
  const [atomizerUpgrade, setAtomizerUpgrade] = useState<'standard' | 'premium_glass' | 'travel'>('standard');
  const [bottleStyle, setBottleStyle] = useState<'standard' | 'dior' | 'lv_adg_versace' | 'hawas_valentino' | 'creed'>('standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [cart, setCart] = useState<Array<OrderItem & { id: string; basePrice: number; upgradeCost: number; bottleCost: number; lineTotal: number }>>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedPerfume = perfumes.find((p) => p.id === selectedPerfumeId) || perfumes[0];

  // Helper flags for size compatibility
  const is3or5ml = sizeKey === 'ml3' || sizeKey === 'ml5';
  const is10ml = sizeKey === 'ml10';
  const is15ml = sizeKey === 'ml15';
  const is20or30ml = sizeKey === 'ml20' || sizeKey === 'ml30';

  // When user switches size, ensure invalid upgrades are reset to standard
  const handleSizeChange = (newSize: 'ml3' | 'ml5' | 'ml10' | 'ml15' | 'ml20' | 'ml30') => {
    setSizeKey(newSize);

    // If moving away from 3/5ml or 10ml, reset atomizer upgrade if it's not valid
    if (newSize === 'ml15' || newSize === 'ml20' || newSize === 'ml30') {
      setAtomizerUpgrade('standard');
    } else if (newSize === 'ml10' && atomizerUpgrade === 'travel') {
      // travel atomizer is only for 3/5ml
      setAtomizerUpgrade('standard');
    }

    // Designer bottles can only be selected for 20ml and 30ml
    if (newSize !== 'ml20' && newSize !== 'ml30') {
      setBottleStyle('standard');
    }
  };

  // Calculate pricing rules
  const basePrice = selectedPerfume ? selectedPerfume.prices[sizeKey] : 0;

  // Atomizer upgrade cost calculation based on rules:
  // - 3ml / 5ml: Premium Glass (+25 tk), Travel Atomizer (+70 tk)
  // - 10ml: Premium Glass (+30 tk)
  // - 15ml / 20ml / 30ml: Not applicable
  let upgradeCost = 0;
  if (atomizerUpgrade === 'premium_glass') {
    if (is3or5ml) upgradeCost = 25;
    else if (is10ml) upgradeCost = 30;
  } else if (atomizerUpgrade === 'travel') {
    if (is3or5ml) upgradeCost = 70;
  }

  // Designer bottles cost calculation (Only for 20ml / 30ml decants):
  // - Dior: +20 tk
  // - LV, ADG, Versace: +40 tk
  // - Hawas, Valentino: +50 tk
  // - Creed: +70 tk
  let bottleCost = 0;
  if (is20or30ml) {
    if (bottleStyle === 'dior') bottleCost = 20;
    else if (bottleStyle === 'lv_adg_versace') bottleCost = 40;
    else if (bottleStyle === 'hawas_valentino') bottleCost = 50;
    else if (bottleStyle === 'creed') bottleCost = 70;
  }

  const itemTotal = (basePrice + upgradeCost + bottleCost) * quantity;

  const handleAddToCart = () => {
    if (!selectedPerfume) return;
    const newItem = {
      id: `${Date.now()}-${Math.random()}`,
      perfumeId: selectedPerfume.id,
      perfumeName: selectedPerfume.name,
      dupeOf: selectedPerfume.dupeOf,
      size: sizeKey,
      atomizerUpgrade: (is3or5ml || (is10ml && atomizerUpgrade === 'premium_glass')) ? atomizerUpgrade : 'standard',
      bottleStyle: is20or30ml ? bottleStyle : 'standard',
      quantity,
      basePrice,
      upgradeCost,
      bottleCost,
      lineTotal: itemTotal,
    };
    setCart((prev) => [...prev, newItem]);
    // reset optional upgrades
    setQuantity(1);
    setAtomizerUpgrade('standard');
    setBottleStyle('standard');
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartGrandTotal = cart.reduce((acc, item) => acc + item.lineTotal, 0);

  const formatSizeLabel = (k: string) => {
    switch (k) {
      case 'ml3': return '3 ml';
      case 'ml5': return '5 ml';
      case 'ml10': return '10 ml';
      case 'ml15': return '15 ml (Heavy Glass)';
      case 'ml20': return '20 ml';
      case 'ml30': return '30 ml';
      default: return k;
    }
  };

  const formatBottleName = (style: string) => {
    switch (style) {
      case 'dior': return 'Dior';
      case 'lv_adg_versace': return 'LV / ADG / Versace';
      case 'hawas_valentino': return 'Hawas / Valentino';
      case 'creed': return 'Creed';
      default: return 'Standard';
    }
  };

  const generateReceiptText = () => {
    let text = `✨ *${businessInfo.shopName} - DECANT ORDER* ✨\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    if (customerName) text += `Customer: ${customerName}\n`;
    if (customerAddress) text += `Delivery Address: ${customerAddress}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.perfumeName}*\n`;
      text += `   • Size: ${formatSizeLabel(item.size)} (Base: ${item.basePrice} ${businessInfo.currency})\n`;
      if (item.atomizerUpgrade !== 'standard') {
        const upgradeName = item.atomizerUpgrade === 'premium_glass' ? 'Premium Glass' : 'Travel Atomizer';
        text += `   • Atomizer: ${upgradeName} (+${item.upgradeCost} ${businessInfo.currency})\n`;
      }
      if (item.bottleStyle !== 'standard') {
        text += `   • Designer Bottle: ${formatBottleName(item.bottleStyle)} (+${item.bottleCost} ${businessInfo.currency})\n`;
      }
      text += `   • Qty: ${item.quantity}  ➜  *${item.lineTotal} ${businessInfo.currency}*\n\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*TOTAL AMOUNT: ${cartGrandTotal} ${businessInfo.currency}*\n`;
    text += `100% Genuine Perfume Decants • Leakproof Guarantee\n`;
    text += `Hotline / WhatsApp: ${businessInfo.whatsapp}\n`;

    return text;
  };

  const copyToClipboard = () => {
    const text = generateReceiptText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-400" />
            Decant Order Calculator & WhatsApp Generator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Build custom orders with accurate bottle upgrades, calculate instant totals in {businessInfo.currency}, and copy a ready-to-send WhatsApp summary.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Item Configuration Form */}
        <div className="lg:col-span-7 bg-[#141620] border border-slate-800 rounded-xl p-5 space-y-5">
          {/* 1. Fragrance Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              1. Select Fragrance
            </label>
            <select
              value={selectedPerfumeId}
              onChange={(e) => setSelectedPerfumeId(e.target.value)}
              className="w-full bg-[#1b1e2c] border border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-100 font-medium focus:outline-none focus:border-amber-400"
            >
              {perfumes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.dupeOf})
                </option>
              ))}
            </select>
            {selectedPerfume && (
              <p className="text-xs text-amber-400/90 mt-1.5 italic font-serif-luxury">
                Inspiration / Dupe of: {selectedPerfume.dupeOf}
              </p>
            )}
          </div>

          {/* 2. Volume / Decant Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                2. Choose Volume Size
              </label>
              <span className="text-[11px] text-amber-400 font-medium">
                {is3or5ml && '3/5ml upgrades available below'}
                {is10ml && '10ml upgrade available below'}
                {is15ml && 'Heavy glass included in price'}
                {is20or30ml && 'Designer bottles available below'}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {(
                [
                  { key: 'ml3', label: '3 ml', price: selectedPerfume?.prices.ml3 },
                  { key: 'ml5', label: '5 ml', price: selectedPerfume?.prices.ml5 },
                  { key: 'ml10', label: '10 ml', price: selectedPerfume?.prices.ml10 },
                  { key: 'ml15', label: '15 ml (Heavy)', price: selectedPerfume?.prices.ml15 },
                  { key: 'ml20', label: '20 ml', price: selectedPerfume?.prices.ml20 },
                  { key: 'ml30', label: '30 ml', price: selectedPerfume?.prices.ml30 },
                ] as const
              ).map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => handleSizeChange(s.key)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    sizeKey === s.key
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                      : 'bg-[#1b1e2c] border-slate-700/80 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className="text-xs font-mono mt-1 text-slate-400">
                    {s.price} {businessInfo.currency}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Atomizer Upgrade (Specific to 3ml, 5ml, and 10ml) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                3. Atomizer Type
              </label>
              <span className="text-[11px] text-slate-400">
                {is3or5ml && 'Applies to 3ml & 5ml decants'}
                {is10ml && 'Applies to 10ml decants'}
                {is15ml && '15ml flacon is already heavy glass'}
                {is20or30ml && 'Standard glass included; designer flacons available in step 4'}
              </span>
            </div>

            {is15ml ? (
              <div className="p-3 rounded-lg border border-sky-800/40 bg-sky-950/20 flex items-center gap-2 text-xs text-sky-300">
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong>15 ml Heavy Glass</strong> is already included in this size&apos;s base price ({selectedPerfume?.prices.ml15} {businessInfo.currency}).</span>
              </div>
            ) : is20or30ml ? (
              <div className="p-3 rounded-lg border border-slate-700/80 bg-[#1b1e2c] flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Standard Glass Atomizer with fine mist sprayer is included (+0 {businessInfo.currency}).</span>
                </div>
                <span className="text-[11px] text-amber-400 font-medium">See Designer Bottles below ↓</span>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${is3or5ml ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-2`}>
                <button
                  type="button"
                  onClick={() => setAtomizerUpgrade('standard')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    atomizerUpgrade === 'standard'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#1b1e2c] border-slate-700/80 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">Standard Atomizer</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Glass with plastic sprayer</div>
                  <div className="text-xs font-semibold text-emerald-400 mt-1 font-mono">Included (+0)</div>
                </button>

                {/* 3ml & 5ml Premium Glass: +25 tk */}
                {is3or5ml && (
                  <button
                    type="button"
                    onClick={() => setAtomizerUpgrade('premium_glass')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      atomizerUpgrade === 'premium_glass'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-[#1b1e2c] border-slate-700/80 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">3ml / 5ml Premium Glass</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Thick glass & metallic cap</div>
                    <div className="text-xs font-semibold text-amber-400 mt-1 font-mono">
                      +25 {businessInfo.currency}
                    </div>
                  </button>
                )}

                {/* 10ml Premium Glass: +30 tk */}
                {is10ml && (
                  <button
                    type="button"
                    onClick={() => setAtomizerUpgrade('premium_glass')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      atomizerUpgrade === 'premium_glass'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-[#1b1e2c] border-slate-700/80 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">10ml Premium Glass</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Thick luxury 10ml glass</div>
                    <div className="text-xs font-semibold text-amber-400 mt-1 font-mono">
                      +30 {businessInfo.currency}
                    </div>
                  </button>
                )}

                {/* Travel Atomizer only available for 3ml / 5ml */}
                {is3or5ml && (
                  <button
                    type="button"
                    onClick={() => setAtomizerUpgrade('travel')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      atomizerUpgrade === 'travel'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-[#1b1e2c] border-slate-700/80 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">Travel Atomizer</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Pocket-friendly aluminum</div>
                    <div className="text-xs font-semibold text-rose-400 mt-1 font-mono">
                      +70 {businessInfo.currency}
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 4. Designer Decant Bottles (EXCLUSIVELY FOR 20ml & 30ml) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                4. Designer Decant Bottles (20ml & 30ml Only)
              </label>
              {is20or30ml ? (
                <span className="text-[11px] text-emerald-400 font-medium">Available for {formatSizeLabel(sizeKey)}</span>
              ) : (
                <span className="text-[11px] text-slate-500 italic">Select 20ml or 30ml above to unlock</span>
              )}
            </div>

            {is20or30ml ? (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => setBottleStyle('standard')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    bottleStyle === 'standard'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#1b1e2c] border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-medium">Standard</div>
                  <div className="text-[10px] text-slate-400">+0 {businessInfo.currency}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBottleStyle('dior')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    bottleStyle === 'dior'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#1b1e2c] border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-medium">Dior</div>
                  <div className="text-[10px] text-rose-400 font-mono font-bold">+20 {businessInfo.currency}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBottleStyle('lv_adg_versace')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    bottleStyle === 'lv_adg_versace'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#1b1e2c] border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-medium">LV, ADG, Versace</div>
                  <div className="text-[10px] text-rose-400 font-mono font-bold">+40 {businessInfo.currency}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBottleStyle('hawas_valentino')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    bottleStyle === 'hawas_valentino'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#1b1e2c] border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-medium">Hawas, Valentino</div>
                  <div className="text-[10px] text-rose-400 font-mono font-bold">+50 {businessInfo.currency}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBottleStyle('creed')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    bottleStyle === 'creed'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#1b1e2c] border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-medium">Creed</div>
                  <div className="text-[10px] text-rose-400 font-mono font-bold">+70 {businessInfo.currency}</div>
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-lg border border-slate-800 bg-[#11131a] flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-600 shrink-0" />
                  <span>Designer decant bottles (Dior +20, LV/ADG/Versace +40, Hawas/Valentino +50, Creed +70) are exclusively for <strong>20 ml and 30 ml</strong> sizes.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSizeChange('ml20')}
                  className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-400 rounded border border-slate-700 transition-colors shrink-0"
                >
                  Switch to 20ml
                </button>
              </div>
            )}
          </div>

          {/* Quantity & Add Action */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400">Qty:</span>
              <div className="flex items-center rounded-lg border border-slate-700 overflow-hidden bg-[#1b1e2c]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-slate-300 hover:bg-slate-700 font-mono font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 font-mono font-bold text-amber-400">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-slate-300 hover:bg-slate-700 font-mono font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Item Total:</span>
                <span className="font-mono text-lg font-bold text-amber-400">
                  {itemTotal} {businessInfo.currency}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors shadow-lg shadow-amber-500/10"
              >
                <Plus className="w-4 h-4" />
                Add to Order
              </button>
            </div>
          </div>
        </div>

        {/* Right: Cart Summary & WhatsApp Receipt Generator */}
        <div className="lg:col-span-5 bg-[#141620] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                Current Order List ({cart.length})
              </h3>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCart([])}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Optional Customer info */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-[#1b1e2c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
              <input
                type="text"
                placeholder="Delivery Area / City"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="bg-[#1b1e2c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-10 text-center text-slate-500 text-xs">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-600 stroke-[1.5]" />
                Your order basket is currently empty.
                <br />
                Select a fragrance and click &quot;Add to Order&quot;.
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg bg-[#1a1c28] border border-slate-700/60 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-200">{item.perfumeName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="text-amber-400 font-mono font-medium">
                          {formatSizeLabel(item.size)}
                        </span>
                        {item.atomizerUpgrade !== 'standard' && (
                          <span>· Upgraded Atomizer (+{item.upgradeCost})</span>
                        )}
                        {item.bottleStyle !== 'standard' && (
                          <span>· {formatBottleName(item.bottleStyle)} (+{item.bottleCost})</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Qty: {item.quantity} × ({item.basePrice + item.upgradeCost + item.bottleCost} {businessInfo.currency})
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {item.lineTotal} {businessInfo.currency}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Totals & Export Actions */}
          <div className="border-t border-slate-800 pt-3 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-300">Grand Total:</span>
              <span className="font-mono text-xl font-bold text-amber-400">
                {cartGrandTotal} {businessInfo.currency}
              </span>
            </div>

            {cart.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied Receipt!' : 'Copy Summary'}
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(generateReceiptText())}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Send WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
