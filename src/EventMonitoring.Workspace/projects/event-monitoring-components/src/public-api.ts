/*
 * Public API Surface of event-monitoring-components
 */

// Design Tokens
export * from './lib/tokens/design-tokens';

// UI Components
export * from './lib/ui/button/button.component';
export * from './lib/ui/status-badge/status-badge.component';
export * from './lib/ui/mode-indicator/mode-indicator.component';
export * from './lib/ui/info-box/info-box.component';
export * from './lib/ui/search-bar/search-bar.component';

// Layout Components
export * from './lib/layout/content/content.component';
export * from './lib/layout/sidenav/sidenav.component';
export * from './lib/layout/header/header.component';
export * from './lib/layout/main-layout/main-layout.component';

// Dashboard Components
export * from './lib/dashboard/tile-header/tile-header.component';
export * from './lib/dashboard/tile/tile.component';
export * from './lib/dashboard/tile-placeholder/tile-placeholder.component';
export * from './lib/dashboard/dashboard-grid/dashboard-grid.component';

// Modal Components
export * from './lib/modal/modal-overlay/modal-overlay.component';
export * from './lib/modal/config-file-modal/config-file-modal.component';
export * from './lib/modal/historical-request-modal/historical-request-modal.component';

// Specialized Tile Components
export * from './lib/tiles/tabular-tile/tabular-tile.component';
export * from './lib/tiles/graph-tile/graph-tile.component';
export * from './lib/tiles/telemetry-state-tile/telemetry-state-tile.component';

// Services
export * from './lib/services/theme.service';
export * from './lib/services/modal.service';

// Legacy placeholder (to be removed)
// export * from './lib/event-monitoring-components';
