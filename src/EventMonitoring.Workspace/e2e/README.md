# E2E Tests

This directory contains end-to-end tests for the Event Monitoring application using Playwright.

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug
```

## Test Structure

- `fixtures.ts` - Test fixtures and mock setup for HTTP/WebSocket APIs
- `dashboard.spec.ts` - Tests for dashboard in live and edit modes
- `config-modal.spec.ts` - Tests for configuration file modal
- `telemetry-state-tile.spec.ts` - Tests for telemetry state tile functionality
- `workflow.spec.ts` - End-to-end workflow tests

## Test Coverage

The E2E tests cover:

### Dashboard Functionality (REQ-DASH-*)
- ✅ Adding tiles in edit mode
- ✅ Removing tiles in edit mode
- ✅ Tile constraints (telemetry state required, single instance rules)
- ✅ Multiple tile instances for graph and tabular tiles
- ✅ Edit mode toggle and UI changes

### Configuration Modal (REQ-MODAL-*)
- ✅ Opening configuration modal from tiles
- ✅ Displaying available configuration files
- ✅ Searching configuration files
- ✅ Selecting and applying configuration

### Telemetry State Tile (REQ-TSTATE-*)
- ✅ Live mode display
- ✅ Connection status indicators
- ✅ Play/pause controls
- ✅ Loading historical data
- ✅ Playback speed controls (review mode)

### Complete Workflows
- ✅ Full dashboard setup workflow
- ✅ Tile removal and state management
- ✅ Mode switching and persistence

## Mocking Strategy

Tests use mocked HTTP and WebSocket interfaces to ensure:
- Tests run without requiring backend services
- Tests are fast and reliable
- Tests are deterministic and reproducible

Mocks are configured in `fixtures.ts` and automatically applied to all tests.

## Requirements Mapping

These tests satisfy **REQ-TEST-006**: Playwright tests for all behaviors with HTTP interface and WebSocket interface mocked out.
