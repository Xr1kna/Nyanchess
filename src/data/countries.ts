// ============================================
// COUNTRIES DATABASE - Leaderboard per Country
// ============================================

export interface Country {
  code: string;
  name: string;
  flag: string;
  continent: string;
}

export const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', continent: 'North America' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', continent: 'Europe' },
  { code: 'CN', name: 'China', flag: '🇨🇳', continent: 'Asia' },
  { code: 'IN', name: 'India', flag: '🇮🇳', continent: 'Asia' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', continent: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', continent: 'Europe' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', continent: 'South America' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', continent: 'North America' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', continent: 'Europe' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', continent: 'Europe' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', continent: 'Asia' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', continent: 'Asia' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', continent: 'Europe' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', continent: 'Europe' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', continent: 'Europe' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', continent: 'Europe' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', continent: 'Europe' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', continent: 'Europe' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', continent: 'South America' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', continent: 'North America' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', continent: 'Europe' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', continent: 'Asia' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', continent: 'Europe' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', continent: 'Europe' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', continent: 'Europe' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', continent: 'Europe' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', continent: 'Europe' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', continent: 'Europe' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', continent: 'Europe' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', continent: 'Europe' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', continent: 'Europe' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', continent: 'Asia' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', continent: 'Asia' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', continent: 'Asia' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', continent: 'Asia' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', continent: 'Asia' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', continent: 'Asia' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', continent: 'Asia' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', continent: 'Asia' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', continent: 'Asia' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', continent: 'Asia' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', continent: 'Asia' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', continent: 'Asia' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', continent: 'Africa' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', continent: 'Africa' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', continent: 'Africa' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', continent: 'Africa' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', continent: 'Africa' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', continent: 'Africa' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', continent: 'Africa' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', continent: 'South America' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', continent: 'South America' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', continent: 'South America' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', continent: 'South America' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', continent: 'South America' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', continent: 'South America' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', continent: 'South America' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', continent: 'South America' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', continent: 'Oceania' },
];

// Get country by code
export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code);
}

// Get countries by continent
export function getCountriesByContinent(continent: string): Country[] {
  return countries.filter(c => c.continent === continent);
}

// Continents
export const continents = [
  'All',
  'Europe',
  'Asia',
  'North America',
  'South America',
  'Africa',
  'Oceania',
];
