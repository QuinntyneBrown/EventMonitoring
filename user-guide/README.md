# Event Monitoring System - User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Dashboard Overview](#dashboard-overview)
4. [Working with Tiles](#working-with-tiles)
5. [Live Telemetry Monitoring](#live-telemetry-monitoring)
6. [Historical Data Review](#historical-data-review)
7. [Configuration Profiles](#configuration-profiles)
8. [Advanced Features](#advanced-features)
9. [Troubleshooting](#troubleshooting)
10. [Appendix](#appendix)

---

## Introduction

### What is Event Monitoring System?

The Event Monitoring System is a real-time spacecraft telemetry monitoring dashboard application designed for mission control personnel. It provides:

- **Live telemetry streaming** from spacecraft systems at 5 Hz (updates every 200ms)
- **Historical data playback** with timeline scrubbing and variable speed controls
- **Configurable dashboard tiles** with drag-and-drop layout management
- **Multiple visualization types** including graphs, tables, and state monitoring
- **Seamless mode switching** between live monitoring and historical review

### Key Features

| Feature | Description |
|---------|-------------|
| Real-time Monitoring | View live telemetry data as it streams from spacecraft systems |
| Historical Playback | Review past telemetry data with full playback controls |
| Customizable Dashboard | Add, remove, and arrange tiles to create your ideal monitoring layout |
| Multiple Visualizations | Choose from graphs, tables, or state displays for different data types |
| Configuration Profiles | Quickly load pre-configured metric groups for common monitoring scenarios |

### System Requirements

- **Browser**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **Screen Resolution**: Minimum 1280x720 (1920x1080 recommended)
- **Network**: Stable connection to the API gateway
- **JavaScript**: Must be enabled

---

## Getting Started

### Accessing the Application

1. Open your web browser
2. Navigate to the application URL (typically `http://localhost:4200` for local development)
3. The dashboard will load automatically

### First-Time Setup

When you first access the Event Monitoring System, you'll see an empty dashboard. Here's how to get started:

1. **Enable Edit Mode** - Click the "Edit" button in the header
2. **Add Telemetry State Tile** - This is required before adding other tiles
3. **Add Visualization Tiles** - Add graph or tabular tiles as needed
4. **Configure Tiles** - Apply configuration profiles to display specific metrics
5. **Exit Edit Mode** - Click "Done" to lock your layout

### Understanding the Interface

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo]  Event Monitoring System           [LIVE] [Edit] [Settings]│
├─────────────┬───────────────────────────────────────────────────────┤
│             │                                                       │
│   SIDEBAR   │              MAIN DASHBOARD AREA                      │
│             │                                                       │
│  Navigation │     ┌─────────────┐  ┌─────────────┐                  │
│             │     │  Tile 1     │  │  Tile 2     │                  │
│  ─────────  │     │             │  │             │                  │
│             │     └─────────────┘  └─────────────┘                  │
│  Tile       │                                                       │
│  Palette    │     ┌─────────────────────────────┐                   │
│  (Edit Mode)│     │         Tile 3              │                   │
│             │     │                             │                   │
│             │     └─────────────────────────────┘                   │
│             │                                                       │
└─────────────┴───────────────────────────────────────────────────────┘
```

**Screenshot: Main Application Interface**
![Main Interface](images/main-interface.png)
*The main application interface showing the header, sidebar, and dashboard area*

---

## Dashboard Overview

### Header Components

The header bar contains essential controls and information:

| Component | Location | Description |
|-----------|----------|-------------|
| Application Logo | Left | Identifies the Event Monitoring System |
| Mode Indicator | Center-Right | Shows current mode (LIVE or REVIEW) |
| Edit Button | Right | Toggles edit mode for dashboard customization |
| Settings Button | Far Right | Access application settings |

**Screenshot: Header Bar**
![Header Bar](images/header-bar.png)
*Header showing Live mode indicator and control buttons*

### Mode Indicator

The mode indicator displays the current operating mode:

- **LIVE** (Green) - Receiving real-time telemetry data
- **REVIEW** (Purple) - Viewing historical telemetry data

Click on the mode indicator when in REVIEW mode to return to LIVE mode.

### Sidebar

The sidebar provides navigation and tile management:

**In Normal Mode:**
- Dashboard navigation
- Quick access links
- System status

**In Edit Mode:**
- Tile palette showing available tile types
- Visual indicators for tile constraints
- Disabled tiles with explanation tooltips

### Dashboard Grid

The main dashboard area uses a 12-column responsive grid system:

- **Cell Height**: 60 pixels
- **Margins**: 16 pixels between tiles
- **Responsive**: Automatically adjusts to screen size

---

## Working with Tiles

### Tile Types

The Event Monitoring System offers three types of dashboard tiles:

#### 1. Telemetry State Tile

The central control tile for telemetry monitoring.

**Features:**
- Mode status display (LIVE/REVIEW)
- Connection statistics
- Playback controls (in REVIEW mode)
- Timeline scrubbing
- Speed adjustment
- Historical data loading

**Screenshot: Telemetry State Tile**
![Telemetry State Tile](images/telemetry-state-tile.png)
*Telemetry State Tile showing live mode with connection statistics*

**Note:** Only ONE Telemetry State Tile is allowed per dashboard.

#### 2. Graph Tile

Visualizes telemetry data as line charts.

**Features:**
- Smooth line interpolation
- Multi-series support (multiple metrics)
- 50-point sliding data window
- Dynamic Y-axis scaling
- Legend display
- Configuration action button

**Screenshot: Graph Tile**
![Graph Tile](images/graph-tile.png)
*Graph tile displaying CPU and Memory metrics over time*

#### 3. Tabular Tile

Displays telemetry data in table format.

**Features:**
- Parameter name column
- Current value with units
- Status badges (OK, Warning, Critical)
- Timestamps
- Configuration action button

**Screenshot: Tabular Tile**
![Tabular Tile](images/tabular-tile.png)
*Tabular tile showing environmental sensor readings with status indicators*

### Adding Tiles

1. Click the **Edit** button in the header to enable edit mode
2. In the sidebar, you'll see the **Tile Palette**
3. Click on the desired tile type to add it to the dashboard
4. The tile will be placed in the next available position

**Screenshot: Tile Palette**
![Tile Palette](images/tile-palette.png)
*Sidebar showing available tiles in edit mode*

### Tile Constraints

The system enforces certain constraints to ensure proper functionality:

| Constraint | Description |
|------------|-------------|
| Single Telemetry State | Only one Telemetry State tile can exist on the dashboard |
| Dependency Requirement | Graph and Tabular tiles require the Telemetry State tile to be present |

**When constraints are not met:**
- Disabled tiles appear grayed out in the palette
- Hover over disabled tiles to see the reason

**Example Constraint Messages:**
- "Only one instance allowed" - Telemetry State already exists
- "Requires Telemetry State tile" - Add Telemetry State first

### Removing Tiles

1. Enable **Edit Mode**
2. Click the **X** button in the tile header
3. Confirm removal if prompted

**Note:** Removing the Telemetry State tile when Graph or Tabular tiles exist will show a warning, as those tiles depend on it.

### Repositioning Tiles

1. Enable **Edit Mode**
2. Click and drag the tile header to move it
3. Drop the tile in the desired location
4. The grid will automatically adjust other tiles

**Screenshot: Drag and Drop**
![Drag and Drop](images/drag-drop.png)
*Tile being repositioned on the dashboard grid*

### Resizing Tiles

1. Enable **Edit Mode**
2. Hover over the tile edge or corner
3. Click and drag to resize
4. Release to confirm new size

**Minimum Sizes:**
- Telemetry State: 4 columns x 2 rows
- Graph: 3 columns x 2 rows
- Tabular: 3 columns x 2 rows

---

## Live Telemetry Monitoring

### Understanding Live Mode

In Live mode, the dashboard receives real-time telemetry data from spacecraft systems. Data updates occur at 5 Hz (every 200 milliseconds).

**Live Mode Indicators:**
- Green "LIVE" badge in header
- Info banner: "Receiving live telemetry data at 5 Hz..."
- Active connection status in Telemetry State tile

### Telemetry Statistics

The Telemetry State tile displays connection statistics:

| Statistic | Description |
|-----------|-------------|
| Update Rate | Current data refresh rate (e.g., 5 Hz) |
| Active Connections | Number of active data subscriptions |
| Message Rate | Messages received per second |
| Status | Connection health (OK, Warning, Error) |

### Subscribing to Metrics

Tiles can subscribe to specific telemetry metrics through configuration profiles:

1. Click the **folder icon** on a Graph or Tabular tile
2. Select a configuration profile (see [Configuration Profiles](#configuration-profiles))
3. The tile will begin displaying the selected metrics

### Data Flow

```
Spacecraft Systems
       │
       ▼
Telemetry Streaming Service (SignalR)
       │
       ▼
API Gateway
       │
       ▼
Frontend (Dashboard)
       │
       ├──► Telemetry State Tile (Statistics)
       ├──► Graph Tiles (Visualization)
       └──► Tabular Tiles (Data Display)
```

---

## Historical Data Review

### Entering Review Mode

To review historical telemetry data:

1. Ensure the **Telemetry State tile** is on your dashboard
2. Click the **History** button (clock icon) on the Telemetry State tile
3. Select a time range for historical data
4. Click **Load** to fetch the data

**Screenshot: Load Historical Data**
![Load Historical Data](images/load-historical.png)
*Historical data loading interface with time range selection*

### Review Mode Interface

When historical data is loaded:

- Mode indicator changes to "REVIEW" (purple)
- Playback controls become available
- Timeline shows data range and current position
- Info banner: "Viewing historical data from [start] to [end]"

### Playback Controls

**Screenshot: Playback Controls**
![Playback Controls](images/playback-controls.png)
*Telemetry State tile showing playback controls in Review mode*

| Control | Icon | Function |
|---------|------|----------|
| Play/Pause | ▶/⏸ | Start or pause playback |
| Skip Backward | ⏮ | Jump to beginning |
| Rewind | ⏪ | Skip backward (10 seconds) |
| Forward | ⏩ | Skip forward (10 seconds) |
| Skip Forward | ⏭ | Jump to end |

### Timeline Scrubbing

The timeline bar allows precise navigation through historical data:

1. **Click** anywhere on the timeline to jump to that point
2. **Drag** the playhead to scrub through data
3. **Hover** to see the timestamp at that position

**Timeline Components:**
```
[Start Time]━━━━━━━●━━━━━━━━━━━━━━[End Time]
                   ↑
            Current Position
```

### Playback Speed

Adjust playback speed using the speed dropdown:

| Speed | Description |
|-------|-------------|
| 0.5x | Half speed (slow motion) |
| 1x | Real-time playback |
| 2x | Double speed |
| 4x | Quadruple speed |
| 8x | Maximum speed |

### Returning to Live Mode

To exit Review mode and return to Live monitoring:

1. Click the **REVIEW** mode indicator in the header
2. Or click the **Live** button in the Telemetry State tile

All tiles will resume displaying real-time data.

---

## Configuration Profiles

### What are Configuration Profiles?

Configuration profiles are pre-defined collections of telemetry metrics grouped by spacecraft system or function. They allow quick setup of tiles to monitor specific subsystems.

### Available Profiles

| Profile | Metrics Included |
|---------|-----------------|
| **Spacecraft Sensors** | CPU usage, Memory usage, Fuel level, Oxygen level |
| **Navigation Systems** | GPS coordinates, Altitude, Velocity, Heading |
| **Environmental Controls** | Temperature, Pressure, Humidity, CO2 levels |
| **Power Systems** | Battery level, Solar panel output, Power consumption |
| **Propulsion Systems** | Thruster temperature, Fuel pressure, Acceleration |
| **Communication Systems** | Signal strength, Antenna position, Data rate |
| **Science Instruments** | Radiation levels, Sensor readings, Scan results |
| **Structural Monitoring** | Hull integrity, Vibration levels, Stress readings |
| **Crew Systems** | Life support status, Crew count, Medical alerts |
| **Mission Parameters** | Mission elapsed time, Distance traveled, System uptime |

### Applying a Configuration Profile

1. Click the **folder icon** (📁) on a Graph or Tabular tile
2. The Configuration Modal will open

**Screenshot: Configuration Modal**
![Configuration Modal](images/config-modal.png)
*Configuration file selection modal showing available profiles*

3. **Browse** available profiles in the list
4. **Search** for a specific profile using the search bar
5. **Select** the desired profile (highlighted)
6. Click **Apply** to load the configuration

### Configuration Modal Features

| Feature | Description |
|---------|-------------|
| Search Bar | Filter profiles by name or path |
| Profile List | Shows all available configurations |
| Item Count | Number of metrics in each profile |
| Last Modified | When the profile was last updated |
| Apply Button | Applies selected configuration |
| Cancel Button | Closes modal without changes |

### Multiple Tiles with Same Profile

You can apply the same configuration profile to multiple tiles:
- Graph tiles will show line charts of the metrics
- Tabular tiles will show a data table of the metrics

This allows comparing visualizations for the same data.

---

## Advanced Features

### Multi-Metric Graphs

Graph tiles can display multiple metrics simultaneously:

1. Apply a configuration profile with multiple metrics
2. Each metric appears as a separate line series
3. Use the legend to identify each metric
4. Hover over data points for exact values

**Screenshot: Multi-Metric Graph**
![Multi-Metric Graph](images/multi-metric-graph.png)
*Graph showing multiple telemetry metrics with legend*

### Status Badges

Tabular tiles display status badges based on metric values:

| Badge | Color | Meaning |
|-------|-------|---------|
| OK | Green | Value within normal range |
| Warning | Yellow | Value approaching limits |
| Critical | Red | Value outside safe range |

### Responsive Layout

The dashboard automatically adjusts to different screen sizes:

| Screen Size | Columns | Behavior |
|-------------|---------|----------|
| Desktop (1280px+) | 12 | Full grid layout |
| Tablet (960-1279px) | 8 | Compressed layout |
| Mobile (600-959px) | 4 | Stacked layout |
| Small Mobile (<600px) | 2 | Minimal layout |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Play/Pause (when in Review mode) |
| `←` | Rewind 10 seconds |
| `→` | Forward 10 seconds |
| `Home` | Jump to start |
| `End` | Jump to end |
| `E` | Toggle Edit mode |

---

## Troubleshooting

### Common Issues and Solutions

#### Dashboard Won't Load

**Symptoms:**
- Blank screen
- Loading spinner never completes
- Error message displayed

**Solutions:**
1. Check your internet connection
2. Clear browser cache and reload
3. Verify the API gateway is running
4. Check browser console for errors (F12 → Console)

#### No Live Data Appearing

**Symptoms:**
- Tiles show "No data" or empty
- Connection status shows "Error"
- Update rate shows 0 Hz

**Solutions:**
1. Verify you're in LIVE mode (green indicator)
2. Check that Telemetry State tile exists
3. Ensure tiles have configuration profiles applied
4. Verify the Telemetry Streaming service is running

#### Historical Data Not Loading

**Symptoms:**
- "No historical data available" message
- Loading never completes
- Empty timeline

**Solutions:**
1. Verify the selected time range contains data
2. Check Historical Telemetry service is running
3. Ensure you have network connectivity
4. Try a smaller time range

#### Tiles Cannot Be Added

**Symptoms:**
- Tile appears grayed out in palette
- "Cannot add tile" message

**Solutions:**
1. Check if Telemetry State tile exists (required for others)
2. Verify only one Telemetry State tile is present
3. Enable Edit mode before adding tiles

#### Playback Controls Not Responding

**Symptoms:**
- Play button doesn't start playback
- Speed changes have no effect
- Timeline doesn't update

**Solutions:**
1. Ensure historical data is loaded
2. Verify you're in REVIEW mode
3. Check that data exists for the time range
4. Try reloading the historical data

#### Graph Not Updating

**Symptoms:**
- Graph shows static data
- New data points not appearing
- Flatline display

**Solutions:**
1. Check LIVE mode is active
2. Verify the configuration profile is applied
3. Ensure metric subscriptions are active
4. Check network connectivity

### Connection Status Indicators

| Status | Meaning | Action |
|--------|---------|--------|
| Connecting | Establishing connection | Wait for connection |
| OK | Connected and receiving data | Normal operation |
| Warning | Intermittent connectivity | Check network |
| Error | Connection failed | See troubleshooting steps |

### Browser Developer Tools

For advanced troubleshooting:

1. Open Developer Tools (F12)
2. Check the **Console** tab for JavaScript errors
3. Check the **Network** tab for failed requests
4. Look for WebSocket connection issues
5. Verify API responses in network requests

### Reporting Issues

If problems persist:

1. Document the issue with screenshots
2. Note the browser version and operating system
3. Capture console errors if present
4. Contact system administrator with details

---

## Appendix

### Telemetry Metrics Reference

#### Spacecraft Sensors
| Metric | Unit | Normal Range |
|--------|------|--------------|
| CPU Usage | % | 0-80 |
| Memory Usage | % | 0-85 |
| Fuel Level | % | 20-100 |
| Oxygen Level | % | 19-23 |

#### Navigation Systems
| Metric | Unit | Normal Range |
|--------|------|--------------|
| GPS Latitude | degrees | -90 to 90 |
| GPS Longitude | degrees | -180 to 180 |
| Altitude | km | 200-400 |
| Velocity | km/s | 7.5-8.0 |

#### Environmental Controls
| Metric | Unit | Normal Range |
|--------|------|--------------|
| Temperature | °C | 18-25 |
| Pressure | kPa | 98-102 |
| Humidity | % | 30-60 |
| CO2 Level | ppm | 0-1000 |

#### Power Systems
| Metric | Unit | Normal Range |
|--------|------|--------------|
| Battery Level | % | 20-100 |
| Solar Output | kW | 0-15 |
| Power Consumption | kW | 2-10 |

### API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/configuration/file` | GET | List all configuration files |
| `/api/configuration/file/{id}` | GET | Get specific configuration |
| `/api/historical-telemetry` | GET | Query historical data |
| `/telemetry` | WebSocket | Real-time telemetry stream |

### Glossary

| Term | Definition |
|------|------------|
| **Telemetry** | Automated measurement and transmission of data from remote sources |
| **Tile** | A dashboard widget displaying specific information |
| **Live Mode** | Real-time data streaming mode |
| **Review Mode** | Historical data playback mode |
| **Configuration Profile** | Pre-defined collection of metrics |
| **SignalR** | Real-time web communication technology |
| **Playhead** | Current position indicator on timeline |
| **Scrubbing** | Manually moving through timeline data |

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Initial Release | Core dashboard functionality |
| 1.1.0 | Feature Update | Historical playback, configuration profiles |
| 1.2.0 | Enhancement | Improved grid layout, responsive design |

---

## Quick Reference Card

### Essential Actions

```
┌────────────────────────────────────────────────────────────────┐
│                    QUICK REFERENCE                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ADD TILES:         Click Edit → Select tile from palette     │
│  REMOVE TILES:      Edit mode → Click X on tile               │
│  MOVE TILES:        Edit mode → Drag tile header              │
│  RESIZE TILES:      Edit mode → Drag tile edges               │
│                                                                │
│  CONFIGURE TILE:    Click folder icon → Select profile        │
│                                                                │
│  REVIEW HISTORY:    Click History → Select range → Load       │
│  RETURN TO LIVE:    Click REVIEW badge or Live button         │
│                                                                │
│  PLAYBACK:          ▶ Play  ⏸ Pause  ⏪ Rewind  ⏩ Forward    │
│  SPEED:             Use dropdown: 0.5x, 1x, 2x, 4x, 8x        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

*Event Monitoring System User Guide - Version 1.0*
*For support, contact your system administrator*
