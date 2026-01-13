import { describe, it, expect } from 'vitest';
import {
  Colors,
  Spacing,
  BorderRadius,
  Breakpoints,
  Typography,
  Shadows,
  Layout,
  ZIndex,
  Transitions,
  DesignTokens,
  ChartColors,
  StatusColors,
  ModeColors,
} from './design-tokens';

describe('Design Tokens', () => {
  describe('Colors', () => {
    it('should define primary color as #bb86fc', () => {
      expect(Colors.primary).toBe('#bb86fc');
    });

    it('should define secondary color as #03dac6', () => {
      expect(Colors.secondary).toBe('#03dac6');
    });

    it('should define error color as #cf6679', () => {
      expect(Colors.error).toBe('#cf6679');
    });

    it('should define surface color as #1f1f1f', () => {
      expect(Colors.surface).toBe('#1f1f1f');
    });

    it('should define background color as #121212', () => {
      expect(Colors.background).toBe('#121212');
    });

    it('should define text colors with correct opacity', () => {
      expect(Colors.textHigh).toBe('rgba(255, 255, 255, 0.87)');
      expect(Colors.textMedium).toBe('rgba(255, 255, 255, 0.6)');
      expect(Colors.textLow).toBe('rgba(255, 255, 255, 0.5)');
      expect(Colors.textDisabled).toBe('rgba(255, 255, 255, 0.3)');
    });
  });

  describe('Spacing', () => {
    it('should define spacing scale correctly', () => {
      expect(Spacing.xs).toBe(4);
      expect(Spacing.sm).toBe(8);
      expect(Spacing.md).toBe(16);
      expect(Spacing.lg).toBe(24);
      expect(Spacing.xl).toBe(32);
      expect(Spacing.xxl).toBe(48);
    });
  });

  describe('BorderRadius', () => {
    it('should define border radius scale correctly', () => {
      expect(BorderRadius.sm).toBe(4);
      expect(BorderRadius.md).toBe(8);
      expect(BorderRadius.lg).toBe(16);
      expect(BorderRadius.full).toBe('50%');
    });
  });

  describe('Breakpoints', () => {
    it('should define breakpoints correctly', () => {
      expect(Breakpoints.mobile).toBe(600);
      expect(Breakpoints.tablet).toBe(960);
      expect(Breakpoints.desktop).toBe(1280);
    });
  });

  describe('Typography', () => {
    it('should define font families', () => {
      expect(Typography.fontFamily.base).toContain('Roboto');
      expect(Typography.fontFamily.mono).toContain('Roboto Mono');
    });

    it('should define font weights', () => {
      expect(Typography.fontWeight.light).toBe(300);
      expect(Typography.fontWeight.regular).toBe(400);
      expect(Typography.fontWeight.medium).toBe(500);
    });

    it('should define font sizes', () => {
      expect(Typography.fontSize.xs).toBe(11);
      expect(Typography.fontSize.sm).toBe(12);
      expect(Typography.fontSize.base).toBe(14);
      expect(Typography.fontSize.md).toBe(16);
      expect(Typography.fontSize.lg).toBe(18);
      expect(Typography.fontSize.xl).toBe(20);
      expect(Typography.fontSize.xxl).toBe(24);
    });
  });

  describe('Layout', () => {
    it('should define header height as 64', () => {
      expect(Layout.headerHeight).toBe(64);
    });

    it('should define sidenav widths', () => {
      expect(Layout.sidenavWidth).toBe(256);
      expect(Layout.sidenavWidthEdit).toBe(280);
    });
  });

  describe('ZIndex', () => {
    it('should define z-index scale correctly', () => {
      expect(ZIndex.sidenav).toBe(100);
      expect(ZIndex.header).toBe(1000);
      expect(ZIndex.modal).toBe(2000);
    });

    it('should have modal z-index higher than header', () => {
      expect(ZIndex.modal).toBeGreaterThan(ZIndex.header);
    });
  });

  describe('Shadows', () => {
    it('should define shadow values', () => {
      expect(Shadows.sm).toContain('rgba(0, 0, 0');
      expect(Shadows.md).toContain('rgba(0, 0, 0');
      expect(Shadows.lg).toContain('rgba(0, 0, 0');
    });
  });

  describe('Transitions', () => {
    it('should define transition values', () => {
      expect(Transitions.fast).toBe('0.2s ease');
      expect(Transitions.normal).toBe('0.3s ease');
    });
  });

  describe('DesignTokens (combined)', () => {
    it('should export all token groups', () => {
      expect(DesignTokens.colors).toBeDefined();
      expect(DesignTokens.spacing).toBeDefined();
      expect(DesignTokens.borderRadius).toBeDefined();
      expect(DesignTokens.breakpoints).toBeDefined();
      expect(DesignTokens.typography).toBeDefined();
      expect(DesignTokens.shadows).toBeDefined();
      expect(DesignTokens.layout).toBeDefined();
      expect(DesignTokens.zIndex).toBeDefined();
      expect(DesignTokens.transitions).toBeDefined();
    });
  });

  describe('ChartColors', () => {
    it('should define live mode chart colors', () => {
      expect(ChartColors.live.line).toBe(Colors.primary);
      expect(ChartColors.live.fill).toBe(Colors.primary20);
    });

    it('should define review mode chart colors', () => {
      expect(ChartColors.review.line).toBe(Colors.secondary);
      expect(ChartColors.review.fill).toBe(Colors.secondary20);
    });
  });

  describe('StatusColors', () => {
    it('should define normal status colors using secondary', () => {
      expect(StatusColors.normal.text).toBe(Colors.secondary);
    });

    it('should define warning status colors using error', () => {
      expect(StatusColors.warning.text).toBe(Colors.error);
    });

    it('should define critical status colors using error', () => {
      expect(StatusColors.critical.text).toBe(Colors.error);
    });
  });

  describe('ModeColors', () => {
    it('should define live mode colors using primary', () => {
      expect(ModeColors.live.accent).toBe(Colors.primary);
    });

    it('should define review mode colors using secondary', () => {
      expect(ModeColors.review.accent).toBe(Colors.secondary);
    });
  });
});
