import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MainLayoutComponent,
  SidenavSection,
  SidenavItem,
  DashboardGridComponent,
  GridChangeEvent,
  TelemetryStateTileComponent,
  GraphTileComponent,
  TabularTileComponent,
  GraphSeries,
  TabularRow,
  TelemetryStats,
  TimelineState,
  ConfigFileModalComponent,
  ConfigFile,
  ModalService,
} from 'event-monitoring-components';
import { TilePaletteComponent } from '../../components/tile-palette/tile-palette.component';
import { DashboardService, DashboardTile, TileType } from '../../services/dashboard.service';
import { TelemetryService, TelemetryMessage } from '../../services/telemetry.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Subject, takeUntil, interval, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    DashboardGridComponent,
    TelemetryStateTileComponent,
    GraphTileComponent,
    TabularTileComponent,
    TilePaletteComponent,
    ConfigFileModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  mode: 'live' | 'review' = 'live';
  editModeActive = false;
  activeNavItemId = 'dashboard';

  tiles$!: Observable<DashboardTile[]>;
  tiles: DashboardTile[] = [];

  // Telemetry state
  isPlaying = true;
  telemetryStats: TelemetryStats = {
    updateRate: '5 Hz',
    subscriptions: 0,
    messagesPerSecond: 0,
    connectionStatus: 'Connecting',
  };
  timeline: TimelineState = {
    startTime: new Date(Date.now() - 3600000).toISOString(),
    endTime: 'Now',
    currentTime: new Date().toISOString(),
    progress: 100,
  };

  // Tile data
  graphData: Map<string, GraphSeries[]> = new Map();
  tabularData: Map<string, TabularRow[]> = new Map();

  // Configuration modal
  configFiles: ConfigFile[] = [];
  selectedTileForConfig: string | null = null;

  sidenavSections: SidenavSection[] = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'telemetry', label: 'Telemetry', icon: 'show_chart' },
        { id: 'historical', label: 'Historical Data', icon: 'history' },
      ],
    },
    {
      title: 'Configuration',
      items: [
        { id: 'config-files', label: 'Config Files', icon: 'folder' },
        { id: 'settings', label: 'Settings', icon: 'tune' },
      ],
    },
    {
      title: 'System',
      items: [
        { id: 'health', label: 'Health Status', icon: 'monitor_heart' },
        { id: 'help', label: 'Help', icon: 'help_outline' },
      ],
    },
  ];

  constructor(
    readonly dashboardService: DashboardService,
    private telemetryService: TelemetryService,
    private configurationService: ConfigurationService,
    private modalService: ModalService
  ) {
    this.tiles$ = this.dashboardService.tiles$;
  }

  ngOnInit(): void {
    this.tiles$.pipe(takeUntil(this.destroy$)).subscribe((tiles) => {
      this.tiles = tiles;
    });

    this.telemetryService.connectionStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        this.telemetryStats = { ...this.telemetryStats, connectionStatus: status };
      });

    this.telemetryService.telemetry$
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        if (message) {
          this.updateTileData(message);
        }
      });

    this.configurationService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((files) => {
        this.configFiles = files.map(f => ({
          id: f.id,
          name: f.name,
          path: f.path,
          itemCount: f.items.length,
          lastModified: new Date(f.lastModified),
          items: f.items.filter(i => i.value === 'true').map(i => i.key),
        }));
      });

    // Update timeline
    interval(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.timeline = {
        ...this.timeline,
        currentTime: new Date().toISOString(),
      };
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMenuClick(): void {
    // Menu toggle functionality can be implemented here
  }

  onEditToggle(): void {
    this.editModeActive = !this.editModeActive;
  }

  onHeaderActionClick(actionId: string): void {
    // Handle header actions (notifications, settings, account)
  }

  onNavItemClick(item: SidenavItem): void {
    this.activeNavItemId = item.id;
  }

  onAddTile(type: TileType): void {
    this.dashboardService.addTile(type);
  }

  onRemoveTile(tileId: string): void {
    this.dashboardService.removeTile(tileId);
  }

  onGridChange(event: GridChangeEvent): void {
    this.dashboardService.updateTilePositions(event.items);
  }

  canAddTile = (type: TileType): boolean => {
    return this.dashboardService.canAddTile(type);
  };

  onTileActionClick(tileId: string, actionId: string): void {
    if (actionId === 'folder' || actionId === 'folder_open') {
      this.selectedTileForConfig = tileId;
      this.modalService.open('config-file-modal');
    }
  }

  onConfigModalClose(): void {
    this.modalService.close('config-file-modal');
    this.selectedTileForConfig = null;
  }

  onConfigFileApply(configFile: ConfigFile): void {
    if (this.selectedTileForConfig && configFile.items) {
      // Subscribe to metrics from config file
      this.telemetryService.subscribe({
        clientId: this.selectedTileForConfig,
        metrics: configFile.items,
        updateRateMs: 200,
      });
      this.dashboardService.updateTile(this.selectedTileForConfig, {
        title: configFile.name,
        config: configFile,
      });
    }
  }

  getTileTitle(tile: DashboardTile): string {
    return tile.title || this.getDefaultTileTitle(tile.type);
  }

  private getDefaultTileTitle(type: TileType): string {
    const titles: Record<TileType, string> = {
      'telemetry-state': 'Telemetry State',
      'graph': 'Graph',
      'tabular': 'Tabular Data',
    };
    return titles[type];
  }

  private updateTileData(message: TelemetryMessage): void {
    // Update graph data
    this.graphData.forEach((series, tileId) => {
      series.forEach((s) => {
        if (s.label === message.name) {
          s.data.push({
            timestamp: message.ust,
            value: parseFloat(message.value) || 0,
          });
          // Keep last 50 data points
          if (s.data.length > 50) {
            s.data.shift();
          }
        }
      });
    });

    // Update tabular data
    this.tabularData.forEach((rows, tileId) => {
      const existingRow = rows.find((r) => r.parameter === message.name);
      if (existingRow) {
        existingRow.value = message.value;
        existingRow.timestamp = message.ust;
      }
    });
  }

  getGraphSeries(tileId: string): GraphSeries[] {
    return this.graphData.get(tileId) || [];
  }

  getTabularRows(tileId: string): TabularRow[] {
    return this.tabularData.get(tileId) || [];
  }

  isConfigModalOpen(): boolean {
    return this.modalService.isOpen('config-file-modal');
  }
}
