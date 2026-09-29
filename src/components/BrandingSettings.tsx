import React from 'react';
import { BusinessInfo } from '../types';
import { Store, Phone, MessageCircle, AtSign, Truck, DollarSign } from 'lucide-react';

interface BrandingSettingsProps {
  businessInfo: BusinessInfo;
  onChangeBusinessInfo: (info: BusinessInfo) => void;
  onClose?: () => void;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({
  businessInfo,
  onChangeBusinessInfo,
  onClose,
}) => {
  const handleChange = (field: keyof BusinessInfo, value: string) => {
    onChangeBusinessInfo({
      ...businessInfo,
      [field]: value,
    });
  };

  return (
    <div className="bg-[#141620] border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-display text-base font-bold text-slate-100 flex items-center gap-2">
          <Store className="w-4 h-4 text-amber-400" />
          Brand & Poster Customization
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Close
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-slate-400 font-semibold mb-1">Decant Business Name</label>
          <input
            type="text"
            value={businessInfo.shopName}
            onChange={(e) => handleChange('shopName', e.target.value)}
            className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 font-medium"
            placeholder="e.g. Royal Scent Decants"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1">Tagline / Guarantee</label>
          <input
            type="text"
            value={businessInfo.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
            placeholder="e.g. 100% Authentic Perfume Decants • Pure Juice"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            WhatsApp Number
          </label>
          <input
            type="text"
            value={businessInfo.whatsapp}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
            className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
            placeholder="+880 17XXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            Secondary Phone / Hotline
          </label>
          <input
            type="text"
            value={businessInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
            placeholder="+880 18XXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
            <AtSign className="w-3.5 h-3.5 text-sky-400" />
            Social Media Handle (Facebook / Instagram)
          </label>
          <input
            type="text"
            value={businessInfo.socialHandle}
            onChange={(e) => handleChange('socialHandle', e.target.value)}
            className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
            placeholder="@yourperfumes.bd"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            Currency Symbol
          </label>
          <input
            type="text"
            value={businessInfo.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
            className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 font-bold"
            placeholder="tk or ৳"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            Delivery Notice / Footer Note
          </label>
          <input
            type="text"
            value={businessInfo.deliveryNote}
            onChange={(e) => handleChange('deliveryNote', e.target.value)}
            className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
            placeholder="All Bangladesh Home Delivery Available · 100% Genuine Perfumes"
          />
        </div>
      </div>
    </div>
  );
};
