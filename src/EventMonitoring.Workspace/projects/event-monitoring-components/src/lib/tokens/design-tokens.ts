/**
 * Design Tokens for Event Monitoring System (REQ-UI-006, REQ-UI-007)
 * TypeScript constants for programmatic access to design token values
 */

// =============================================================================
// Color Tokens
// =============================================================================
export const Colors = {
  // Primary palette
  primary: '#bb86fc',
  primaryVariant: '#9f6ae1',
  primary10: 'rgba(187, 134, 252, 0.1)',
  primary15: 'rgba(187, 134, 252, 0.15)',
  primary20: 'rgba(187, 134, 252, 0.2)',
  primary30: 'rgba(187, 134, 252, 0.3)',

  // Secondary palette
  secondary: '#03dac6',
  secondaryVariant: '#00c4b4',
  secondary10: 'rgba(3, 218, 198, 0.1)',
  secondary20: 'rgba(3, 218, 198, 0.2)',
  secondary30: 'rgba(3, 218, 198, 0.3)',

  // Error palette
  error: '#cf6679',
  errorVariant: '#b55464',
  error20: 'rgba(207, 102, 121, 0.2)',
  error30: 'rgba(207, 102, 121, 0.3)',

  // Surfaces
  background: '#121212',
  surface: '#1f1f1f',
  surfaceVariant: '#2a2a2a',
  border: '#333333',

  // Text
  textHigh: 'rgba(255, 255, 255, 0.87)',
  textMedium: 'rgba(255, 255, 255, 0.6)',
  textLow: 'rgba(255, 255, 255, 0.5)',
  textDisabled: 'rgba(255, 255, 255, 0.3)',
  textOnPrimary: '#121212',
  textOnSecondary: '#121212',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.7)',
  hover: 'rgba(255, 255, 255, 0.1)',
  hoverSubtle: 'rgba(255, 255, 255, 0.05)',
} as const;

// =============================================================================
// Spacing Tokens
// =============================================================================
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// =============================================================================
// Border Radius Tokens
// =============================================================================
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  full: '50%',
  pill: 9999,
} as const;

// =============================================================================
// Breakpoint Tokens
// =============================================================================
export const Breakpoints = {
  mobile: 600,
  tablet: 960,
  desktop: 1280,
} as const;

// =============================================================================
// Typography Tokens
// =============================================================================
export const Typography = {
  fontFamily: {
    base: "'Roboto', sans-serif",
    mono: "'Roboto Mono', monospace",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
  },
  fontSize: {
    xs: 11,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
  },
} as const;

// =============================================================================
// Shadow Tokens
// =============================================================================
export const Shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
  md: '0 2px 8px rgba(0, 0, 0, 0.3)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
} as const;

// =============================================================================
// Layout Tokens
// =============================================================================
export const Layout = {
  headerHeight: 64,
  sidenavWidth: 256,
  sidenavWidthEdit: 280,
} as const;

// =============================================================================
// Z-Index Tokens
// =============================================================================
export const ZIndex = {
  sidenav: 100,
  header: 1000,
  modal: 2000,
} as const;

// =============================================================================
// Transition Tokens
// =============================================================================
export const Transitions = {
  fast: '0.2s ease',
  normal: '0.3s ease',
} as const;

// =============================================================================
// Combined Design Tokens Export
// =============================================================================
export const DesignTokens = {
  colors: Colors,
  spacing: Spacing,
  borderRadius: BorderRadius,
  breakpoints: Breakpoints,
  typography: Typography,
  shadows: Shadows,
  layout: Layout,
  zIndex: ZIndex,
  transitions: Transitions,
} as const;

// =============================================================================
// Type Definitions
// =============================================================================
export type StatusType = 'normal' | 'warning' | 'critical';
export type TelemetryMode = 'live' | 'review';
export type DashboardMode = 'view' | 'edit';
export type ButtonVariant = 'primary' | 'secondary' | 'icon';
export type TileType = 'telemetry-state' | 'graph' | 'tabular';

// =============================================================================
// Chart.js Color Configuration (for Graph Tile)
// =============================================================================
export const ChartColors = {
  live: {
    line: Colors.primary,
    fill: Colors.primary20,
    grid: 'rgba(255, 255, 255, 0.1)',
    tick: Colors.textMedium,
  },
  review: {
    line: Colors.secondary,
    fill: Colors.secondary20,
    grid: 'rgba(255, 255, 255, 0.1)',
    tick: Colors.textMedium,
  },
} as const;

// =============================================================================
// Status Color Mapping
// =============================================================================
export const StatusColors = {
  normal: {
    background: Colors.secondary20,
    text: Colors.secondary,
  },
  warning: {
    background: Colors.error20,
    text: Colors.error,
  },
  critical: {
    background: Colors.error30,
    text: Colors.error,
  },
} as const;

// =============================================================================
// Mode Color Mapping
// =============================================================================
export const ModeColors = {
  live: {
    background: Colors.primary20,
    text: Colors.primary,
    accent: Colors.primary,
  },
  review: {
    background: Colors.secondary20,
    text: Colors.secondary,
    accent: Colors.secondary,
  },
} as const;
