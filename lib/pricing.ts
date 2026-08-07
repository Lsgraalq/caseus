export interface BriefState {
  durationSeconds: number;
  deepColor: boolean;
  advancedSfx: boolean;
  projectFiles: boolean;
  expressDelivery: boolean;
}

export interface QuoteResult {
  totalPrice: number;
  breakdown: { label: string; price: number }[];
  autoDiscountApplied: boolean;
  discountMessage?: string;
  durationString: string;
}

export function calculateQuote(briefState: BriefState): QuoteResult {
  const { durationSeconds, deepColor, advancedSfx, projectFiles, expressDelivery } = briefState;
  
  if (durationSeconds <= 0) {
    return {
      totalPrice: 0,
      breakdown: [],
      autoDiscountApplied: false,
      durationString: "0 сек",
    };
  }

  let basePrice = 0;
  let autoDiscountApplied = false;
  let discountMessage = "";
  
  // Base Price Logic
  if (durationSeconds <= 30) {
    // 15 sec = 75, 30 sec = 150
    basePrice = Math.ceil(durationSeconds / 15) * 75;
  } else if (durationSeconds <= 60) {
    // 31 to 60 sec: Long-form pkg
    basePrice = 200;
    autoDiscountApplied = true;
    const hypotheticalPrice = Math.ceil(durationSeconds / 15) * 75; // e.g. 45s=225, 60s=300
    const savings = hypotheticalPrice > 200 ? hypotheticalPrice - 200 : 100;
    discountMessage = `Применён минутный пакет 200 € (вы сэкономили до ${savings} €)`;
  } else {
    // > 60 sec: 200 per minute
    basePrice = Math.ceil(durationSeconds / 60) * 200;
  }

  const breakdown: { label: string; price: number }[] = [];
  breakdown.push({ label: "Базовый монтаж", price: basePrice });

  let subtotal = basePrice;

  // Upsells
  if (deepColor) {
    let colorPrice = 0;
    if (durationSeconds <= 60) {
      colorPrice = Math.min(Math.ceil(durationSeconds / 15) * 35, 100);
    } else {
      colorPrice = Math.ceil(durationSeconds / 60) * 100;
    }
    breakdown.push({ label: "Глубокий покрас", price: colorPrice });
    subtotal += colorPrice;
  }

  if (advancedSfx) {
    let sfxPrice = 0;
    if (durationSeconds <= 60) {
      sfxPrice = Math.min(Math.ceil(durationSeconds / 15) * 20, 50);
    } else {
      sfxPrice = Math.ceil(durationSeconds / 60) * 50;
    }
    breakdown.push({ label: "Саунд-дизайн", price: sfxPrice });
    subtotal += sfxPrice;
  }

  if (projectFiles) {
    const filesPrice = durationSeconds <= 60 ? 50 : 100;
    breakdown.push({ label: "Исходники (DaVinci)", price: filesPrice });
    subtotal += filesPrice;
  }

  // Express Delivery (+40%)
  if (expressDelivery) {
    const expressPrice = Math.round(subtotal * 0.4);
    breakdown.push({ label: "Экспресс-доставка", price: expressPrice });
    subtotal += expressPrice;
  }

  const formatDuration = (sec: number) => {
    if (sec < 60) return `${sec} сек`;
    const min = Math.floor(sec / 60);
    const rem = sec % 60;
    return rem === 0 ? `${min} мин` : `${min} мин ${rem} сек`;
  };

  return {
    totalPrice: subtotal,
    breakdown,
    autoDiscountApplied,
    discountMessage: autoDiscountApplied ? discountMessage : undefined,
    durationString: formatDuration(durationSeconds),
  };
}
