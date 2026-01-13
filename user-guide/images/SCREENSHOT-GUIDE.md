# Screenshot Guide

This document describes the screenshots needed for the user guide documentation.
Capture these screenshots from a running instance of the Event Monitoring System.

## Required Screenshots

### 1. main-interface.png
**Description:** Main application interface overview
**Capture Instructions:**
- Full browser window screenshot
- Dashboard with Telemetry State, Graph, and Tabular tiles visible
- LIVE mode active
- Sidebar visible (collapsed or expanded)

**Annotations to add:**
- Label the header area
- Label the sidebar
- Label the dashboard grid area
- Label individual tiles

---

### 2. header-bar.png
**Description:** Application header close-up
**Capture Instructions:**
- Crop to show only the header bar
- Include: Logo, title, mode indicator, Edit button
- LIVE mode indicator should be green

**Annotations to add:**
- Label each button and indicator

---

### 3. telemetry-state-tile.png
**Description:** Telemetry State tile in LIVE mode
**Capture Instructions:**
- Close-up of Telemetry State tile
- Show: Mode status, statistics, info banner
- Status should show "OK" with active connections

**Annotations to add:**
- Label statistics section
- Label mode indicator
- Label action buttons

---

### 4. graph-tile.png
**Description:** Graph tile with live data
**Capture Instructions:**
- Graph tile showing multiple metrics
- Line chart with visible data points
- Legend showing metric names
- Configuration icon visible in header

**Annotations to add:**
- Label chart area
- Label legend
- Label configuration button

---

### 5. tabular-tile.png
**Description:** Tabular tile with data
**Capture Instructions:**
- Tabular tile with multiple rows of data
- Show various status badges (OK, Warning, Critical)
- Include column headers visible
- Timestamps showing recent data

**Annotations to add:**
- Label columns (Parameter, Value, Status, Time)
- Highlight status badge colors

---

### 6. tile-palette.png
**Description:** Sidebar tile palette in edit mode
**Capture Instructions:**
- Enable Edit mode
- Show sidebar with tile palette
- Include at least one disabled tile with reason tooltip

**Annotations to add:**
- Label each tile option
- Show constraint message

---

### 7. drag-drop.png
**Description:** Tile being repositioned
**Capture Instructions:**
- Edit mode active
- Capture during drag operation (tile being moved)
- Show drop zone indicator if visible
- Other tiles visible for context

**Annotations to add:**
- Arrow showing movement direction
- Label source and destination positions

---

### 8. load-historical.png
**Description:** Historical data loading interface
**Capture Instructions:**
- Click History button to show time range selector
- Include time range input fields
- Show Load button
- Telemetry State tile in background

**Annotations to add:**
- Label time range fields
- Label Load button

---

### 9. playback-controls.png
**Description:** Playback controls in REVIEW mode
**Capture Instructions:**
- Telemetry State tile in REVIEW mode
- All playback controls visible
- Timeline with progress indicator
- Speed dropdown visible (expanded if possible)

**Annotations to add:**
- Label each control button
- Label timeline
- Label speed selector

---

### 10. config-modal.png
**Description:** Configuration file selection modal
**Capture Instructions:**
- Open configuration modal (click folder icon)
- Show search bar
- Show list of configuration files
- One file should be selected/highlighted
- Apply and Cancel buttons visible

**Annotations to add:**
- Label search bar
- Label file list
- Label selected file
- Label action buttons

---

### 11. multi-metric-graph.png
**Description:** Graph with multiple data series
**Capture Instructions:**
- Graph tile with 3-4 different metrics
- Different colored lines for each series
- Legend clearly showing metric names
- Y-axis showing scale

**Annotations to add:**
- Label each series in legend
- Show data point values (hover state if possible)

---

## Screenshot Standards

### Resolution
- Minimum: 1280x720
- Preferred: 1920x1080
- Retina/HiDPI: Capture at 2x for crisp display

### Format
- PNG format (lossless)
- File names exactly as specified above
- No spaces in filenames

### Browser Settings
- Hide bookmarks bar
- Hide developer tools
- Use default zoom (100%)
- Clear any browser chrome if possible

### Annotation Style
- Red circles/boxes for highlighting
- White text with dark outline for labels
- Arrows in red or contrasting color
- Consistent font size across all screenshots

### Dark Theme
- Application uses dark theme by default
- Ensure screenshots reflect actual application appearance

---

## Animated GIFs (Optional)

Consider creating animated GIFs for:

1. **adding-tile.gif** - Process of adding a tile from palette
2. **drag-resize.gif** - Dragging and resizing a tile
3. **playback-demo.gif** - Using playback controls
4. **config-flow.gif** - Opening modal, searching, applying config

**Tools for creating GIFs:**
- LICEcap (Windows/Mac)
- Peek (Linux)
- ScreenToGif (Windows)
- Kap (Mac)

---

## Checklist

Use this checklist when capturing screenshots:

```
□ Application running with sample data
□ Browser window sized consistently
□ No personal/sensitive data visible
□ Dark theme active
□ All tiles properly configured
□ Screenshots at correct resolution
□ File names match exactly
□ PNG format used
□ Annotations added where specified
□ All required screenshots captured
```

---

*After capturing screenshots, place them in this /images/ directory.*
