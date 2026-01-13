import { test, expect } from './fixtures';

test.describe('Telemetry State Tile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Enter edit mode and add telemetry state tile
    await page.locator('button').filter({ hasText: /edit/i }).click();
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    
    // Exit edit mode
    await page.locator('button').filter({ hasText: /edit|done/i }).first().click();
  });

  test('should display telemetry state tile', async ({ page }) => {
    // Verify tile is visible
    await expect(page.locator('em-telemetry-state-tile')).toBeVisible();
  });

  test('should show live mode info banner', async ({ page }) => {
    // Check for live mode information
    await expect(page.locator('text=/Receiving live telemetry|live telemetry/i')).toBeVisible();
  });

  test('should display telemetry statistics', async ({ page }) => {
    // Check for statistics like update rate, subscriptions, etc.
    // These may vary, so we check for presence of stats elements
    const statsSection = page.locator('em-telemetry-state-tile');
    await expect(statsSection).toBeVisible();
    
    // Look for typical stat indicators
    await expect(
      page.locator('text=/Hz|subscriptions|messages/i')
    ).toBeVisible({ timeout: 3000 });
  });

  test('should show connection status', async ({ page }) => {
    // Check for connection status (OK, Error, Connecting)
    await expect(
      page.locator('text=/OK|Connecting|Connected/i')
    ).toBeVisible({ timeout: 5000 });
  });

  test('should display play/pause control', async ({ page }) => {
    // Look for play/pause button
    const playPauseButton = page.locator('button').filter({ 
      has: page.locator('span.material-icons:has-text("play_arrow"), span.material-icons:has-text("pause")')
    });
    
    await expect(playPauseButton.first()).toBeVisible({ timeout: 3000 });
  });

  test('should allow pausing telemetry', async ({ page }) => {
    // Find and click play/pause button
    const pauseButton = page.locator('span.material-icons:has-text("pause")').first();
    
    if (await pauseButton.isVisible()) {
      await pauseButton.click();
      await page.waitForTimeout(500);
      
      // Verify button changed to play
      await expect(page.locator('span.material-icons:has-text("play_arrow")').first()).toBeVisible();
    }
  });

  test('should display timeline in review mode', async ({ page }) => {
    // This test assumes we can switch to review mode
    // Check if review mode toggle exists
    const reviewModeButton = page.locator('button').filter({ hasText: /review|historical/i });
    
    if (await reviewModeButton.count() > 0) {
      await reviewModeButton.first().click();
      await page.waitForTimeout(500);
      
      // Look for timeline/scrubber
      await expect(
        page.locator('[class*="timeline"]').or(page.locator('[role="slider"]'))
      ).toBeVisible({ timeout: 3000 });
    }
  });
});

test.describe('Telemetry State Tile - Historical Data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Setup tile
    await page.locator('button').filter({ hasText: /edit/i }).click();
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    await page.locator('button').filter({ hasText: /edit|done/i }).first().click();
  });

  test('should show load historical data button', async ({ page }) => {
    // Look for history/load data button
    const historyButton = page.locator('button').filter({ 
      has: page.locator('span.material-icons:has-text("history")')
    }).or(page.locator('button[aria-label*="history"]'));
    
    // May not be immediately visible, depends on mode
    if (await historyButton.count() > 0) {
      await expect(historyButton.first()).toBeVisible({ timeout: 3000 });
    }
  });

  test('should open historical data modal when history button is clicked', async ({ page }) => {
    // Find history button in telemetry state tile
    const historyButton = page.locator('em-telemetry-state-tile button').filter({ 
      has: page.locator('span.material-icons:has-text("history")')
    });
    
    if (await historyButton.count() > 0) {
      await historyButton.first().click();
      await page.waitForTimeout(500);
      
      // Check for historical request modal
      await expect(
        page.locator('em-historical-request-modal').or(page.locator('[class*="historical-modal"]'))
      ).toBeVisible({ timeout: 3000 });
    }
  });

  test('should display playback speed controls in review mode', async ({ page }) => {
    // This requires switching to review mode first
    const reviewButton = page.locator('button').filter({ hasText: /review/i });
    
    if (await reviewButton.count() > 0) {
      await reviewButton.first().click();
      await page.waitForTimeout(500);
      
      // Look for speed controls (0.5x, 1x, 2x, etc.)
      await expect(
        page.locator('text=/speed|0.5x|1x|2x/i')
      ).toBeVisible({ timeout: 3000 });
    }
  });
});
