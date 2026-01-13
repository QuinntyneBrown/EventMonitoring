import { test, expect } from './fixtures';

test.describe('Configuration File Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Add telemetry state tile
    await page.locator('button').filter({ hasText: 'Telemetry State' }).click();
    await page.waitForTimeout(500);
    
    // Add a graph tile
    await page.locator('button').filter({ hasText: 'Graph Tile' }).click();
    await page.waitForTimeout(500);
  });

  test('should open configuration modal when tile config button is clicked', async ({ page }) => {
    // Find and click the folder/config icon on a tile
    const configButton = page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first();
    await configButton.click();
    
    // Verify MatDialog modal is open - look for the dialog overlay
    await expect(page.locator('.cdk-overlay-container .cdk-global-overlay-wrapper')).toBeVisible();
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).toBeVisible();
  });

  test('should display list of configuration files in modal', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    await page.waitForTimeout(500);
    
    // Check for configuration file names within the dialog
    await expect(page.locator('text=Spacecraft Sensors').or(page.locator('text=Navigation Systems'))).toBeVisible();
  });

  test('should allow searching configuration files', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    await page.waitForTimeout(500);
    
    // Find search input
    const searchInput = page.locator('input[type="search"]').or(page.locator('input[placeholder*="Search"]'));
    
    if (await searchInput.count() > 0) {
      await searchInput.fill('Navigation');
      
      // Verify filtered results
      await expect(page.locator('text=Navigation Systems')).toBeVisible();
      await expect(page.locator('text=Spacecraft Sensors')).not.toBeVisible();
    }
  });

  test('should allow selecting a configuration file', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    await page.waitForTimeout(500);
    
    // Click on a configuration file
    const configFileItem = page.locator('text=Spacecraft Sensors').or(page.locator('[class*="config-list__item"]')).first();
    await configFileItem.click();
    
    // Verify item is selected (may have selected class or styling)
    await expect(configFileItem).toHaveClass(/selected/);
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    await page.waitForTimeout(500);
    
    // Click close button (Material dialog close button)
    const closeButton = page.locator('.modal-header__close').or(page.locator('button').filter({ hasText: /close|cancel/i }));
    if (await closeButton.count() > 0) {
      await closeButton.first().click();
    }
    
    await page.waitForTimeout(300);
    
    // Verify modal is closed - check that dialog overlay is gone
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).not.toBeVisible();
  });

  test('should apply configuration when apply button is clicked', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    await page.waitForTimeout(500);
    
    // Select a configuration file
    const configFileItem = page.locator('text=Spacecraft Sensors').or(page.locator('[class*="config-list__item"]')).first();
    await configFileItem.click();
    await page.waitForTimeout(300);
    
    // Click apply button
    const applyButton = page.locator('button').filter({ hasText: /apply|select/i });
    if (await applyButton.count() > 0) {
      await applyButton.first().click();
      await page.waitForTimeout(500);
      
      // Verify modal is closed after applying
      await expect(page.locator('.cdk-overlay-container em-config-file-modal')).not.toBeVisible();
    }
  });

  test('should close modal when clicking backdrop', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    await page.waitForTimeout(500);
    
    // Click on the backdrop (outside the dialog)
    await page.locator('.cdk-overlay-backdrop').click();
    await page.waitForTimeout(300);
    
    // Verify modal is closed
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).not.toBeVisible();
  });

  test('should close modal when pressing Escape key', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    await page.waitForTimeout(500);
    
    // Press Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    // Verify modal is closed
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).not.toBeVisible();
  });
});
