import { test, expect } from './fixtures';

test.describe('Complete Dashboard Workflow', () => {
  test('should complete full workflow: add tiles, configure, and view data', async ({ page }) => {
    // 1. Navigate to dashboard
    await page.goto('/');
    await expect(page.locator('h1').filter({ hasText: 'Dashboard' })).toBeVisible();
    
    // 2. Verify initial state (no tiles)
    await expect(page.locator('text=No tiles added yet')).toBeVisible();
    
    // 3. Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    await expect(page.locator('text=Add Tiles')).toBeVisible();
    
    // 4. Add telemetry state tile
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('em-telemetry-state-tile')).toBeVisible();
    
    // 5. Verify graph tile is now enabled
    const graphTileButton = page.locator('button').filter({ hasText: 'Graph Tile' });
    await expect(graphTileButton).toBeEnabled();
    
    // 6. Add graph tile
    await graphTileButton.click();
    await page.waitForTimeout(500);
    await expect(page.locator('em-graph-tile')).toBeVisible();
    
    // 7. Add tabular tile
    await page.locator('button').filter({ hasText: 'Tabular Tile' }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('em-tabular-tile')).toBeVisible();
    
    // 8. Verify we have 3 tiles total
    const tiles = page.locator('[class*="dashboard__tile"]');
    await expect(tiles).toHaveCount(3);
    
    // 9. Exit edit mode
    await page.locator('button').filter({ hasText: /edit|done/i }).first().click();
    await expect(page.locator('text=Add Tiles')).not.toBeVisible();
    
    // 10. Verify tiles are still visible and remove buttons are hidden
    await expect(tiles).toHaveCount(3);
    await expect(page.locator('[class*="dashboard__tile-remove"]')).not.toBeVisible();
    
    // 11. Verify dashboard is in live mode
    await expect(page.locator('[class*="mode-indicator"]').filter({ hasText: /live/i })).toBeVisible();
    
    // 12. Check telemetry state tile shows connection status
    await expect(page.locator('em-telemetry-state-tile text=/OK|Connecting|Connected/i')).toBeVisible({ timeout: 5000 });
  });

  test('should handle removing tiles correctly', async ({ page }) => {
    await page.goto('/');
    
    // Enter edit mode and add tiles
    await page.locator('button').filter({ hasText: /edit/i }).click();
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    await page.locator('button').filter({ hasText: 'Graph Tile' }).click();
    await page.waitForTimeout(500);
    await page.locator('button').filter({ hasText: 'Graph Tile' }).click();
    await page.waitForTimeout(500);
    
    // Verify 3 tiles
    const tiles = page.locator('[class*="dashboard__tile"]');
    await expect(tiles).toHaveCount(3);
    
    // Remove one graph tile
    const removeButtons = page.locator('[class*="dashboard__tile-remove"]');
    await removeButtons.last().click();
    await page.waitForTimeout(500);
    
    // Verify 2 tiles remain
    await expect(tiles).toHaveCount(2);
    
    // Remove telemetry state tile
    await removeButtons.first().click();
    await page.waitForTimeout(500);
    
    // Verify 1 tile remains
    await expect(tiles).toHaveCount(1);
    
    // Verify graph tile button is now disabled (no telemetry state)
    const graphTileButton = page.locator('button').filter({ hasText: 'Graph Tile' });
    await expect(graphTileButton).toBeDisabled();
  });

  test('should persist tile layout between edit mode toggles', async ({ page }) => {
    await page.goto('/');
    
    // Add tiles in edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    await page.locator('button').filter({ hasText: 'Graph Tile' }).click();
    await page.waitForTimeout(500);
    
    // Exit edit mode
    await page.locator('button').filter({ hasText: /edit|done/i }).first().click();
    
    // Verify tiles are visible
    const tiles = page.locator('[class*="dashboard__tile"]');
    await expect(tiles).toHaveCount(2);
    
    // Re-enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Verify tiles are still present
    await expect(tiles).toHaveCount(2);
    
    // Verify telemetry state button is disabled (already added)
    const telemetryButton = page.locator('button').filter({ hasText: 'Telemetry State' });
    await expect(telemetryButton).toBeDisabled();
  });

  test('should show appropriate UI elements based on mode', async ({ page }) => {
    await page.goto('/');
    
    // In normal mode, edit toggle should be visible
    await expect(page.locator('button').filter({ hasText: /edit/i })).toBeVisible();
    
    // Tile palette should not be visible
    await expect(page.locator('text=Add Tiles')).not.toBeVisible();
    
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Tile palette should now be visible
    await expect(page.locator('text=Add Tiles')).toBeVisible();
    
    // Done/edit button should still be visible
    await expect(page.locator('button').filter({ hasText: /edit|done/i }).first()).toBeVisible();
  });
});
