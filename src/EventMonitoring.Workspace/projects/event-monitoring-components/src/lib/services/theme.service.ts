import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DesignTokens } from '../tokens/design-tokens';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeModeSubject = new BehaviorSubject<ThemeMode>('dark');
  readonly themeMode$: Observable<ThemeMode> = this.themeModeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Check for stored preference
    const storedTheme = localStorage.getItem('em-theme') as ThemeMode | null;
    if (storedTheme) {
      this.setTheme(storedTheme);
    } else {
      // Default to dark theme as per design specifications
      this.setTheme('dark');
    }
  }

  get currentTheme(): ThemeMode {
    return this.themeModeSubject.value;
  }

  setTheme(mode: ThemeMode): void {
    this.themeModeSubject.next(mode);
    localStorage.setItem('em-theme', mode);
    this.applyThemeToDocument(mode);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private applyThemeToDocument(mode: ThemeMode): void {
    const root = document.documentElement;

    if (mode === 'dark') {
      root.style.setProperty('--em-color-background', DesignTokens.colors.background);
      root.style.setProperty('--em-color-surface', DesignTokens.colors.surface);
      root.style.setProperty('--em-color-text-high', 'rgba(255, 255, 255, 0.87)');
      root.style.setProperty('--em-color-text-medium', 'rgba(255, 255, 255, 0.6)');
      root.style.setProperty('--em-color-text-low', 'rgba(255, 255, 255, 0.5)');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.style.setProperty('--em-color-background', '#fafafa');
      root.style.setProperty('--em-color-surface', '#ffffff');
      root.style.setProperty('--em-color-text-high', 'rgba(0, 0, 0, 0.87)');
      root.style.setProperty('--em-color-text-medium', 'rgba(0, 0, 0, 0.6)');
      root.style.setProperty('--em-color-text-low', 'rgba(0, 0, 0, 0.5)');
      root.setAttribute('data-theme', 'light');
    }
  }

  getColor(colorName: keyof typeof DesignTokens.colors): string {
    return DesignTokens.colors[colorName];
  }

  getSpacing(spacingName: keyof typeof DesignTokens.spacing): string {
    return `${DesignTokens.spacing[spacingName]}px`;
  }

  getBorderRadius(radiusName: keyof typeof DesignTokens.borderRadius): string {
    const value = DesignTokens.borderRadius[radiusName];
    return typeof value === 'string' ? value : `${value}px`;
  }
}
