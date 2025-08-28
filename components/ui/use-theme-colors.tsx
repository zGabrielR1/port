"use client"

import { useSiteVariant } from './use-site-variant';
import { getThemeColors, getThemeTransitionClasses, ThemeColors } from './theme-config';

export function useThemeColors(): ThemeColors & {
  transitionClasses: string;
  isDark: boolean;
} {
  const { variant } = useSiteVariant();

  const colors = getThemeColors(variant);
  const transitionClasses = getThemeTransitionClasses();
  const isDark = variant === 'dark';

  return {
    ...colors,
    transitionClasses,
    isDark,
  };
}