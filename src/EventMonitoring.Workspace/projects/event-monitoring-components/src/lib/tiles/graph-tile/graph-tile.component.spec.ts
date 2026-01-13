import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GraphTileComponent, GraphSeries } from './graph-tile.component';

describe('GraphTileComponent', () => {
  let component: GraphTileComponent;
  let fixture: ComponentFixture<GraphTileComponent>;

  const mockSeries: GraphSeries[] = [
    {
      label: 'Temperature',
      data: [
        { timestamp: '0s', value: 850 },
        { timestamp: '3s', value: 855 },
        { timestamp: '6s', value: 860 },
        { timestamp: '9s', value: 872 },
      ],
      color: '#bb86fc',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render em-tile component', () => {
      const tile = fixture.nativeElement.querySelector('em-tile');
      expect(tile).toBeTruthy();
    });

    it('should render chart container', () => {
      const container = fixture.nativeElement.querySelector('.graph-tile__chart-container');
      expect(container).toBeTruthy();
    });

    it('should render canvas element', () => {
      const canvas = fixture.nativeElement.querySelector('canvas');
      expect(canvas).toBeTruthy();
    });

    it('should show empty state when no series', () => {
      component.series = [];
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.graph-tile__empty');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('No data available');
    });
  });

  describe('inputs', () => {
    it('should have default icon', () => {
      expect(component.icon).toBe('show_chart');
    });

    it('should have default graph type as line', () => {
      expect(component.graphType).toBe('line');
    });

    it('should have default actions', () => {
      expect(component.actions.length).toBe(3);
    });

    it('should not show legend by default', () => {
      expect(component.showLegend).toBe(false);
    });

    it('should accept custom y-axis bounds', () => {
      component.yAxisMin = 0;
      component.yAxisMax = 100;

      expect(component.yAxisMin).toBe(0);
      expect(component.yAxisMax).toBe(100);
    });
  });

  describe('graph types', () => {
    it('should accept line type', () => {
      component.graphType = 'line';
      expect(component.graphType).toBe('line');
    });

    it('should accept bar type', () => {
      component.graphType = 'bar';
      expect(component.graphType).toBe('bar');
    });

    it('should accept area type', () => {
      component.graphType = 'area';
      expect(component.graphType).toBe('area');
    });
  });

  describe('series', () => {
    it('should accept series data', () => {
      component.series = mockSeries;
      fixture.detectChanges();

      expect(component.series.length).toBe(1);
      expect(component.series[0].data.length).toBe(4);
    });

    it('should handle multiple series', () => {
      const multipleSeries: GraphSeries[] = [
        { label: 'Series 1', data: [{ timestamp: '0', value: 10 }] },
        { label: 'Series 2', data: [{ timestamp: '0', value: 20 }] },
      ];
      component.series = multipleSeries;

      expect(component.series.length).toBe(2);
    });
  });

  describe('events', () => {
    it('should emit actionClick when tile action is clicked', () => {
      const actionClickSpy = vi.fn();
      component.actionClick.subscribe(actionClickSpy);

      component.onActionClick('fullscreen');

      expect(actionClickSpy).toHaveBeenCalledWith('fullscreen');
    });
  });
});
