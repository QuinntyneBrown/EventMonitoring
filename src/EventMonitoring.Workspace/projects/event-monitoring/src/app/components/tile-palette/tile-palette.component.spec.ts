import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilePaletteComponent } from './tile-palette.component';
import { TileTypeDefinition } from '../../services/dashboard.service';

describe('TilePaletteComponent', () => {
  let component: TilePaletteComponent;
  let fixture: ComponentFixture<TilePaletteComponent>;

  const mockTileTypes: TileTypeDefinition[] = [
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
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilePaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TilePaletteComponent);
    component = fixture.componentInstance;
    component.tileTypes = mockTileTypes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addTile event when tile is clicked and allowed', () => {
    component.canAddTile = () => true;
    spyOn(component.addTile, 'emit');

    component.onAddTile('telemetry-state');

    expect(component.addTile.emit).toHaveBeenCalledWith('telemetry-state');
  });

  it('should not emit addTile when tile cannot be added', () => {
    spyOn(component.addTile, 'emit');
    component.canAddTile = () => false;

    component.onAddTile('graph');

    expect(component.addTile.emit).not.toHaveBeenCalled();
  });

  it('should return correct disabled reason for non-multiple tiles', () => {
    component.tileTypes = mockTileTypes;
    component.canAddTile = (type) => type !== 'telemetry-state';
    
    const telemetryStateTile = mockTileTypes[0];
    const reason = component.getDisabledReason(telemetryStateTile);
    expect(reason).toBe('Only one instance allowed');
  });

  it('should return null for enabled tiles', () => {
    component.tileTypes = mockTileTypes;
    component.canAddTile = () => true;
    
    const reason = component.getDisabledReason(mockTileTypes[0]);
    expect(reason).toBeNull();
  });
});
