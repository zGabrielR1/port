export interface ThemeColors {
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  accent: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  glass: {
    background: string;
    border: string;
    hover: string;
  };
}

export const lightTheme: ThemeColors = {
  background: 'bg-white',
  surface: 'bg-gray-50',
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
  },
  border: 'border-gray-200',
  accent: {
    primary: 'blue-600',
    secondary: 'purple-600',
    tertiary: 'pink-600',
  },
  glass: {
    background: 'bg-white/20',
    border: 'border-white/30',
    hover: 'hover:bg-white/30',
  },
};

export const darkTheme: ThemeColors = {
  background: 'bg-black',
  surface: 'bg-gray-900',
  text: {
    primary: 'text-white',
    secondary: 'text-white/80',
    muted: 'text-white/60',
  },
  border: 'border-white/20',
  accent: {
    primary: 'blue-400',
    secondary: 'purple-400',
    tertiary: 'pink-400',
  },
  glass: {
    background: 'bg-white/10',
    border: 'border-white/20',
    hover: 'hover:bg-white/20',
  },
};

export const getThemeColors = (variant: 'port' | 'dark'): ThemeColors => {
  return variant === 'dark' ? darkTheme : lightTheme;
};

export const getThemeTransitionClasses = () => {
  return 'theme-transition';
};