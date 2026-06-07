import { ThemeType, Folder } from './types';

export const THEMES: Record<ThemeType, { 
  name: string; 
  colors: { 
    bg: string; 
    bgSecondary: string;
    text: string; 
    textSecondary: string;
    accent: string; 
    accentHover: string;
    sidebar: string;
    borderPrimary: string;
    borderSecondary: string;
    hoverBg: string;
  } 
}> = {
  light: {
    name: 'Editorial Light',
    colors: {
      bg: '#F9F9F7',
      bgSecondary: '#FFFFFF',
      text: '#050505',
      textSecondary: '#6A6A64',
      accent: '#E11D48',
      accentHover: '#BE123C',
      sidebar: '#FFFFFF',
      borderPrimary: '#E5E5E1',
      borderSecondary: '#D4D4D1',
      hoverBg: '#F0F0EE',
    }
  },
  sepia: {
    name: 'Manuscript',
    colors: {
      bg: '#F4ECD8',
      bgSecondary: '#FAF5EB',
      text: '#352512',
      textSecondary: '#7C654B',
      accent: '#964B00',
      accentHover: '#7A3D00',
      sidebar: '#E8DFC4',
      borderPrimary: '#DECFA6',
      borderSecondary: '#CBBFA0',
      hoverBg: '#E3D8B8',
    }
  },
  midnight: {
    name: 'Oxford Night',
    colors: {
      bg: '#0F172A',
      bgSecondary: '#1E293B',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
      accent: '#38BDF8',
      accentHover: '#7DD3FC',
      sidebar: '#1E293B',
      borderPrimary: '#334155',
      borderSecondary: '#475569',
      hoverBg: '#334155',
    }
  },
  forest: {
    name: 'Boreal Scholar',
    colors: {
      bg: '#081C15',
      bgSecondary: '#1B4332',
      text: '#D8F3DC',
      textSecondary: '#95D5B2',
      accent: '#52B788',
      accentHover: '#74C69D',
      sidebar: '#1B4332',
      borderPrimary: '#2D6A4F',
      borderSecondary: '#40916C',
      hoverBg: '#2D6A4F',
    }
  },
  slate: {
    name: 'Bauhaus Gray',
    colors: {
      bg: '#121212',
      bgSecondary: '#1E1E1E',
      text: '#E0E0E0',
      textSecondary: '#A0A0A0',
      accent: '#FACC15',
      accentHover: '#FDE047',
      sidebar: '#1E1E1E',
      borderPrimary: '#2E2E2E',
      borderSecondary: '#3A3A3A',
      hoverBg: '#2E2E2E',
    }
  },
  solar: {
    name: 'Solaris Scholar',
    colors: {
      bg: '#FDF6E3',
      bgSecondary: '#EEE8D5',
      text: '#073642',
      textSecondary: '#586E75',
      accent: '#CB4B16',
      accentHover: '#DC322F',
      sidebar: '#EEE8D5',
      borderPrimary: '#D3C6A2',
      borderSecondary: '#93A1A1',
      hoverBg: '#E4D5B1',
    }
  },
  espresso: {
    name: 'Deep Espresso',
    colors: {
      bg: '#1C1917',
      bgSecondary: '#292524',
      text: '#F5F5F4',
      textSecondary: '#A8A29E',
      accent: '#D4A373',
      accentHover: '#E6CCB2',
      sidebar: '#292524',
      borderPrimary: '#44403C',
      borderSecondary: '#57534E',
      hoverBg: '#44403C',
    }
  },
  velum: {
    name: 'Royal Velum',
    colors: {
      bg: '#1E1B4B',
      bgSecondary: '#312E81',
      text: '#EEF2F6',
      textSecondary: '#C7D2FE',
      accent: '#A78BFA',
      accentHover: '#C084FC',
      sidebar: '#312E81',
      borderPrimary: '#3730A3',
      borderSecondary: '#4338CA',
      hoverBg: '#3730A3',
    }
  }
};

export const INITIAL_FOLDERS: Folder[] = [];
