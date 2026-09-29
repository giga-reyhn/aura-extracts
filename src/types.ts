export interface PerfumeItem {
  id: string;
  name: string;
  brand?: string;
  dupeOf: string;
  prices: {
    ml3: number;
    ml5: number;
    ml10: number;
    ml15: number; // 15 ml Heavy glass
    ml20: number;
    ml30: number;
  };
}

export interface BusinessInfo {
  shopName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  socialHandle: string;
  currency: string;
  deliveryNote: string;
}

export type PosterTheme = 'noir' | 'emerald' | 'ivory' | 'sapphire';

export interface OrderItem {
  perfumeId: string;
  perfumeName: string;
  dupeOf: string;
  size: 'ml3' | 'ml5' | 'ml10' | 'ml15' | 'ml20' | 'ml30';
  atomizerUpgrade: 'standard' | 'premium_glass' | 'travel';
  bottleStyle: 'standard' | 'dior' | 'lv_adg_versace' | 'hawas_valentino' | 'creed';
  quantity: number;
}
