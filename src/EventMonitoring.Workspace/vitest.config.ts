import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['projects/event-monitoring-components/src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage/event-monitoring-components',
      include: ['projects/event-monitoring-components/src/lib/**/*.ts'],
      exclude: [
        '**/*.stories.ts',
        '**/*.spec.ts',
        '**/index.ts',
        '**/public-api.ts',
      ],
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
    setupFiles: ['./test-setup.ts'],
  },
});
