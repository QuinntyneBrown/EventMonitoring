import { test, expect } from './fixtures';

// Test configuration constants
const MODAL_LOAD_TIMEOUT = 10000;
const BACKDROP_CLICK_X = 10;
const BACKDROP_CLICK_Y = 10;

test.describe('Configuration File Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Enter edit mode
    await page.locator('button').filter({ hasText: /edit/i }).click();
    
    // Add telemetry state tile - use data attribute for precise targeting
    await page.locator('button[data-tile-type="telemetry-state"]').click();
    await page.waitForTimeout(500);
    
    // Add a graph tile - use data attribute for precise targeting
    await page.locator('button[data-tile-type="graph"]').click();
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
    
    // Wait for modal to be visible
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).toBeVisible();
    
    // Check for configuration file names within the dialog - wait for data to load
    await expect(page.locator('text=Spacecraft Sensors')).toBeVisible({ timeout: MODAL_LOAD_TIMEOUT });
    await expect(page.locator('text=Navigation Systems')).toBeVisible();
  });

  test('should allow searching configuration files', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    
    // Wait for modal to be visible
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).toBeVisible();
    
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
    
    // Wait for modal to be visible
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).toBeVisible();
    
    // Click on a configuration file
    const configFileItem = page.locator('text=Spacecraft Sensors').or(page.locator('[class*="config-list__item"]')).first();
    await configFileItem.click();
    
    // Verify item is selected (may have selected class or styling)
    await expect(configFileItem).toHaveClass(/selected/);
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    
    // Wait for modal to be visible
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).toBeVisible();
    
    // Click close button (Material dialog close button)
    const closeButton = page.locator('.modal-header__close');
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    
    // Verify modal is closed - check that dialog overlay is gone
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).not.toBeVisible();
  });

  test('should apply configuration when apply button is clicked', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    
    // Wait for modal to be visible
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).toBeVisible();
    
    // Select a configuration file
    const configFileItem = page.locator('text=Spacecraft Sensors').or(page.locator('[class*="config-list__item"]')).first();
    await configFileItem.click();
    
    // Click apply button
    const applyButton = page.locator('button').filter({ hasText: /apply|select/i });
    if (await applyButton.count() > 0) {
      await applyButton.first().click();
      
      // Verify modal is closed after applying
      await expect(page.locator('.cdk-overlay-container em-config-file-modal')).not.toBeVisible();
    }
  });

  test('should close modal when clicking backdrop', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    
    // Wait for modal to be visible
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).toBeVisible();
    
    // Click on the backdrop by clicking outside the dialog
    // Use top-left corner position to avoid dialog content
    await page.mouse.click(BACKDROP_CLICK_X, BACKDROP_CLICK_Y);
    
    // Verify modal is closed
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).not.toBeVisible();
  });

  test('should close modal when pressing Escape key', async ({ page }) => {
    // Open modal
    await page.locator('span.material-icons').filter({ hasText: 'folder_open' }).first().click();
    
    // Wait for modal to be visible
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).toBeVisible();
    
    // Press Escape key
    await page.keyboard.press('Escape');
    
    // Verify modal is closed
    await expect(page.locator('.cdk-overlay-container em-config-file-modal')).not.toBeVisible();
  });
});
