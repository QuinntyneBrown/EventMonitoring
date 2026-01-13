import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GridItem } from 'event-monitoring-components';

export type TileType = 'telemetry-state' | 'graph' | 'tabular';

export interface DashboardTile extends GridItem {
  type: TileType;
  title?: string;
  config?: unknown;
}

export interface TileTypeDefinition {
  type: TileType;
  label: string;
  icon: string;
  allowMultiple: boolean;
  requiresTelemetryState: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly tilesSubject = new BehaviorSubject<DashboardTile[]>([]);
  readonly tiles$ = this.tilesSubject.asObservable();

  readonly tileTypes: TileTypeDefinition[] = [
    {
      type: 'telemetry-state',
      label: 'Telemetry State',
      icon: 'tune',
      allowMultiple: false,
      requiresTelemetryState: false,
    },
    {
      type: 'graph',
      label: 'Graph Tile',
      icon: 'show_chart',
      allowMultiple: true,
      requiresTelemetryState: true,
    },
    {
      type: 'tabular',
      label: 'Tabular Tile',
      icon: 'table_chart',
      allowMultiple: true,
      requiresTelemetryState: true,
    },
  ];

  get tiles(): DashboardTile[] {
    return this.tilesSubject.value;
  }

  canAddTile(type: TileType): boolean {
    const tiles = this.tilesSubject.value;
    const tileTypeDef = this.tileTypes.find((t) => t.type === type);

    if (!tileTypeDef) {
      return false;
    }

    // Check if multiple instances are allowed
    if (!tileTypeDef.allowMultiple) {
      const existingTile = tiles.find((t) => t.type === type);
      if (existingTile) {
        return false;
      }
    }

    // Check if telemetry state tile is required
    if (tileTypeDef.requiresTelemetryState) {
      const hasTelemetryState = tiles.some((t) => t.type === 'telemetry-state');
      if (!hasTelemetryState) {
        return false;
      }
    }

    return true;
  }

  addTile(type: TileType, position?: { x: number; y: number }): string | null {
    if (!this.canAddTile(type)) {
      return null;
    }

    const tiles = this.tilesSubject.value;
    const id = `tile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const defaultSizes: Record<TileType, { w: number; h: number }> = {
      'telemetry-state': { w: 12, h: 4 },
      graph: { w: 6, h: 4 },
      tabular: { w: 6, h: 4 },
    };

    const size = defaultSizes[type];
    const pos = position || this.findNextAvailablePosition(size.w, size.h);

    const newTile: DashboardTile = {
      id,
      type,
      x: pos.x,
      y: pos.y,
      w: size.w,
      h: size.h,
    };

    this.tilesSubject.next([...tiles, newTile]);
    return id;
  }

  removeTile(id: string): void {
    const tiles = this.tilesSubject.value.filter((t) => t.id !== id);
    this.tilesSubject.next(tiles);
  }

  updateTile(id: string, updates: Partial<DashboardTile>): void {
    const tiles = this.tilesSubject.value.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    this.tilesSubject.next(tiles);
  }

  updateTilePositions(items: GridItem[]): void {
    const tiles = this.tilesSubject.value.map((tile) => {
      const updatedItem = items.find((item) => item.id === tile.id);
      if (updatedItem) {
        return { ...tile, ...updatedItem };
      }
      return tile;
    });
    this.tilesSubject.next(tiles);
  }

  private findNextAvailablePosition(w: number, h: number): { x: number; y: number } {
    const tiles = this.tilesSubject.value;
    if (tiles.length === 0) {
      return { x: 0, y: 0 };
    }

    // Simple strategy: find the lowest available y position
    const maxY = Math.max(...tiles.map((t) => t.y + t.h));
    return { x: 0, y: maxY };
  }

  clearAllTiles(): void {
    this.tilesSubject.next([]);
  }

  loadTiles(tiles: DashboardTile[]): void {
    this.tilesSubject.next(tiles);
  }
}
