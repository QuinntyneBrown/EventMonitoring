# Event Monitoring System - Troubleshooting Guide

This guide provides detailed solutions for common issues encountered while using the Event Monitoring System.

---

## Table of Contents

1. [Connection Issues](#connection-issues)
2. [Dashboard Problems](#dashboard-problems)
3. [Tile Issues](#tile-issues)
4. [Playback Problems](#playback-problems)
5. [Performance Issues](#performance-issues)
6. [Configuration Problems](#configuration-problems)
7. [Browser-Specific Issues](#browser-specific-issues)
8. [Service Status Verification](#service-status-verification)
9. [Log Analysis](#log-analysis)
10. [Escalation Procedures](#escalation-procedures)

---

## Connection Issues

### Issue: "Connection Failed" Error

**Symptoms:**
- Red "Error" status in Telemetry State tile
- "Unable to connect to telemetry service" message
- No data appearing in any tiles

**Diagnostic Steps:**

1. **Check Network Connectivity**
   ```
   Open browser DevTools (F12) → Network tab → Look for failed WebSocket connections
   ```

2. **Verify Service Status**
   - API Gateway should be running on port 5000
   - Telemetry Streaming service on port 5003

3. **Check Console for Errors**
   ```
   F12 → Console tab → Look for connection errors
   ```

**Solutions:**

| Cause | Solution |
|-------|----------|
| Services not running | Contact system administrator to restart services |
| Network firewall | Verify WebSocket connections (port 5003) are allowed |
| Proxy interference | Configure proxy to allow WebSocket upgrades |
| Browser extensions | Temporarily disable ad blockers/security extensions |

### Issue: Intermittent Connection Drops

**Symptoms:**
- Data stops updating periodically
- Status flashes between "OK" and "Warning"
- Reconnection messages appear

**Solutions:**

1. **Stable Network Connection**
   - Use wired connection if possible
   - Check WiFi signal strength
   - Avoid network congestion periods

2. **Browser Resources**
   - Close unnecessary tabs
   - Check available RAM
   - Restart browser if memory usage is high

3. **Keep Application Tab Active**
   - Some browsers throttle background tabs
   - Keep Event Monitoring as active tab

### Issue: WebSocket Blocked

**Symptoms:**
- Connection never establishes
- Console shows "WebSocket connection to 'ws://...' failed"

**Solutions:**

1. **Corporate Proxy Configuration**
   ```
   Contact IT to whitelist WebSocket connections to:
   - ws://[server]:5003/telemetry
   - wss://[server]:5003/telemetry (if using HTTPS)
   ```

2. **Browser Security Settings**
   - Ensure mixed content is not blocked
   - Add application URL to trusted sites

---

## Dashboard Problems

### Issue: Dashboard Shows Blank/Empty

**Symptoms:**
- White screen after loading
- No tiles visible
- Header loads but content area is empty

**Diagnostic Steps:**

1. **Check JavaScript Errors**
   ```
   F12 → Console → Look for red error messages
   ```

2. **Verify Application Load**
   ```
   F12 → Network → Check if main.js loaded successfully
   ```

**Solutions:**

| Cause | Solution |
|-------|----------|
| JavaScript error | Clear cache and hard refresh (Ctrl+Shift+R) |
| Cache corruption | Clear browser cache completely |
| Incompatible browser | Upgrade to supported browser version |
| Missing dependencies | Contact administrator to verify deployment |

### Issue: Dashboard Layout Corrupted

**Symptoms:**
- Tiles overlapping incorrectly
- Layout doesn't match saved configuration
- Tiles appearing in wrong positions

**Solutions:**

1. **Reset Layout**
   - Enter Edit mode
   - Remove all tiles
   - Re-add tiles in desired order

2. **Clear Local Storage**
   ```
   F12 → Application → Local Storage → Clear site data
   ```

3. **Hard Refresh**
   ```
   Windows/Linux: Ctrl+Shift+R
   Mac: Cmd+Shift+R
   ```

### Issue: Edit Mode Not Working

**Symptoms:**
- Edit button doesn't respond
- Can't add/remove/move tiles
- Sidebar palette doesn't appear

**Solutions:**

1. **Page Refresh**
   - Refresh the page and try again

2. **Check for JavaScript Errors**
   - Open console and look for errors
   - Report errors to administrator

3. **Try Different Browser**
   - Verify issue is not browser-specific

---

## Tile Issues

### Issue: Cannot Add New Tiles

**Symptoms:**
- Tiles appear grayed out in palette
- Click on tile has no effect
- Error message when attempting to add

**Diagnostic Steps:**

1. **Check Tile Constraints**
   - Telemetry State tile is required first
   - Only one Telemetry State allowed

**Solutions:**

| Message | Solution |
|---------|----------|
| "Requires Telemetry State tile" | Add Telemetry State tile first |
| "Only one instance allowed" | Remove existing Telemetry State before adding new |
| "Maximum tiles reached" | Remove unused tiles |

### Issue: Tile Shows "No Data"

**Symptoms:**
- Tile is present but shows empty state
- "No telemetry data available" message
- Graph shows flat line at zero

**Solutions:**

1. **Apply Configuration Profile**
   - Click folder icon on tile
   - Select appropriate configuration
   - Click Apply

2. **Verify Live Mode**
   - Check mode indicator shows "LIVE"
   - If in REVIEW mode, click to return to LIVE

3. **Check Telemetry State Tile**
   - Ensure it shows "OK" status
   - Verify connection is established

### Issue: Tile Not Updating

**Symptoms:**
- Data appears frozen
- Timestamp not changing
- Graph not showing new points

**Solutions:**

1. **Verify Mode**
   - Check if accidentally in REVIEW mode
   - REVIEW mode with paused playback won't update

2. **Check Configuration**
   - Re-apply configuration profile
   - Try different configuration to test

3. **Subscription Issues**
   - Remove and re-add the tile
   - Refresh the page

### Issue: Tile Resize Not Working

**Symptoms:**
- Can't change tile size
- Resize handles not appearing
- Tile snaps back to original size

**Solutions:**

1. **Enable Edit Mode**
   - Tiles can only be resized in Edit mode

2. **Minimum Size Limits**
   - Tiles have minimum sizes that cannot be reduced:
     - Telemetry State: 4x2
     - Graph: 3x2
     - Tabular: 3x2

3. **Grid Constraints**
   - Other tiles may be blocking expansion
   - Try moving adjacent tiles first

---

## Playback Problems

### Issue: Historical Data Won't Load

**Symptoms:**
- "Loading..." never completes
- "No historical data available" message
- Error when clicking Load button

**Diagnostic Steps:**

1. **Check Time Range**
   - Ensure selected range contains data
   - Try a recent time range first

2. **Network Request**
   ```
   F12 → Network → Look for /api/historical-telemetry requests
   ```

**Solutions:**

| Cause | Solution |
|-------|----------|
| Invalid time range | Select a time range with known data |
| Service unavailable | Verify Historical Telemetry service (port 5002) is running |
| Network timeout | Try smaller time range |
| Database issue | Contact administrator |

### Issue: Playback Controls Unresponsive

**Symptoms:**
- Play button doesn't start playback
- Speed control has no effect
- Timeline doesn't respond to clicks

**Solutions:**

1. **Verify Historical Data Loaded**
   - Timeline should show time range
   - Total records indicator should be > 0

2. **Check Mode**
   - Must be in REVIEW mode for playback
   - Mode indicator should show purple "REVIEW"

3. **Reload Historical Data**
   - Click Load again to refresh data
   - Try different time range

### Issue: Timeline Scrubbing Not Working

**Symptoms:**
- Clicking timeline has no effect
- Playhead doesn't move
- Time display doesn't update

**Solutions:**

1. **Pause Playback First**
   - Stop playback before scrubbing
   - Click anywhere on timeline

2. **Check Data Range**
   - Ensure clicking within valid data range
   - Timeline ends may be boundaries

3. **Browser Compatibility**
   - Try different browser
   - Update current browser

### Issue: Playback Speed Incorrect

**Symptoms:**
- Playback seems too fast/slow
- Speed indicator doesn't match actual speed
- Data jumps or skips

**Solutions:**

1. **System Resources**
   - High CPU usage can affect playback
   - Close other applications

2. **Data Density**
   - Dense data may appear slower
   - Sparse data may appear faster

3. **Reset Speed**
   - Set speed to 1x
   - Gradually increase if needed

---

## Performance Issues

### Issue: Slow Dashboard Response

**Symptoms:**
- Delayed response to clicks
- Laggy tile updates
- Browser tab using high CPU

**Solutions:**

1. **Reduce Active Tiles**
   - Remove unused tiles
   - Each tile adds processing overhead

2. **Browser Resources**
   ```
   - Close unnecessary tabs
   - Restart browser
   - Check available RAM (need at least 4GB free)
   ```

3. **Hardware Acceleration**
   ```
   Browser Settings → Hardware Acceleration → Enable
   ```

4. **Reduce Data Points**
   - Use smaller time ranges for history
   - Fewer metrics per tile

### Issue: Memory Usage Growing

**Symptoms:**
- Browser slowing down over time
- "Out of memory" errors
- Tab crashes

**Solutions:**

1. **Regular Page Refresh**
   - Refresh page every few hours during extended use

2. **Limit Historical Data**
   - Load smaller time ranges
   - Return to LIVE mode when not reviewing

3. **Browser Update**
   - Use latest browser version
   - Memory management improves with updates

### Issue: Graph Rendering Slow

**Symptoms:**
- Graphs take time to draw
- Animation stutters
- Updates appear delayed

**Solutions:**

1. **Reduce Series Count**
   - Choose configurations with fewer metrics
   - Use separate tiles for different metric groups

2. **Browser Hardware Acceleration**
   - Enable GPU rendering in browser settings

---

## Configuration Problems

### Issue: Configuration Modal Won't Open

**Symptoms:**
- Clicking folder icon has no effect
- Modal doesn't appear
- Page freezes when clicking

**Solutions:**

1. **JavaScript Console**
   - Check for errors when clicking
   - Report errors to administrator

2. **Popup Blocker**
   - Disable popup blocker for application URL

3. **Page Refresh**
   - Refresh and try again

### Issue: Configurations Not Loading

**Symptoms:**
- Empty configuration list
- "No configurations available" message
- Search returns no results

**Solutions:**

1. **Service Status**
   - Verify Configuration Management service (port 5001) is running

2. **Network Request**
   ```
   F12 → Network → Check /api/configuration/file requests
   ```

3. **Clear Search**
   - Ensure search field is empty
   - Some profiles may be filtered out

### Issue: Configuration Not Applied

**Symptoms:**
- Click Apply but tile doesn't change
- Previous configuration persists
- Modal closes but no effect

**Solutions:**

1. **Verify Selection**
   - Ensure a configuration is highlighted
   - Don't just hover, click to select

2. **Tile State**
   - Tile must be properly initialized
   - Try removing and re-adding tile

3. **Live Mode Required**
   - Configuration changes require LIVE mode
   - Return to LIVE if in REVIEW

---

## Browser-Specific Issues

### Chrome

| Issue | Solution |
|-------|----------|
| WebSocket blocked | Check chrome://flags for WebSocket settings |
| Slow performance | Disable extensions one by one |
| Memory issues | Use Chrome Task Manager (Shift+Esc) to identify leaks |

### Firefox

| Issue | Solution |
|-------|----------|
| WebSocket issues | Check about:config → network.websocket.* settings |
| CSS rendering | Try safe mode (Help → Restart with Add-ons Disabled) |
| Performance | Check about:performance for memory usage |

### Safari

| Issue | Solution |
|-------|----------|
| WebSocket problems | Enable Develop menu → check experimental features |
| Chart rendering | Update to latest Safari version |
| Connection issues | Check Privacy settings aren't blocking |

### Edge

| Issue | Solution |
|-------|----------|
| Similar to Chrome | Edge uses Chromium, follow Chrome solutions |
| IE Mode issues | Ensure not running in IE compatibility mode |

---

## Service Status Verification

### Checking Service Health

**API Gateway (Port 5000)**
```
curl http://localhost:5000/health
Expected: {"status": "healthy"}
```

**Configuration Service (Port 5001)**
```
curl http://localhost:5001/api/file
Expected: JSON array of configuration files
```

**Historical Telemetry Service (Port 5002)**
```
curl http://localhost:5002/api/historical-telemetry?pageSize=1
Expected: JSON with pagination data
```

**Telemetry Streaming Service (Port 5003)**
```
WebSocket connection to ws://localhost:5003/telemetry
Expected: Connection established
```

### Service Status Table

| Service | Port | Health Check | Required For |
|---------|------|--------------|--------------|
| API Gateway | 5000 | `/health` | All operations |
| Configuration | 5001 | `/api/file` | Loading profiles |
| Historical | 5002 | `/api/historical-telemetry` | Review mode |
| Telemetry | 5003 | WebSocket | Live mode |

---

## Log Analysis

### Browser Console Logs

**Common Error Patterns:**

```javascript
// Connection Error
"WebSocket connection to 'ws://...' failed"
→ Solution: Check network/service status

// Configuration Error
"Failed to fetch configurations: 404"
→ Solution: Verify Configuration service is running

// Subscription Error
"Subscription failed: timeout"
→ Solution: Check Telemetry service and network
```

### Network Tab Analysis

**What to Check:**
1. Failed requests (red status)
2. Slow requests (> 1000ms)
3. WebSocket connection status
4. Response codes (200, 404, 500)

**Expected Responses:**
| Endpoint | Expected Status |
|----------|-----------------|
| `/api/configuration/*` | 200 OK |
| `/api/historical-telemetry` | 200 OK |
| `/telemetry` (WebSocket) | 101 Switching Protocols |

---

## Escalation Procedures

### Level 1: Self-Service

1. Review this troubleshooting guide
2. Try suggested solutions
3. Clear cache and refresh
4. Try different browser

### Level 2: Help Desk

Contact if:
- Issue persists after Level 1 steps
- Error messages not covered here
- Service appears down

**Provide:**
- Screenshot of issue
- Browser and version
- Console error messages
- Steps to reproduce

### Level 3: System Administrator

Contact for:
- Service restart requests
- Database issues
- Network configuration
- System-wide outages

**Provide:**
- All Level 2 information
- Time issue started
- Number of affected users
- Business impact

### Level 4: Development Team

Contact for:
- Confirmed software bugs
- Feature requests
- Performance optimization
- Security concerns

---

## Diagnostic Checklist

Use this checklist when troubleshooting:

```
□ Browser compatible and updated?
□ JavaScript enabled?
□ Network connection stable?
□ Console free of errors?
□ All services running?
□ Cache cleared recently?
□ Edit mode status correct?
□ Telemetry State tile present?
□ Configuration profile applied?
□ Correct mode (LIVE/REVIEW)?
```

---

## Contact Information

**Help Desk:** [Contact your organization's help desk]
**System Administrator:** [Contact your system administrator]
**Emergency Support:** [Emergency contact information]

---

*Last Updated: Event Monitoring System v1.0*
