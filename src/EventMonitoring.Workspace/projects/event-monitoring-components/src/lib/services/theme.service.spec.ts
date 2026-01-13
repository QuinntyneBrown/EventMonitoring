import { TestBed } from '@angular/core/testing';
import { ThemeService, ThemeMode } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should default to dark theme', () => {
      expect(service.currentTheme).toBe('dark');
    });

    it('should restore theme from localStorage', () => {
      localStorage.setItem('em-theme', 'light');

      const newService = new ThemeService();

      expect(newService.currentTheme).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('should set theme to dark', () => {
      service.setTheme('dark');

      expect(service.currentTheme).toBe('dark');
    });

    it('should set theme to light', () => {
      service.setTheme('light');

      expect(service.currentTheme).toBe('light');
    });

    it('should store theme in localStorage', () => {
      service.setTheme('light');

      expect(localStorage.getItem('em-theme')).toBe('light');
    });

    it('should emit theme change through observable', async () => {
      const expectedThemes: ThemeMode[] = [];

      return new Promise<void>((resolve) => {
        service.themeMode$.subscribe((theme) => {
          expectedThemes.push(theme);
          if (expectedThemes.length === 2) {
            expect(expectedThemes).toEqual(['dark', 'light']);
            resolve();
          }
        });

        service.setTheme('light');
      });
    });

    it('should apply dark theme to document', () => {
      service.setTheme('dark');

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply light theme to document', () => {
      service.setTheme('light');

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from dark to light', () => {
      service.setTheme('dark');
      service.toggleTheme();

      expect(service.currentTheme).toBe('light');
    });

    it('should toggle from light to dark', () => {
      service.setTheme('light');
      service.toggleTheme();

      expect(service.currentTheme).toBe('dark');
    });
  });

  describe('getColor', () => {
    it('should return primary color', () => {
      const color = service.getColor('primary');

      expect(color).toBe('#bb86fc');
    });

    it('should return secondary color', () => {
      const color = service.getColor('secondary');

      expect(color).toBe('#03dac6');
    });

    it('should return error color', () => {
      const color = service.getColor('error');

      expect(color).toBe('#cf6679');
    });
  });

  describe('getSpacing', () => {
    it('should return spacing values', () => {
      expect(service.getSpacing('xs')).toBe('4px');
      expect(service.getSpacing('sm')).toBe('8px');
      expect(service.getSpacing('md')).toBe('16px');
      expect(service.getSpacing('lg')).toBe('24px');
      expect(service.getSpacing('xl')).toBe('32px');
    });
  });

  describe('getBorderRadius', () => {
    it('should return border radius values', () => {
      expect(service.getBorderRadius('sm')).toBe('4px');
      expect(service.getBorderRadius('md')).toBe('8px');
      expect(service.getBorderRadius('lg')).toBe('16px');
      expect(service.getBorderRadius('full')).toBe('50%');
    });
  });

  describe('observable', () => {
    it('should provide current theme through observable', async () => {
      return new Promise<void>((resolve) => {
        service.themeMode$.subscribe((theme) => {
          expect(theme).toBe('dark');
          resolve();
        });
      });
    });
  });
});
