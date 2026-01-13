import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TabularTileComponent, TabularRow } from './tabular-tile.component';

describe('TabularTileComponent', () => {
  let component: TabularTileComponent;
  let fixture: ComponentFixture<TabularTileComponent>;

  const mockRows: TabularRow[] = [
    { id: '1', parameter: 'Altitude', value: 408.2, unit: 'km', status: 'normal', timestamp: '14:45:32.234' },
    { id: '2', parameter: 'Velocity', value: 7.66, unit: 'km/s', status: 'normal', timestamp: '14:45:32.234' },
    { id: '3', parameter: 'Fuel Pressure', value: 324.7, unit: 'kPa', status: 'warning', timestamp: '14:45:32.234' },
    { id: '4', parameter: 'Chamber Pressure', value: 2.1, unit: 'MPa', status: 'critical', timestamp: '14:45:32.234' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabularTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabularTileComponent);
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

    it('should render table', () => {
      const table = fixture.nativeElement.querySelector('.tabular-tile__table');
      expect(table).toBeTruthy();
    });

    it('should render table headers', () => {
      const headers = fixture.nativeElement.querySelectorAll('th');
      expect(headers.length).toBe(4); // Parameter, Value, Status, UST
    });

    it('should render rows when provided', () => {
      component.rows = mockRows;
      fixture.detectChanges();

      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(4);
    });

    it('should show empty state when no rows', () => {
      component.rows = [];
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.tabular-tile__empty');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('No data available');
    });
  });

  describe('timestamp column', () => {
    it('should show timestamp column by default', () => {
      const headers = fixture.nativeElement.querySelectorAll('th');
      const headerTexts = Array.from(headers).map((h: Element) => h.textContent);
      expect(headerTexts).toContain('UST');
    });

    it('should hide timestamp column when showTimestamp is false', () => {
      component.showTimestamp = false;
      fixture.detectChanges();

      const headers = fixture.nativeElement.querySelectorAll('th');
      expect(headers.length).toBe(3);
    });
  });

  describe('value formatting', () => {
    it('should format value with unit', () => {
      const row: TabularRow = { id: '1', parameter: 'Test', value: 100, unit: 'km', status: 'normal' };
      expect(component.formatValue(row)).toBe('100 km');
    });

    it('should format value without unit', () => {
      const row: TabularRow = { id: '1', parameter: 'Test', value: 'Active', status: 'normal' };
      expect(component.formatValue(row)).toBe('Active');
    });
  });

  describe('value class', () => {
    it('should return warning class for warning status', () => {
      expect(component.getValueClass('warning')).toBe('tabular-tile__value--warning');
    });

    it('should return critical class for critical status', () => {
      expect(component.getValueClass('critical')).toBe('tabular-tile__value--critical');
    });

    it('should return empty string for normal status', () => {
      expect(component.getValueClass('normal')).toBe('');
    });
  });

  describe('status badges', () => {
    it('should render status badges for each row', () => {
      component.rows = mockRows;
      fixture.detectChanges();

      const badges = fixture.nativeElement.querySelectorAll('em-status-badge');
      expect(badges.length).toBe(4);
    });
  });

  describe('events', () => {
    it('should emit actionClick when tile action is clicked', () => {
      const actionClickSpy = vi.fn();
      component.actionClick.subscribe(actionClickSpy);

      component.onActionClick('folder');

      expect(actionClickSpy).toHaveBeenCalledWith('folder');
    });

    it('should emit rowClick when row is clicked', () => {
      component.rows = mockRows;
      fixture.detectChanges();

      const rowClickSpy = vi.fn();
      component.rowClick.subscribe(rowClickSpy);

      const firstRow = fixture.nativeElement.querySelector('tbody tr');
      firstRow.click();

      expect(rowClickSpy).toHaveBeenCalledWith(mockRows[0]);
    });
  });

  describe('default values', () => {
    it('should have default icon', () => {
      expect(component.icon).toBe('table_chart');
    });

    it('should have default actions', () => {
      expect(component.actions.length).toBe(2);
      expect(component.actions[0].id).toBe('folder');
    });

    it('should show timestamp by default', () => {
      expect(component.showTimestamp).toBe(true);
    });
  });
});
