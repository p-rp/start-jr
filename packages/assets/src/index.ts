// Logo imports - these will be processed by Vite/webpack
// Supported formats: .svg, .png, .jpg, .ico

import logoDark from './logos/logo-dark.png';
import logoLight from './logos/logo-light.png';
import icon from './logos/icon.png';

export const LOGOS = {
  // Main logo - Blue/Red variant (for light backgrounds)
  main: logoDark,

  // Dark variant - Blue/Red (for light backgrounds)
  dark: logoDark,

  // Light variant - White/Red (for dark backgrounds)
  light: logoLight,

  // Icon - Red standalone icon (for favicon/app icon)
  icon: icon,
} as const;

// Note: React component exports are only available for SVG files
// To use logos as React components, convert your PNGs to SVG format

// Types
export type LogoVariant = 'main' | 'dark' | 'light' | 'icon';
