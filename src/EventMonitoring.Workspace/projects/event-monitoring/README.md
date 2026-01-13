# Event Monitoring Application

A real-time space vehicle telemetry monitoring system built with Angular 21.

## Overview

The Event Monitoring application provides a dashboard interface for monitoring telemetry data from space vehicles in real-time. It features live data streaming, historical data review, and configurable telemetry subscriptions.

## Features

### Implemented ✅
- **Dashboard Page**: Main monitoring interface with layout components
- **Telemetry Service**: Real-time telemetry streaming with 50 different telemetry types
- **Configuration Service**: Configuration file management with 10 pre-configured telemetry profiles
- **Responsive Layout**: Using the event-monitoring-components library
- **Dark Theme**: Material Design dark theme with design tokens
- **Full Test Coverage**: 31 unit tests covering all components and services

### Telemetry Types
The system monitors 50 different telemetry types across various spacecraft systems:
- **Core Systems**: CPU usage, memory usage, fuel level, oxygen level
- **Environmental**: Temperature, pressure, humidity, air quality, CO2 levels
- **Navigation**: GPS coordinates, altitude, velocity, acceleration, gyroscope, magnetometer
- **Power**: Battery voltage, solar panel output, power consumption, backup power
- **Propulsion**: Thruster temperature, acceleration vectors
- **Communication**: Signal strength, antenna position
- **Life Support**: Life support status, crew count, water/food reserves, waste levels
- **Structural**: Hull integrity, vibration levels, radiation levels
- **Mission**: System time, mission elapsed time, distance to target

### Configuration Files
10 pre-configured telemetry profiles:
1. Spacecraft Sensors
2. Navigation Systems
3. Environmental Controls
4. Power Systems
5. Propulsion Systems
6. Communication Systems
7. Science Instruments
8. Structural Monitoring
9. Crew Systems
10. Mission Parameters

## Architecture

### Components
- **AppComponent**: Root component with routing
- **DashboardComponent**: Main dashboard page
  - Integrates MainLayoutComponent from the component library
  - Provides navigation and mode switching

### Services
- **TelemetryService**: Manages telemetry subscriptions and data streaming
  - Mock data generation at 5 Hz (200ms intervals)
  - Subscription management for multiple clients
  - Connection status tracking
  
- **ConfigurationService**: Manages configuration files
  - CRUD operations for configuration files
  - Mock data with 10 configuration profiles
  - Structured configuration items with types

### Routes
- `/` - Redirects to dashboard
- `/dashboard` - Main dashboard view

## Development

### Prerequisites
- Node.js 18+
- npm 10+

### Installation
```bash
cd src/EventMonitoring.Workspace
npm install --legacy-peer-deps
```

### Development Server
```bash
npm start
# or
ng serve event-monitoring
```

Navigate to `http://localhost:4200/`

### Building
```bash
# Build the component library first
npm run build:lib

# Build the application
ng build event-monitoring
```

The build artifacts will be stored in the `dist/event-monitoring` directory.

### Testing
```bash
# Run unit tests
ng test event-monitoring --no-watch

# Run tests with watch mode
ng test event-monitoring
```

**Current Test Results**: 31/31 tests passing
- App Component: 2 tests
- Dashboard Component: 10 tests
- Configuration Service: 11 tests
- Telemetry Service: 8 tests

## Technology Stack

- **Framework**: Angular 21
- **UI Components**: event-monitoring-components library
- **State Management**: RxJS
- **Testing**: Vitest + Jasmine
- **Styling**: SCSS with CSS custom properties (design tokens)
- **Icons**: Material Icons

## Design Tokens

The application uses a consistent set of design tokens:

### Colors
- Primary: `#bb86fc`
- Secondary: `#03dac6`
- Error: `#cf6679`
- Surface: `#1f1f1f`
- Background: `#121212`

### Spacing
- XS: `4px`
- SM: `8px`
- MD: `16px`
- LG: `24px`
- XL: `32px`

### Border Radius
- SM: `4px`
- MD: `8px`
- LG: `16px`
- Full: `50%`

## Project Structure

```
projects/event-monitoring/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── dashboard/         # Dashboard page component
│   │   ├── services/
│   │   │   ├── telemetry.service.ts        # Telemetry management
│   │   │   └── configuration.service.ts    # Configuration management
│   │   ├── app.ts                 # Root component
│   │   ├── app.routes.ts          # Application routes
│   │   └── app.config.ts          # Application configuration
│   ├── index.html                 # Main HTML file
│   └── styles.scss                # Global styles
├── public/                        # Static assets
└── README.md                      # This file
```

## Future Enhancements

### High Priority
- Wire up dashboard grid with interactive tiles
- Add SignalR integration for real-time backend communication
- Implement Playwright e2e tests
- Add more tile components (graph tiles, tabular tiles, telemetry state tile)

### Medium Priority
- Historical telemetry playback
- Time scrubbing controls
- Configuration file modal
- Tile configuration persistence

### Low Priority
- User preferences
- Export functionality
- Advanced filtering
- Alert system

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass: `ng test event-monitoring --no-watch`
4. Build successfully: `ng build event-monitoring`
5. Submit a pull request

## License

Copyright © 2026 QuinntyneBrown
