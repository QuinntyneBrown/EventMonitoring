# Event Monitoring System - Frequently Asked Questions (FAQ)

---

## General Questions

### What is the Event Monitoring System?

The Event Monitoring System is a real-time spacecraft telemetry monitoring dashboard. It allows mission control personnel to:
- Monitor live telemetry data from spacecraft systems
- Review historical telemetry data
- Customize dashboard layouts with various visualization tiles
- Configure metric subscriptions using pre-built profiles

### Who should use this system?

- **Mission Controllers** - Primary users for real-time monitoring
- **Flight Directors** - Overview of spacecraft status
- **Engineers** - Detailed analysis of specific subsystems
- **Analysts** - Historical data review and trend analysis

### What browsers are supported?

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Edge | 90+ |
| Safari | 14+ |

Internet Explorer is **not supported**.

### Can I use this on mobile devices?

The system is designed primarily for desktop use. While the responsive layout adapts to smaller screens, the full functionality is best experienced on screens 1280px or wider.

---

## Dashboard Questions

### How do I add tiles to my dashboard?

1. Click the **Edit** button in the header
2. Look at the sidebar - you'll see the **Tile Palette**
3. Click on the tile you want to add
4. The tile will appear on your dashboard
5. Click **Done** when finished

### Why can't I add a Graph or Tabular tile?

Graph and Tabular tiles require the **Telemetry State** tile to be present first. Add the Telemetry State tile, then you can add other tiles.

### Why is the Telemetry State tile grayed out?

You can only have **one** Telemetry State tile on your dashboard. If you already have one, the option to add another will be disabled.

### How do I remove a tile?

1. Enable **Edit Mode** (click Edit button)
2. Click the **X** button in the tile's header
3. The tile will be removed

### Can I resize tiles?

Yes! In Edit Mode:
1. Hover over the edge or corner of a tile
2. Click and drag to resize
3. Release to confirm the new size

Note: Tiles have minimum sizes and cannot be made smaller than 3 columns x 2 rows.

### Will my dashboard layout be saved?

Currently, the dashboard layout is stored in your browser's local storage. If you clear your browser data or use a different browser/device, you'll need to recreate your layout.

### How do I reset my dashboard to default?

1. Open browser Developer Tools (F12)
2. Go to Application tab → Local Storage
3. Clear the site data
4. Refresh the page

---

## Live Monitoring Questions

### What does "LIVE" mode mean?

In LIVE mode, your dashboard is receiving real-time telemetry data from spacecraft systems. Data updates every 200 milliseconds (5 times per second).

### Why isn't my tile showing any data?

Check these things:
1. Is the mode indicator showing "LIVE"?
2. Is the Telemetry State tile showing "OK" status?
3. Have you applied a configuration profile to the tile?

If all these are correct and you still see no data, contact your system administrator.

### What do the status badges mean?

| Badge | Color | Meaning |
|-------|-------|---------|
| OK | Green | Value is within normal operating range |
| Warning | Yellow | Value is approaching operational limits |
| Critical | Red | Value is outside safe operating range |

### How fast does the data update?

Live telemetry updates at **5 Hz** (every 200 milliseconds). This is configurable by administrators.

### Can I change the update rate?

The update rate is configured at the system level by administrators. Individual users cannot change it.

---

## Historical Data Questions

### How do I view historical data?

1. Ensure you have a **Telemetry State** tile on your dashboard
2. Click the **History** button (clock icon)
3. Select a time range
4. Click **Load**
5. Use playback controls to navigate through the data

### How far back can I view historical data?

This depends on your system's data retention policy. By default, 90 days of historical data is available. Contact your administrator for specifics.

### Why is historical data loading slowly?

Large time ranges with lots of data may take longer to load. Try:
- Selecting a smaller time range
- Being patient during peak usage times
- Contacting your administrator if consistently slow

### Can I export historical data?

Currently, data export is not available through the user interface. Contact your administrator for data export requests.

### What do the playback speed options mean?

| Speed | Description |
|-------|-------------|
| 0.5x | Half speed - good for detailed analysis |
| 1x | Real-time speed |
| 2x | Double speed |
| 4x | Four times speed |
| 8x | Eight times speed - good for quick review |

### How do I return to live monitoring?

Click on the **REVIEW** badge in the header, or click the **Live** button in the Telemetry State tile. Your dashboard will switch back to receiving real-time data.

---

## Configuration Questions

### What are configuration profiles?

Configuration profiles are pre-defined collections of telemetry metrics grouped by spacecraft system. They make it easy to quickly set up tiles to monitor specific subsystems.

### What configuration profiles are available?

| Profile | Metrics |
|---------|---------|
| Spacecraft Sensors | CPU, Memory, Fuel, Oxygen |
| Navigation Systems | GPS, Altitude, Velocity, Heading |
| Environmental Controls | Temperature, Pressure, Humidity |
| Power Systems | Battery, Solar Output, Consumption |
| Propulsion Systems | Thruster Temp, Fuel Pressure |
| Communication Systems | Signal Strength, Antenna |
| Science Instruments | Radiation, Scan Results |
| Structural Monitoring | Hull Integrity, Vibration |
| Crew Systems | Life Support, Crew Count |
| Mission Parameters | Mission Time, Distance |

### How do I apply a configuration profile?

1. Click the **folder icon** (📁) on a Graph or Tabular tile
2. Browse or search for a profile
3. Click to select it
4. Click **Apply**

### Can I create my own configuration profiles?

Custom profile creation is not available through the user interface. Contact your administrator to request new profiles.

### Can I apply the same profile to multiple tiles?

Yes! You can apply the same configuration profile to multiple tiles. This is useful for seeing the same data in different formats (graph vs. table).

---

## Troubleshooting Questions

### The page won't load. What should I do?

1. Try refreshing the page (F5 or Ctrl+R)
2. Try a hard refresh (Ctrl+Shift+R)
3. Clear your browser cache
4. Try a different browser
5. Contact your administrator if the issue persists

### I see a "Connection Error" message. What does this mean?

This means the application cannot connect to the telemetry streaming service. Possible causes:
- Network connectivity issues
- Service maintenance
- Server problems

Try refreshing the page. If the issue persists, contact your administrator.

### My tiles are overlapping or misaligned. How do I fix this?

1. Enter Edit Mode
2. Try repositioning the tiles manually
3. If that doesn't work, remove and re-add the tiles
4. As a last resort, clear local storage and rebuild your dashboard

### Why can't I see any configuration profiles?

This could indicate the Configuration Service is unavailable. Contact your administrator to check the service status.

### The playback controls aren't working. What's wrong?

Ensure that:
1. You're in **REVIEW** mode (not LIVE mode)
2. Historical data has been successfully loaded
3. The time range contains actual data

Try loading historical data again with a different time range.

### Why does my session expire?

For security reasons, sessions may expire after periods of inactivity. Simply refresh the page to start a new session.

---

## Technical Questions

### What is SignalR?

SignalR is the technology used to stream real-time telemetry data to your browser. It maintains a persistent connection that allows instant data updates without constantly refreshing the page.

### Does this work offline?

No, the Event Monitoring System requires a constant network connection to receive telemetry data and communicate with backend services.

### How much bandwidth does this use?

With typical usage (5 Hz updates, 10-20 metrics), expect approximately 50-100 KB/s of network traffic.

### Can I use keyboard shortcuts?

Yes! The following keyboard shortcuts are available:

| Shortcut | Action |
|----------|--------|
| Space | Play/Pause (Review mode) |
| ← | Rewind 10 seconds |
| → | Forward 10 seconds |
| Home | Jump to start |
| End | Jump to end |
| E | Toggle Edit mode |

### Is my data secure?

The application communicates over HTTP/HTTPS with the backend services. For production deployments, HTTPS is recommended. Data is not stored locally except for dashboard layout preferences.

---

## Getting Help

### Where can I find more documentation?

- **User Guide**: [README.md](README.md)
- **Quick Start**: [quick-start.md](quick-start.md)
- **Troubleshooting**: [troubleshooting.md](troubleshooting.md)
- **Administrator Guide**: [administrator-guide.md](administrator-guide.md)

### How do I report a bug?

Contact your system administrator with:
- Description of the issue
- Steps to reproduce
- Screenshots if possible
- Browser and version information

### How do I request a new feature?

Submit feature requests to your system administrator or team lead. Include:
- Description of the desired feature
- Use case / why it would be helpful
- Any mock-ups or examples

---

## Quick Tips

1. **Start with Telemetry State** - Always add this tile first
2. **Use configuration profiles** - They're faster than configuring from scratch
3. **Check the mode indicator** - Make sure you're in the mode you expect
4. **Refresh when in doubt** - Many issues are resolved by refreshing
5. **Keep tiles focused** - Too many metrics on one tile can be overwhelming
6. **Use keyboard shortcuts** - They're faster once you learn them

---

*Can't find your question? Contact your system administrator.*
