import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#121212' },
        { name: 'surface', value: '#1f1f1f' },
        { name: 'surface-variant', value: '#2a2a2a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'paintbrush',
        items: [{ value: 'dark', title: 'Dark Theme' }],
        showName: true,
      },
    },
  },
  decorators: [
    (story) => ({
      template: `
        <style>
          :root {
            --em-color-primary: #bb86fc;
            --em-color-primary-variant: #9f6ae1;
            --em-color-primary-10: rgba(187, 134, 252, 0.1);
            --em-color-primary-15: rgba(187, 134, 252, 0.15);
            --em-color-primary-20: rgba(187, 134, 252, 0.2);
            --em-color-primary-30: rgba(187, 134, 252, 0.3);
            --em-color-secondary: #03dac6;
            --em-color-secondary-variant: #00c4b4;
            --em-color-secondary-10: rgba(3, 218, 198, 0.1);
            --em-color-secondary-20: rgba(3, 218, 198, 0.2);
            --em-color-secondary-30: rgba(3, 218, 198, 0.3);
            --em-color-error: #cf6679;
            --em-color-error-20: rgba(207, 102, 121, 0.2);
            --em-color-error-30: rgba(207, 102, 121, 0.3);
            --em-color-background: #121212;
            --em-color-surface: #1f1f1f;
            --em-color-surface-variant: #2a2a2a;
            --em-color-border: #333333;
            --em-color-text-high: rgba(255, 255, 255, 0.87);
            --em-color-text-medium: rgba(255, 255, 255, 0.6);
            --em-color-text-low: rgba(255, 255, 255, 0.5);
            --em-color-text-disabled: rgba(255, 255, 255, 0.3);
            --em-color-text-on-primary: #121212;
            --em-color-text-on-secondary: #121212;
            --em-color-overlay: rgba(0, 0, 0, 0.7);
            --em-color-hover: rgba(255, 255, 255, 0.1);
            --em-color-hover-subtle: rgba(255, 255, 255, 0.05);
            --em-spacing-xs: 4px;
            --em-spacing-sm: 8px;
            --em-spacing-md: 16px;
            --em-spacing-lg: 24px;
            --em-spacing-xl: 32px;
            --em-spacing-2xl: 48px;
            --em-radius-sm: 4px;
            --em-radius-md: 8px;
            --em-radius-lg: 16px;
            --em-radius-full: 50%;
            --em-radius-pill: 9999px;
            --em-font-family-base: 'Roboto', sans-serif;
            --em-font-family-mono: 'Roboto Mono', monospace;
            --em-font-weight-light: 300;
            --em-font-weight-regular: 400;
            --em-font-weight-medium: 500;
            --em-font-size-xs: 11px;
            --em-font-size-sm: 12px;
            --em-font-size-base: 14px;
            --em-font-size-md: 16px;
            --em-font-size-lg: 18px;
            --em-font-size-xl: 20px;
            --em-font-size-2xl: 24px;
            --em-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
            --em-shadow-md: 0 2px 8px rgba(0, 0, 0, 0.3);
            --em-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
            --em-transition-fast: 0.2s ease;
            --em-transition-normal: 0.3s ease;
          }
          body {
            font-family: var(--em-font-family-base);
            color: var(--em-color-text-high);
            margin: 0;
            padding: 0;
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&family=Roboto+Mono&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div style="padding: 16px;">${story().template}</div>
      `,
      props: story().props,
    }),
  ],
};

export default preview;
