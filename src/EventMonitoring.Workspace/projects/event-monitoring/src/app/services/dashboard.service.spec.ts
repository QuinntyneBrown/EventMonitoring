import { TestBed } from '@angular/core/testing';
import { DashboardService, TileType } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('canAddTile', () => {
    it('should allow adding telemetry-state tile when none exists', () => {
      expect(service.canAddTile('telemetry-state')).toBe(true);
    });

    it('should not allow adding multiple telemetry-state tiles', () => {
      service.addTile('telemetry-state');
      expect(service.canAddTile('telemetry-state')).toBe(false);
    });

    it('should not allow adding graph tile without telemetry-state', () => {
      expect(service.canAddTile('graph')).toBe(false);
    });

    it('should not allow adding tabular tile without telemetry-state', () => {
      expect(service.canAddTile('tabular')).toBe(false);
    });

    it('should allow adding graph tile when telemetry-state exists', () => {
      service.addTile('telemetry-state');
      expect(service.canAddTile('graph')).toBe(true);
    });

    it('should allow adding multiple graph tiles', () => {
      service.addTile('telemetry-state');
      service.addTile('graph');
      expect(service.canAddTile('graph')).toBe(true);
    });
  });

  describe('addTile', () => {
    it('should add a telemetry-state tile', () => {
      const id = service.addTile('telemetry-state');
      expect(id).toBeTruthy();
      expect(service.tiles.length).toBe(1);
      expect(service.tiles[0].type).toBe('telemetry-state');
    });

    it('should return null when trying to add invalid tile', () => {
      const id = service.addTile('graph');
      expect(id).toBeNull();
      expect(service.tiles.length).toBe(0);
    });

    it('should add tile at specified position', () => {
      service.addTile('telemetry-state');
      const id = service.addTile('graph', { x: 6, y: 0 });
      expect(id).toBeTruthy();
      const tile = service.tiles.find((t) => t.id === id!);
      expect(tile?.x).toBe(6);
      expect(tile?.y).toBe(0);
    });
  });

  describe('removeTile', () => {
    it('should remove a tile by id', () => {
      const id = service.addTile('telemetry-state');
      expect(service.tiles.length).toBe(1);
      service.removeTile(id!);
      expect(service.tiles.length).toBe(0);
    });
  });

  describe('updateTile', () => {
    it('should update tile properties', () => {
      const id = service.addTile('telemetry-state');
      service.updateTile(id!, { title: 'Test Title' });
      const tile = service.tiles.find((t) => t.id === id);
      expect(tile?.title).toBe('Test Title');
    });
  });

  describe('updateTilePositions', () => {
    it('should update tile positions from grid', () => {
      const id = service.addTile('telemetry-state');
      service.updateTilePositions([
        { id: id!, x: 2, y: 3, w: 6, h: 4 },
      ]);
      const tile = service.tiles.find((t) => t.id === id);
      expect(tile?.x).toBe(2);
      expect(tile?.y).toBe(3);
    });
  });
});
