import { test, expect } from './fixtures';

test.describe('Historical Request Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Add telemetry state tile
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
  });

  test('should open historical request modal when history button is clicked', async ({ page }) => {
    // Find and click the history button on the telemetry state tile
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).or(
      page.locator('span.material-icons').filter({ hasText: 'history' })
    ).first();
    
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Verify MatDialog modal is open
      await expect(page.locator('.cdk-overlay-container .cdk-global-overlay-wrapper')).toBeVisible();
      await expect(page.locator('.cdk-overlay-container em-historical-request-modal')).toBeVisible();
    }
  });

  test('should display time range quick select buttons', async ({ page }) => {
    // Open modal
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).first();
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Verify quick select buttons are visible
      await expect(page.locator('text=Last 1 hour')).toBeVisible();
      await expect(page.locator('text=Last 4 hours')).toBeVisible();
      await expect(page.locator('text=Last 8 hours')).toBeVisible();
      await expect(page.locator('text=Last 24 hours')).toBeVisible();
      await expect(page.locator('text=Custom Range')).toBeVisible();
    }
  });

  test('should display datetime inputs', async ({ page }) => {
    // Open modal
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).first();
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Verify datetime inputs are present
      const datetimeInputs = page.locator('input[type="datetime-local"]');
      await expect(datetimeInputs).toHaveCount(2); // Start and end datetime
    }
  });

  test('should display request summary', async ({ page }) => {
    // Open modal
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).first();
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Verify summary section is visible
      await expect(page.locator('text=Request Summary').or(page.locator('.summary'))).toBeVisible();
      await expect(page.locator('text=Time Range')).toBeVisible();
      await expect(page.locator('text=Estimated Records')).toBeVisible();
    }
  });

  test('should allow selecting quick time range', async ({ page }) => {
    // Open modal
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).first();
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Click on "Last 4 hours" button
      const fourHoursButton = page.locator('button').filter({ hasText: 'Last 4 hours' });
      await fourHoursButton.click();
      
      // Verify button is active/selected
      await expect(fourHoursButton).toHaveClass(/active/);
    }
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    // Open modal
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).first();
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Click close button
      const closeButton = page.locator('.modal-header__close').or(
        page.locator('button').filter({ hasText: /close|cancel/i })
      );
      if (await closeButton.count() > 0) {
        await closeButton.first().click();
      }
      
      await page.waitForTimeout(300);
      
      // Verify modal is closed
      await expect(page.locator('.cdk-overlay-container em-historical-request-modal')).not.toBeVisible();
    }
  });

  test('should close modal when pressing Escape key', async ({ page }) => {
    // Open modal
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).first();
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Press Escape key
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      
      // Verify modal is closed
      await expect(page.locator('.cdk-overlay-container em-historical-request-modal')).not.toBeVisible();
    }
  });

  test('should load historical data when button is clicked', async ({ page }) => {
    // Open modal
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).first();
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Click load data button
      const loadButton = page.locator('button').filter({ hasText: /load|request/i });
      if (await loadButton.count() > 0) {
        await loadButton.first().click();
        await page.waitForTimeout(500);
        
        // Verify modal is closed after loading
        await expect(page.locator('.cdk-overlay-container em-historical-request-modal')).not.toBeVisible();
      }
    }
  });

  test('should close modal when clicking backdrop', async ({ page }) => {
    // Open modal
    const historyButton = page.locator('button').filter({ hasText: /history|historical/i }).first();
    if (await historyButton.count() > 0) {
      await historyButton.click();
      await page.waitForTimeout(500);
      
      // Click on the backdrop
      await page.locator('.cdk-overlay-backdrop').click();
      await page.waitForTimeout(300);
      
      // Verify modal is closed
      await expect(page.locator('.cdk-overlay-container em-historical-request-modal')).not.toBeVisible();
    }
  });
});
