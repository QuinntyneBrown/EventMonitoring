import { test as base, Page } from '@playwright/test';

// Mock telemetry data
export const mockTelemetryMessage = {
  name: 'cpu_usage',
  ust: new Date().toISOString(),
  value: '45.5',
};

export const mockConfigFiles = [
  {
    id: '1',
    name: 'Spacecraft Sensors',
    path: '/telemetry/spacecraft-sensors.json',
    itemCount: 4,
    lastModified: new Date(Date.now() - 86400000),
    items: ['cpu_usage', 'memory_usage', 'fuel_level', 'oxygen_level'],
  },
  {
    id: '2',
    name: 'Navigation Systems',
    path: '/telemetry/navigation-systems.json',
    itemCount: 4,
    lastModified: new Date(Date.now() - 172800000),
    items: ['gps_lat', 'gps_lon', 'altitude', 'velocity'],
  },
];

/**
 * Setup function to mock HTTP and WebSocket APIs
 */
export async function setupMocks(page: Page) {
  // Mock SignalR/WebSocket connection
  await page.route('**/telemetry', async (route) => {
    // WebSocket upgrade is handled by the browser, 
    // but we can intercept the initial HTTP request
    await route.continue();
  });

  // Mock configuration API
  await page.route('**/api/configuration/**', async (route) => {
    const url = route.request().url();
    
    if (url.includes('/api/configuration/files')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockConfigFiles),
      });
    } else {
      await route.continue();
    }
  });

  // Evaluate script to mock telemetry service
  await page.addInitScript(() => {
    // Mock localStorage for saved dashboard state
    localStorage.setItem('dashboard-tiles', JSON.stringify([]));
  });
}

// Extend base test with fixtures
type TestFixtures = {
  setupMocks: void;
};

export const test = base.extend<TestFixtures>({
  setupMocks: [
    async ({ page }, use) => {
      await setupMocks(page);
      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
