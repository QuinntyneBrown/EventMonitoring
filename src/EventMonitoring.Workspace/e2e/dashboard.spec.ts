import { test, expect } from './fixtures';

test.describe('Dashboard - Live Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display dashboard page with header and title', async ({ page }) => {
    await expect(page.locator('h1').filter({ hasText: 'Dashboard' })).toBeVisible();
    await expect(page.locator('text=Real-time space vehicle telemetry monitoring')).toBeVisible();
  });

  test('should show live mode indicator in header', async ({ page }) => {
    // Check for live mode indicator
    await expect(page.locator('[class*="mode-indicator"]').filter({ hasText: /live/i })).toBeVisible();
  });

  test('should display placeholder when no tiles are added', async ({ page }) => {
    // Check for placeholder message
    await expect(page.locator('text=No tiles added yet')).toBeVisible();
  });

  test('should show edit toggle button in header', async ({ page }) => {
    // Check for edit toggle button
    await expect(page.locator('button').filter({ hasText: /edit/i })).toBeVisible();
  });
});

test.describe('Dashboard - Edit Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should enter edit mode when edit button is clicked', async ({ page }) => {
    // Click edit button
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Verify edit mode is active (tile palette should be visible)
    await expect(page.locator('text=Add Tiles')).toBeVisible();
  });

  test('should show tile palette in edit mode', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Check for tile palette items
    await expect(page.locator('text=Telemetry State')).toBeVisible();
    await expect(page.locator('text=Graph Tile')).toBeVisible();
    await expect(page.locator('text=Tabular Tile')).toBeVisible();
  });

  test('should allow adding telemetry state tile', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Click on Telemetry State tile in palette
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    
    // Wait a bit for the tile to be added
    await page.waitForTimeout(500);
    
    // Verify tile was added
    await expect(page.locator('[class*="dashboard__tile"]')).toBeVisible();
  });

  test('should not allow adding graph tile without telemetry state', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Check that Graph Tile is disabled
    const graphTileButton = page.locator('button').filter({ hasText: 'Graph Tile' });
    await expect(graphTileButton).toBeDisabled();
    
    // Verify disabled reason
    await expect(page.locator('text=Requires Telemetry State tile')).toBeVisible();
  });

  test('should allow adding graph tile after telemetry state is added', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Add telemetry state tile first
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    
    // Now graph tile should be enabled
    const graphTileButton = page.locator('button').filter({ hasText: 'Graph Tile' });
    await expect(graphTileButton).toBeEnabled();
    
    // Add graph tile
    await graphTileButton.click();
    await page.waitForTimeout(500);
    
    // Verify both tiles are present
    const tiles = page.locator('[class*="dashboard__tile"]');
    await expect(tiles).toHaveCount(2);
  });

  test('should not allow adding multiple telemetry state tiles', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Add telemetry state tile
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    
    // Check that Telemetry State tile is now disabled
    const telemetryStateTileButton = page.locator('button').filter({ hasText: 'Telemetry State' });
    await expect(telemetryStateTileButton).toBeDisabled();
    
    // Verify disabled reason
    await expect(page.locator('text=Only one instance allowed')).toBeVisible();
  });

  test('should show remove button on tiles in edit mode', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Add a tile
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    
    // Check for remove button
    await expect(page.locator('[class*="dashboard__tile-remove"]')).toBeVisible();
  });

  test('should remove tile when remove button is clicked', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Add a tile
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    
    // Verify tile exists
    await expect(page.locator('[class*="dashboard__tile"]')).toBeVisible();
    
    // Click remove button
    await page.locator('[class*="dashboard__tile-remove"]').click();
    await page.waitForTimeout(500);
    
    // Verify tile is removed
    await expect(page.locator('[class*="dashboard__tile"]')).not.toBeVisible();
  });

  test('should allow adding multiple graph tiles', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Add telemetry state tile first
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    
    // Add first graph tile
    await page.locator('button').filter({ hasText: 'Graph Tile' }).click();
    await page.waitForTimeout(500);
    
    // Add second graph tile
    await page.locator('button').filter({ hasText: 'Graph Tile' }).click();
    await page.waitForTimeout(500);
    
    // Verify 3 tiles total (1 telemetry state + 2 graph)
    const tiles = page.locator('[class*="dashboard__tile"]');
    await expect(tiles).toHaveCount(3);
  });

  test('should exit edit mode when done button is clicked', async ({ page }) => {
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    await expect(page.locator('text=Add Tiles')).toBeVisible();
    
    // Click done/edit button again
    await page.locator('button').filter({ hasText: /edit|done/i }).first().click();
    
    // Verify edit mode is exited (tile palette should not be visible)
    await expect(page.locator('text=Add Tiles')).not.toBeVisible();
  });
});
