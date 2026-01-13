# Event Monitoring System Requirements

## Document Information
- **Source**: docs/idea.txt, docs/specs/*
- **Scope**: Requirements for the Event Monitoring system including microservices architecture and messaging specifications

---

## 1. Solution Architecture

### REQ-ARCH-001: Solution Structure
The solution shall consist of the following projects under `src/`:
- EventMonitoring.ApiGateway (.NET Web API)
- EventMonitoring.ConfigurationManagement (.NET Web API)
- EventMonitoring.TelemetryStreaming (.NET Web API)
- EventMonitoring.HistoricalTelemetry (.NET Web API)
- EventMonitoring.Messaging (.NET class library)
- EventMonitoring.Workspace (Angular Workspace)

**Acceptance Criteria:**
```gherkin
Given the solution is created
When a developer examines the src/ directory
Then the following projects shall exist:
  | Project Name                    | Type              |
  | EventMonitoring.ApiGateway      | .NET Web API       |
  | EventMonitoring.ConfigurationManagement | .NET Web API |
  | EventMonitoring.TelemetryStreaming | .NET Web API    |
  | EventMonitoring.HistoricalTelemetry | .NET Web API   |
  | EventMonitoring.Messaging       | .NET Class Library |
  | EventMonitoring.Workspace       | Angular Workspace  |
```

### REQ-ARCH-002: Project Dependencies
Backend services shall be independently deployable and shall not reference each other directly.
Shared cross-service contracts and messaging infrastructure shall be provided via EventMonitoring.Messaging.

**Acceptance Criteria:**
```gherkin
Given the solution projects are configured
When examining project references
Then EventMonitoring.ConfigurationManagement shall not reference EventMonitoring.TelemetryStreaming
And EventMonitoring.ConfigurationManagement shall not reference EventMonitoring.HistoricalTelemetry
And EventMonitoring.TelemetryStreaming shall not reference EventMonitoring.ConfigurationManagement
And EventMonitoring.TelemetryStreaming shall not reference EventMonitoring.HistoricalTelemetry
And EventMonitoring.HistoricalTelemetry shall not reference EventMonitoring.ConfigurationManagement
And EventMonitoring.HistoricalTelemetry shall not reference EventMonitoring.TelemetryStreaming
And backend services may reference EventMonitoring.Messaging
```

### REQ-ARCH-003: API Gateway
An Api Gateway service shall provide the external HTTP entrypoint for the backend and route requests to the appropriate microservice.

**Acceptance Criteria:**
```gherkin
Given the backend is running
When a client calls backend endpoints
Then requests shall be served via EventMonitoring.ApiGateway
And the gateway shall route HTTP requests to the appropriate microservice
And the gateway shall route SignalR connections to the TelemetryStreaming service

Given the EventMonitoring.ApiGateway is configured
When examining appsettings.json
Then a CORS origin setting shall be present
And the default value shall be localhost:4200

Given the frontend makes a request from the configured origin
When the request is processed
Then CORS headers shall allow the request
```

### REQ-ARCH-004: Message Broker
The backend shall use Redis as a message broker for inter-service messaging.

**Acceptance Criteria:**
```gherkin
Given multiple backend services are running
When services publish or subscribe to events
Then inter-service communication shall occur via a message broker
And the message broker shall support pub/sub semantics
And Redis Pub/Sub shall be used as the message broker mechanism
```

### REQ-ARCH-005: Messaging Specifications
All microservices shall implement the messaging specifications in the specs folder.

**Acceptance Criteria:**
```gherkin
Given the microservices are implemented
When examining messaging infrastructure
Then message envelopes and headers shall comply with docs/specs/message-design.spec.md
And subscriptions and routing shall comply with docs/specs/subscription-design.spec.md
```

---

## 2. Backend - ConfigurationManagement Service

### REQ-CFG-001: Configuration Entities and Persistence
The ConfigurationManagement service shall persist ConfigurationFile and ConfigurationFileItem entities using EF Core.

**Acceptance Criteria:**
```gherkin
Given the EventMonitoring.ConfigurationManagement service exists
When examining the persistence model
Then a ConfigurationFile entity shall exist
And a ConfigurationFileItem entity shall exist
And EF Core shall be used for persistence
```

### REQ-CFG-002: File-Based Configuration Storage
The ConfigurationManagement service shall provide a single source of truth for application configuration using file-based storage.

**Acceptance Criteria:**
```gherkin
Given configuration files are managed
When configuration is retrieved by path
Then the service shall return the configuration content from file-based storage
And the configuration metadata shall be persisted via EF Core
```

### REQ-CFG-003: Repository Pattern and CRUD
The ConfigurationManagement service shall implement a repository pattern with full CRUD operations for ConfigurationFile and ConfigurationFileItem.

**Acceptance Criteria:**
```gherkin
Given the ConfigurationManagement data layer exists
When examining repositories
Then repositories shall expose CRUD operations for ConfigurationFile
And repositories shall expose CRUD operations for ConfigurationFileItem
```

### REQ-CFG-004: FileController GET Endpoints
The ConfigurationManagement service shall expose a FileController with GET endpoints to retrieve configuration files.

**Acceptance Criteria:**
```gherkin
Given the ConfigurationManagement service is running
When a client requests all configuration files
Then a GET endpoint shall return all configuration files

Given the ConfigurationManagement service is running
When a client requests a configuration file by ID
Then a GET endpoint shall return the configuration file by ID

Given the ConfigurationManagement service is running
When a client requests a configuration file by path
Then a GET endpoint shall return the configuration file by path
```

### REQ-CFG-005: Database Provider, Migrations, and Seeding
The ConfigurationManagement service shall use SQL Express as the database provider, support EF Core migrations, and seed the database with 10 various configuration files.

**Acceptance Criteria:**
```gherkin
Given the ConfigurationManagement database is configured
When the database connection is established
Then it shall connect to SQL Express

Given database schema changes are required
When migrations are applied
Then EF Core migrations shall be available to apply changes

Given the database is initialized
When seeding is executed
Then 10 configuration files shall be created in the database
And each configuration file shall have associated ConfigurationFileItems
```

---

## 3. Backend - TelemetryStreaming Service

### REQ-STREAM-001: SignalR TelemetryHub
The TelemetryStreaming service shall expose a SignalR hub mapped to /telemetry.

**Acceptance Criteria:**
```gherkin
Given the TelemetryStreaming service is running
When a client connects to /telemetry
Then a SignalR connection shall be established via TelemetryHub
```

### REQ-STREAM-002: Subscribe and Unsubscribe Methods
TelemetryHub shall provide subscribe and unsubscribe methods for clients.

**Acceptance Criteria:**
```gherkin
Given a client is connected to TelemetryHub
When the client subscribes with a metric filter and update rate
Then the subscription shall be registered

Given a client is connected to TelemetryHub
When the client unsubscribes
Then the subscription shall be removed
```

Example (non-normative):
```csharp
// Client subscribes to specific metrics
await hub.Subscribe(new SubscriptionRequestDto {
  ClientId = "client-1",
  Metrics = ["cpu", "memory"],
  Sources = ["server-1"],
  UpdateRateMs = 1000
});
```

### REQ-STREAM-003: In-Memory Subscription Manager
The TelemetryStreaming service shall maintain an in-memory subscription manager tracking client metric filters, sources, and update rates.

**Acceptance Criteria:**
```gherkin
Given multiple clients are connected
When clients subscribe to different metric filters and update rates
Then the service shall track subscriptions per client
And the service shall respect per-client filters and update rates
```

### REQ-STREAM-004: Background Telemetry Generation
The TelemetryStreaming service shall run a background service that cyclically generates telemetry.

**Acceptance Criteria:**
```gherkin
Given the TelemetryStreaming service is running
When telemetry generation is enabled
Then telemetry shall be generated cyclically
And generation rate shall be configurable
And the default generation rate shall be 200 milliseconds (5 Hz)
```

### REQ-STREAM-005: Telemetry Entities
The TelemetryStreaming service shall define TelemetryMessage and TelemetrySubscription entities.

**Acceptance Criteria:**
```gherkin
Given the TelemetryStreaming service codebase
When examining the domain entities
Then a TelemetryMessage entity shall exist
And a TelemetrySubscription entity shall exist
```

### REQ-STREAM-006: Telemetry Message Types
The TelemetryStreaming service shall generate 50 types of telemetry messages representing various components of a space vehicle.

**Acceptance Criteria:**
```gherkin
Given telemetry is generated
When examining available telemetry types
Then 50 different telemetry types shall be available
And each type shall represent a space vehicle component
```

### REQ-STREAM-007: Subscription-Based Telemetry
Telemetry shall only be published to clients that have subscribed to that specific telemetry by name.

**Acceptance Criteria:**
```gherkin
Given a client is connected to TelemetryHub
When the client subscribes to telemetry by name
Then only the subscribed telemetry shall be received

Given a client has not subscribed to a telemetry type
When that telemetry type is published
Then the client shall not receive that telemetry
```

### REQ-STREAM-008: Telemetry Data Structure
Telemetry messages shall contain Name (string), Ust (UTC timestamp), and Value (string - numeric, boolean, or enum).

**Acceptance Criteria:**
```gherkin
Given telemetry is published
When examining the message structure
Then the message shall contain a Name field of type string
And the message shall contain a Ust field representing UTC timestamp
And the message shall contain a Value field of type string
And Value may represent numeric, boolean, or enum values
```

---

## 4. Backend - HistoricalTelemetry Service

### REQ-HIST-001: Historical Telemetry Persistence
The HistoricalTelemetry service shall persist historical telemetry records and support efficient querying.

**Acceptance Criteria:**
```gherkin
Given the HistoricalTelemetry service stores telemetry
When examining the persistence model
Then a HistoricalTelemetryRecord entity shall exist
And queries shall be index-optimized for Source, MetricName, and Timestamp
```

### REQ-HIST-002: Bulk Insert for Telemetry Ingestion
The HistoricalTelemetry service shall support bulk insert for batch processing using AddRangeAsync.

**Acceptance Criteria:**
```gherkin
Given a batch of telemetry records is received
When persisting the batch
Then the service shall use a bulk insert approach
And EF Core AddRangeAsync shall be used for the batch insert
```

### REQ-HIST-003: Paginated HistoricalTelemetryController
The HistoricalTelemetry service shall expose a controller with paginated queries supporting time ranges and filters.

**Acceptance Criteria:**
```gherkin
Given a client requests historical telemetry with filters and a time range
When the HistoricalTelemetry service responds
Then results shall be paginated
And pagination metadata (including total pages) shall be included in the response
```

Example (non-normative):
```csharp
// Query historical data with pagination
var result = await controller.Query(new TelemetryQueryRequest {
  Source = "server-1",
  MetricName = "cpu",
  StartTime = DateTime.UtcNow.AddHours(-24),
  EndTime = DateTime.UtcNow,
  Page = 1,
  PageSize = 100
});
```

### REQ-HIST-004: Broker Listener Scaffold
The HistoricalTelemetry service shall include a background listener scaffold for message broker Pub/Sub integration.

**Acceptance Criteria:**
```gherkin
Given the message broker is available
When telemetry events are published
Then the HistoricalTelemetry service shall be able to subscribe and ingest events
And the listener shall be implemented as a background service scaffold
And the listener shall support Redis Pub/Sub integration
```

### REQ-HIST-005: Telemetry Aggregation
The HistoricalTelemetry service shall include a TelemetryAggregation entity for pre-computed statistics.

**Acceptance Criteria:**
```gherkin
Given historical telemetry exists
When pre-computed statistics are required
Then a TelemetryAggregation entity shall exist
And it shall support storing computed aggregates by source, metric, and time window
```

### REQ-HIST-006: Options Pattern for Settings
All settings in appsettings shall be parsed using the Options pattern. IConfiguration shall not be used directly in code for retrieving settings.

**Acceptance Criteria:**
```gherkin
Given settings are defined in appsettings.json
When settings are accessed in code
Then the Options pattern shall be used
And IConfiguration shall not be injected or used directly for settings retrieval
```

### REQ-HIST-007: Telemetry Persistence
The HistoricalTelemetry service shall persist telemetry received via the message broker to the database.

**Acceptance Criteria:**
```gherkin
Given telemetry events are published to Redis Pub/Sub
When the HistoricalTelemetry service receives telemetry events
Then telemetry shall be persisted to the database
```

---

## 5. Frontend - Angular Workspace Structure

### REQ-FE-001: Angular Workspace Creation
The workspace shall be created with `ng new EventMonitoring.Workspace --no-create-application`.

**Acceptance Criteria:**
```gherkin
Given the Angular workspace is created
When examining the workspace structure
Then it shall be named EventMonitoring.Workspace
And it shall initially contain no application
```

### REQ-FE-002: Angular Version
The frontend shall use Angular 21.

**Acceptance Criteria:**
```gherkin
Given the Angular workspace is configured
When examining package.json
Then Angular version 21 shall be specified
```

### REQ-FE-003: Component Library
A component library shall be created at projects/event-monitoring-components.

**Acceptance Criteria:**
```gherkin
Given the Angular workspace exists
When generating the library
Then it shall be created at projects/event-monitoring-components
And it shall be generated using `ng g library event-monitoring-components`
```

### REQ-FE-004: Main Application
The main application shall be created at projects/event-monitoring.

**Acceptance Criteria:**
```gherkin
Given the Angular workspace exists
When generating the application
Then it shall be created at projects/event-monitoring
And it shall be generated using `ng g application event-monitoring`
```

---

## 6. Frontend - State Management

### REQ-STATE-001: RxJS for State Management
The frontend shall use RxJS for state management.

**Acceptance Criteria:**
```gherkin
Given the Angular application is implemented
When state management is required
Then RxJS observables shall be used
```

### REQ-STATE-002: No Signals
The frontend shall not use Angular Signals.

**Acceptance Criteria:**
```gherkin
Given the Angular application is implemented
When examining the codebase
Then Angular Signals shall not be used
```

### REQ-STATE-003: No NgRx
The frontend shall not use NgRx.

**Acceptance Criteria:**
```gherkin
Given the Angular application is implemented
When examining dependencies
Then NgRx shall not be included
```

### REQ-STATE-004: Minimal Component Subscriptions
Components shall not subscribe to observables unless necessary.

**Acceptance Criteria:**
```gherkin
Given components consume observable data
When implementing the component
Then async pipe shall be preferred over manual subscriptions
And manual subscriptions shall only be used when necessary
```

---

## 7. Frontend - UI Framework and Styling

### REQ-UI-001: Angular Material
The frontend shall use Angular Material theming and Angular Material components for all UI elements.

Exceptions:
- Charts shall be implemented using Chart.js.

**Acceptance Criteria:**
```gherkin
Given UI components are implemented
When HTML elements are rendered
Then Angular Material components shall be used for UI elements
And Chart.js shall be used for charts
```

### REQ-UI-002: Dark Theme
The application shall use an Angular Material dark theme.

**Acceptance Criteria:**
```gherkin
Given the application is loaded
When the UI is displayed
Then an Angular Material dark theme shall be applied
```

### REQ-UI-006: Theme Color Restriction
The application shall only use colors defined in the Angular Material theme. No custom colors shall be added outside of the theme color palette.

**Acceptance Criteria:**
```gherkin
Given UI components are styled
When examining color values in stylesheets
Then only Angular Material theme colors shall be used
And no custom colors (such as orange) shall be defined outside the theme
And the following theme colors shall be available:
  | Role      | Color   |
  | Primary   | #bb86fc |
  | Secondary | #03dac6 |
  | Error     | #cf6679 |
  | Surface   | #1f1f1f |
  | Background| #121212 |
```

### REQ-UI-005: BEM Naming Convention
The frontend shall use the BEM (Block Element Modifier) naming convention for HTML class names.

**Acceptance Criteria:**
```gherkin
Given Angular components render HTML with class attributes
When examining class naming
Then class names shall follow the BEM naming convention
And class names shall be structured as block__element--modifier when applicable
```

### REQ-UI-007: Design Tokens
The frontend shall use design tokens for consistent colors, spacing, and breakpoints. Design tokens shall be implemented as CSS custom properties and TypeScript constants.

**Acceptance Criteria:**
```gherkin
Given the component library is implemented
When examining stylesheets
Then CSS custom properties shall be used for design tokens
And the following color tokens shall be defined:
  | Token                  | Value                      |
  | --em-color-primary     | #bb86fc                    |
  | --em-color-secondary   | #03dac6                    |
  | --em-color-error       | #cf6679                    |
  | --em-color-surface     | #1f1f1f                    |
  | --em-color-background  | #121212                    |
  | --em-color-text-high   | rgba(255, 255, 255, 0.87)  |
  | --em-color-text-medium | rgba(255, 255, 255, 0.6)   |
And the following spacing tokens shall be defined:
  | Token            | Value |
  | --em-spacing-xs  | 4px   |
  | --em-spacing-sm  | 8px   |
  | --em-spacing-md  | 16px  |
  | --em-spacing-lg  | 24px  |
  | --em-spacing-xl  | 32px  |
And the following border radius tokens shall be defined:
  | Token           | Value |
  | --em-radius-sm  | 4px   |
  | --em-radius-md  | 8px   |
  | --em-radius-lg  | 16px  |
  | --em-radius-full| 50%   |
And the following breakpoints shall be defined in TypeScript:
  | Breakpoint | Value  |
  | mobile     | 600px  |
  | tablet     | 960px  |
  | desktop    | 1280px |
And TypeScript constants shall be exported for programmatic access to token values
```

### REQ-UI-003: Gridstack.js for Dashboard Tiles
The dashboard grid framework shall be Gridstack.js and shall be used for tile management.

**Acceptance Criteria:**
```gherkin
Given the dashboard is displayed
When tiles are rendered
Then Gridstack.js shall manage tile layout and interactions
```

### REQ-UI-004: Chart.js for Graphs
Chart.js shall be used for displaying graphs in graph tile components.

Line charts shall use a smooth (flowing) interpolation mode.

**Acceptance Criteria:**
```gherkin
Given a graph tile component displays telemetry
When the graph is rendered
Then Chart.js shall be used for visualization

Given a line chart is rendered
When line chart options are configured
Then the line shall be rendered using a smooth (flowing) interpolation mode
```

---

## 8. Frontend - Component Library Contents

### REQ-LIB-001: Tiles Components
The component library shall contain tile components.

**Acceptance Criteria:**
```gherkin
Given the event-monitoring-components library exists
When examining the components
Then tile components shall be available
```

### REQ-LIB-002: Reusable Components
The component library shall contain reusable components.

**Acceptance Criteria:**
```gherkin
Given the event-monitoring-components library exists
When examining the components
Then reusable components shall be available for use across the application
```

### REQ-LIB-003: Main Layout Component
The component library shall contain a main-layout component.

**Acceptance Criteria:**
```gherkin
Given the event-monitoring-components library exists
When examining the components
Then a main-layout component shall be available
```

### REQ-LIB-004: Dashboard Components
The component library shall contain dashboard components.

**Acceptance Criteria:**
```gherkin
Given the event-monitoring-components library exists
When examining the components
Then dashboard components shall be available
```

### REQ-LIB-005: Storybook Configuration
Storybook shall be installed and configured for all reusable components.

**Acceptance Criteria:**
```gherkin
Given the component library exists
When Storybook is started
Then all reusable components shall have stories defined
And components shall be viewable in Storybook
```

---

## 9. Frontend - Dashboard Functionality

### REQ-DASH-001: Edit Mode for Tile Management
Tiles can only be added and removed when the dashboard is in edit mode.

**Acceptance Criteria:**
```gherkin
Given the dashboard is in edit mode
When a user adds a tile
Then the tile shall be added to the dashboard

Given the dashboard is in edit mode
When a user removes a tile
Then the tile shall be removed from the dashboard

Given the dashboard is not in edit mode
When a user attempts to add or remove a tile
Then the action shall not be permitted
```

### REQ-DASH-002: Multiple Tile Instances
More than one of each tile type can be added, except for the telemetry state tile.

**Acceptance Criteria:**
```gherkin
Given the dashboard is in edit mode
When a user adds multiple chart tiles
Then multiple chart tiles shall be displayed

Given a telemetry state tile exists on the dashboard
When a user attempts to add another telemetry state tile
Then the action shall not be permitted
```

### REQ-DASH-003: Telemetry State Tile Requirement
A telemetry state tile must be present to add a chart tile or tabular telemetry tile.

**Acceptance Criteria:**
```gherkin
Given no telemetry state tile exists on the dashboard
When a user attempts to add a chart tile
Then the action shall not be permitted

Given no telemetry state tile exists on the dashboard
When a user attempts to add a tabular telemetry tile
Then the action shall not be permitted

Given a telemetry state tile exists on the dashboard
When a user attempts to add a chart tile or tabular telemetry tile
Then the action shall be permitted
```

### REQ-DASH-004: Tile Resizing
Tiles can be resized in edit mode.

**Acceptance Criteria:**
```gherkin
Given the dashboard is in edit mode
When a user resizes a tile
Then the tile size shall change accordingly
```

### REQ-DASH-005: Tile Movement Locking
Tile sizing and movement shall be locked in non-edit mode.

**Acceptance Criteria:**
```gherkin
Given the dashboard is not in edit mode
When a user attempts to move or resize a tile
Then the tile shall remain in its current position and size
```

### REQ-DASH-006: Mode Indicator
The dashboard shall have an indicator showing whether it is in live mode or review mode.

**Acceptance Criteria:**
```gherkin
Given the dashboard is displayed
When in live mode
Then a live mode indicator shall be visible

Given the dashboard is displayed
When in review mode
Then a review mode indicator shall be visible
```

---

## 10. Frontend - Graph Tile Component

### REQ-GRAPH-001: Configurable Telemetry Subscription
The graph tile component shall allow configuration of which telemetry to subscribe to and chart.

**Acceptance Criteria:**
```gherkin
Given a graph tile is displayed
When a user configures telemetry subscription
Then the tile shall subscribe to the selected telemetry
And the chart shall display that telemetry data
```

### REQ-GRAPH-002: Cyclical Data Display
The graph tile shall display cyclical telemetry data.

**Acceptance Criteria:**
```gherkin
Given a graph tile is subscribed to telemetry
When telemetry data is received cyclically
Then the chart shall update to display the new data
```

---

## 11. Frontend - Tabular Telemetry Tile Component

### REQ-TAB-001: Configurable Telemetry Display
The tabular telemetry tile shall allow configuration of which telemetry is subscribed to and displayed.

**Acceptance Criteria:**
```gherkin
Given a tabular telemetry tile is displayed
When a user configures telemetry subscription
Then the tile shall subscribe to the selected telemetry
And the table shall display that telemetry data
```

### REQ-TAB-002: Subscription-Based Display
Each tile shall display only the telemetry it is subscribed to.

**Acceptance Criteria:**
```gherkin
Given a tabular telemetry tile is subscribed to specific telemetry
When telemetry data is received
Then only subscribed telemetry shall be displayed in the tile
```

---

## 12. Frontend - Configuration File Modal

### REQ-MODAL-001: Configuration File Selection
Tabular telemetry tile and chart tile can open a modal to see configuration files.

**Acceptance Criteria:**
```gherkin
Given a tabular telemetry tile or chart tile is displayed
When a user opens the configuration modal
Then available configuration files shall be displayed
```

### REQ-MODAL-002: Configuration File Application
Upon selecting a configuration file, the component shall unsubscribe from current telemetry and subscribe to telemetry defined in the configuration file.

**Acceptance Criteria:**
```gherkin
Given a tile has active telemetry subscriptions
When a user selects a configuration file from the modal
Then the tile shall unsubscribe from all current telemetry
And the tile shall subscribe to telemetry defined in the selected configuration file
```

---

## 13. Frontend - Telemetry State Component

### REQ-TSTATE-001: Live Mode Initial State
The frontend shall always start in live telemetry mode.

**Acceptance Criteria:**
```gherkin
Given the application is loaded
When the dashboard is displayed
Then the telemetry mode shall be live
```

### REQ-TSTATE-002: Pause Live Mode
The telemetry state component shall allow pausing live mode.

**Acceptance Criteria:**
```gherkin
Given the application is in live mode
When a user pauses telemetry via the telemetry state component
Then live telemetry updates shall stop
```

### REQ-TSTATE-003: Historical Telemetry Request
The telemetry state component shall allow requesting a segment of historical telemetry from the backend.

**Acceptance Criteria:**
```gherkin
Given the telemetry state component is displayed
When a user requests historical telemetry for a time segment
Then a request shall be sent to the backend for that historical data
```

### REQ-TSTATE-004: Historical Telemetry Retrieval
The frontend shall retrieve all pages of historical telemetry based on the paginated response.

**Acceptance Criteria:**
```gherkin
Given a historical telemetry request is made
When the backend responds with pagination information
Then the frontend shall make subsequent requests to retrieve all pages
And all telemetry for the requested time period shall be retrieved
```

### REQ-TSTATE-005: Review Mode Playback
In review mode, the frontend shall replay historical telemetry.

**Acceptance Criteria:**
```gherkin
Given historical telemetry has been retrieved
When review mode is active
Then the telemetry shall be replayed to display components
```

### REQ-TSTATE-006: Historical Display in Components
Chart components and tabular data shall display historical telemetry in review mode.

**Acceptance Criteria:**
```gherkin
Given review mode is active
When historical telemetry is replayed
Then chart components shall display the historical data
And tabular telemetry components shall display the historical data
```

### REQ-TSTATE-007: Time Scrubbing
The telemetry state component shall allow scrubbing (moving back and forth in time), impacting what display components show.

**Acceptance Criteria:**
```gherkin
Given review mode is active with historical telemetry loaded
When a user scrubs to a different time position
Then the display components shall update to show telemetry at that time
```

### REQ-TSTATE-008: Playback Control
The telemetry state component shall allow pausing and starting telemetry playback.

**Acceptance Criteria:**
```gherkin
Given review mode is active
When a user pauses playback via the telemetry state component
Then telemetry replay shall pause

Given review mode is active and paused
When a user starts playback via the telemetry state component
Then telemetry replay shall resume
```

---

## 14. Frontend - SignalR Integration

### REQ-SIGNALR-001: SignalR Client
The frontend shall use @microsoft/signalr for real-time communication.

**Acceptance Criteria:**
```gherkin
Given the Angular application is configured
When examining dependencies
Then @microsoft/signalr shall be included
```

### REQ-SIGNALR-002: Base URL Configuration
SignalR shall be configured with the base URL of EventMonitoring.ApiGateway.

**Acceptance Criteria:**
```gherkin
Given the SignalR client is configured
When establishing a connection
Then it shall connect to the EventMonitoring.ApiGateway base URL
```

---

## 15. Testing Requirements

### REQ-TEST-001: Backend Test Projects
Test projects shall exist for all backend projects.

**Acceptance Criteria:**
```gherkin
Given the tests directory exists
When examining test projects
Then EventMonitoring.ApiGateway.Tests (NUnit) shall exist
And EventMonitoring.ConfigurationManagement.Tests (NUnit) shall exist
And EventMonitoring.TelemetryStreaming.Tests (NUnit) shall exist
And EventMonitoring.HistoricalTelemetry.Tests (NUnit) shall exist
And EventMonitoring.Messaging.Tests (NUnit) shall exist
```

### REQ-TEST-002: Backend Test Coverage
Backend tests shall achieve 80% test coverage.

**Acceptance Criteria:**
```gherkin
Given backend tests are executed
When code coverage is measured
Then coverage shall be at least 80%
```

### REQ-TEST-003: Benchmarking Tests
EventMonitoring.Benchmarks project shall exist for benchmarking telemetry pushing.

**Acceptance Criteria:**
```gherkin
Given the tests directory exists
When examining test projects
Then EventMonitoring.Benchmarks shall exist
And it shall contain benchmarks for telemetry pushing
```

### REQ-TEST-004: Component Library Test Coverage
The component library shall have 80% test coverage.

**Acceptance Criteria:**
```gherkin
Given component library tests are executed
When code coverage is measured
Then coverage shall be at least 80%
```

### REQ-TEST-005: Application Test Coverage
The main Angular application shall have 80% test coverage.

**Acceptance Criteria:**
```gherkin
Given application tests are executed
When code coverage is measured
Then coverage shall be at least 80%
```

### REQ-TEST-006: Playwright Tests
Playwright tests shall exist for all behaviors with HTTP interface and WebSocket interface mocked out.

**Acceptance Criteria:**
```gherkin
Given Playwright tests are configured
When tests are executed
Then all application behaviors shall be tested
And HTTP interfaces shall be mocked
And WebSocket interfaces shall be mocked
```

---
