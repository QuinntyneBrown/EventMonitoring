# Event Monitoring System - Quick Start Guide

Get up and running with the Event Monitoring System in 5 minutes.

---

## Step 1: Access the Application

Open your browser and navigate to the application URL.

```
http://localhost:4200
```

You'll see an empty dashboard with a header and sidebar.

---

## Step 2: Enable Edit Mode

Click the **Edit** button in the header to enter dashboard editing mode.

```
┌─────────────────────────────────────────────────────────────┐
│  Event Monitoring System                    [LIVE] [Edit ✓] │
└─────────────────────────────────────────────────────────────┘
```

The sidebar will now show the **Tile Palette**.

---

## Step 3: Add the Telemetry State Tile

In the sidebar tile palette, click **Telemetry State**.

This tile is required before adding other tiles.

```
TILE PALETTE
├── [+] Telemetry State  ← Click this first!
├── [ ] Graph            (disabled - requires Telemetry State)
└── [ ] Tabular          (disabled - requires Telemetry State)
```

---

## Step 4: Add Visualization Tiles

Now add tiles to display your telemetry data:

**For line charts:** Click **Graph**
**For data tables:** Click **Tabular**

Add as many as you need.

---

## Step 5: Exit Edit Mode

Click **Done** in the header to lock your layout.

---

## Step 6: Configure Your Tiles

1. Click the **📁 folder icon** on a Graph or Tabular tile
2. Select a configuration profile from the list:
   - Spacecraft Sensors (CPU, Memory, Fuel, Oxygen)
   - Navigation Systems (GPS, Altitude, Velocity)
   - Environmental Controls (Temperature, Pressure)
   - Power Systems (Battery, Solar Output)
   - And more...
3. Click **Apply**

Your tile will start showing live telemetry data!

---

## Step 7: Monitor Live Data

You're now monitoring live telemetry:

- **Green LIVE badge** = Receiving real-time data
- **Data updates every 200ms** (5 Hz)
- **All tiles sync** to the same data stream

---

## Bonus: Review Historical Data

To review past telemetry:

1. Click the **History** button on the Telemetry State tile
2. Select a time range
3. Click **Load**
4. Use playback controls:
   - ▶ Play
   - ⏸ Pause
   - ⏪ Rewind
   - ⏩ Forward

To return to live monitoring, click the **REVIEW** badge.

---

## Quick Reference

| Action | How To |
|--------|--------|
| Add tiles | Edit → Click tile in palette |
| Remove tiles | Edit → Click X on tile |
| Move tiles | Edit → Drag tile header |
| Configure tile | Click folder icon |
| View history | Click History button |
| Return to live | Click REVIEW badge |

---

## Common Starting Layouts

### Basic Monitoring
```
┌─────────────────────────────────────────────────┐
│          Telemetry State (4 cols)               │
├─────────────────────┬───────────────────────────┤
│   Graph (6 cols)    │    Tabular (6 cols)       │
│   Spacecraft        │    Environmental          │
│   Sensors           │    Controls               │
└─────────────────────┴───────────────────────────┘
```

### Comprehensive Dashboard
```
┌─────────────────────────────────────────────────┐
│          Telemetry State (12 cols)              │
├─────────────────────┬───────────────────────────┤
│ Graph - Navigation  │  Graph - Power Systems    │
├─────────────────────┼───────────────────────────┤
│ Tabular - Sensors   │  Tabular - Environmental  │
└─────────────────────┴───────────────────────────┘
```

---

## Need Help?

- Full documentation: [README.md](README.md)
- Troubleshooting: [troubleshooting.md](troubleshooting.md)
- System administrator contact information

---

*You're ready to start monitoring!*
