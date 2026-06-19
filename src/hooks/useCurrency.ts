import { useMemo } from 'react';
import { useFirestore } from '@/contexts/FirestoreContext';

export const CURRENCIES = {
  IDR: { locale: 'id-ID', currency: 'IDR', symbol: 'Rp', maximumFractionDigits: 0 },
  USD: { locale: 'en-US', currency: 'USD', symbol: '$', maximumFractionDigits: 2 },
  EUR: { locale: 'en-IE', currency: 'EUR', symbol: '€', maximumFractionDigits: 2 },
  JPY: { locale: 'ja-JP', currency: 'JPY', symbol: '¥', maximumFractionDigits: 0 },
  GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£', maximumFractionDigits: 2 },
} as const;

export type CurrencyType = keyof typeof CURRENCIES;

function compactNumber(amount: number, isIDR: boolean): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (isIDR) {
    if (abs >= 1_000_000_000_000) {
      const val = abs / 1_000_000_000_000;
      return sign + formatDecimal(val) + 'T';
    }
    if (abs >= 1_000_000_000) {
      const val = abs / 1_000_000_000;
      return sign + formatDecimal(val) + 'M';
    }
    if (abs >= 1_000_000) {
      const val = abs / 1_000_000;
      return sign + formatDecimal(val) + 'jt';
    }
    if (abs >= 1_000) {
      const val = abs / 1_000;
      return sign + formatDecimal(val) + 'rb';
    }
    return sign + abs.toString();
  } else {
    if (abs >= 1_000_000_000) {
      const val = abs / 1_000_000_000;
      return sign + formatDecimal(val) + 'B';
    }
    if (abs >= 1_000_000) {
      const val = abs / 1_000_000;
      return sign + formatDecimal(val) + 'M';
    }
    if (abs >= 1_000) {
      const val = abs / 1_000;
      return sign + formatDecimal(val) + 'K';
    }
    return sign + abs.toFixed(abs % 1 === 0 ? 0 : 2);
  }
}

function formatDecimal(val: number): string {
  if (val % 1 === 0) return val.toString();
  const formatted = val.toFixed(1);
  return formatted.endsWith('0') ? val.toFixed(0) : formatted;
}

export function useCurrency() {
  const { userProfile } = useFirestore();
  
  const currentCurrency = (userProfile?.currency as CurrencyType) || 'IDR';
  const currencyConfig = CURRENCIES[currentCurrency] || CURRENCIES.IDR;

  const formatCurrency = useMemo(() => {
    return (amount: number) => {
      return amount.toLocaleString(currencyConfig.locale, {
        style: 'currency',
        currency: currencyConfig.currency,
        maximumFractionDigits: currencyConfig.maximumFractionDigits,
      });
    };
  }, [currencyConfig]);

  const formatCompact = useMemo(() => {
    return (amount: number) => {
      const isIDR = currentCurrency === 'IDR';
      return currencyConfig.symbol + ' ' + compactNumber(amount, isIDR);
    };
  }, [currencyConfig, currentCurrency]);

  return {
    formatCurrency,
    formatCompact,
    symbol: currencyConfig.symbol,
    currentCurrency,
    availableCurrencies: Object.keys(CURRENCIES) as CurrencyType[],
  };
}
