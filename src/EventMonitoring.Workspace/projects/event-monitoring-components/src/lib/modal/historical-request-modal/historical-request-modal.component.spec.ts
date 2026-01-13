import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { HistoricalRequestModalComponent, TimeRange } from './historical-request-modal.component';

describe('HistoricalRequestModalComponent', () => {
  let component: HistoricalRequestModalComponent;
  let fixture: ComponentFixture<HistoricalRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalRequestModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricalRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render modal overlay', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const modal = fixture.nativeElement.querySelector('em-modal-overlay');
      expect(modal).toBeTruthy();
    });

    it('should render info box', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const infoBox = fixture.nativeElement.querySelector('em-info-box');
      expect(infoBox).toBeTruthy();
    });

    it('should render quick select buttons', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.quick-select__btn');
      expect(buttons.length).toBe(5); // 4 time ranges + custom
    });

    it('should render datetime inputs', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const inputs = fixture.nativeElement.querySelectorAll('.form-group__input');
      expect(inputs.length).toBe(2);
    });

    it('should render summary section', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const summary = fixture.nativeElement.querySelector('.summary');
      expect(summary).toBeTruthy();
    });
  });

  describe('time ranges', () => {
    it('should have predefined time ranges', () => {
      expect(component.timeRanges.length).toBe(4);
      expect(component.timeRanges[0].hours).toBe(1);
      expect(component.timeRanges[1].hours).toBe(4);
      expect(component.timeRanges[2].hours).toBe(8);
      expect(component.timeRanges[3].hours).toBe(24);
    });

    it('should have default time range selected', () => {
      expect(component.selectedTimeRange).toBeTruthy();
      expect(component.selectedTimeRange?.hours).toBe(8);
    });
  });

  describe('quick select', () => {
    it('should select quick range', () => {
      const range: TimeRange = { label: 'Last 4 hours', hours: 4 };
      component.onQuickSelect(range);

      expect(component.selectedTimeRange).toBe(range);
    });

    it('should update datetime fields on quick select', () => {
      const range: TimeRange = { label: 'Last 1 hour', hours: 1 };
      component.onQuickSelect(range);

      expect(component.startDateTime).toBeTruthy();
      expect(component.endDateTime).toBeTruthy();
    });

    it('should return true for selected range', () => {
      const range: TimeRange = { label: 'Last 8 hours', hours: 8 };
      component.selectedTimeRange = range;

      expect(component.isRangeSelected(range)).toBe(true);
    });

    it('should return false for non-selected range', () => {
      component.selectedTimeRange = { label: 'Last 8 hours', hours: 8 };
      const otherRange: TimeRange = { label: 'Last 4 hours', hours: 4 };

      expect(component.isRangeSelected(otherRange)).toBe(false);
    });

    it('should clear selected range on custom', () => {
      component.selectedTimeRange = { label: 'Last 8 hours', hours: 8 };
      component.onCustomRange();

      expect(component.selectedTimeRange).toBeNull();
    });
  });

  describe('calculations', () => {
    beforeEach(() => {
      component.activeSubscriptions = 12;
      component.recordsPerSecond = 5;
      component.pageSize = 100;
    });

    it('should calculate time range in hours', () => {
      const now = new Date();
      const hoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
      component.startDateTime = hoursAgo.toISOString().slice(0, 16);
      component.endDateTime = now.toISOString().slice(0, 16);

      expect(component.timeRangeHours).toBe(8);
    });

    it('should calculate estimated records', () => {
      component.startDateTime = '2026-01-11T08:00';
      component.endDateTime = '2026-01-11T16:00'; // 8 hours
      fixture.detectChanges();

      // 8 hours * 60 min * 60 sec * 5 records/sec * 12 subscriptions = 1,728,000
      expect(component.estimatedRecords).toBe(1728000);
    });

    it('should calculate estimated pages', () => {
      component.startDateTime = '2026-01-11T08:00';
      component.endDateTime = '2026-01-11T16:00';
      fixture.detectChanges();

      // 1,728,000 records / 100 per page = 17,280 pages
      expect(component.estimatedPages).toBe(17280);
    });

    it('should return 0 for time range when dates are invalid', () => {
      component.startDateTime = '';
      component.endDateTime = '';

      expect(component.timeRangeHours).toBe(0);
    });
  });

  describe('formatting', () => {
    it('should format large record counts with M suffix', () => {
      component.startDateTime = '2026-01-10T08:00';
      component.endDateTime = '2026-01-11T16:00';

      const formatted = component.formatEstimatedRecords();
      expect(formatted).toContain('M records');
    });

    it('should format estimated pages', () => {
      component.startDateTime = '2026-01-11T08:00';
      component.endDateTime = '2026-01-11T16:00';

      const formatted = component.formatEstimatedPages();
      expect(formatted).toContain('pages');
    });

    it('should format load time in seconds', () => {
      component.startDateTime = '2026-01-11T15:00';
      component.endDateTime = '2026-01-11T16:00';

      const formatted = component.formatEstimatedLoadTime();
      expect(formatted).toContain('seconds');
    });

    it('should format load time in minutes for large requests', () => {
      component.startDateTime = '2026-01-10T08:00';
      component.endDateTime = '2026-01-11T16:00';

      const formatted = component.formatEstimatedLoadTime();
      expect(formatted).toContain('minutes');
    });
  });

  describe('validation', () => {
    it('should be valid when dates are set and range is positive', () => {
      const now = new Date();
      const hoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
      component.startDateTime = hoursAgo.toISOString().slice(0, 16);
      component.endDateTime = now.toISOString().slice(0, 16);

      expect(component.isValid).toBe(true);
    });

    it('should be invalid when start date is empty', () => {
      component.startDateTime = '';
      component.endDateTime = '2026-01-11T16:00';

      expect(component.isValid).toBe(false);
    });

    it('should be invalid when end date is empty', () => {
      component.startDateTime = '2026-01-11T08:00';
      component.endDateTime = '';

      expect(component.isValid).toBe(false);
    });

    it('should be invalid when time range is zero', () => {
      component.startDateTime = '2026-01-11T16:00';
      component.endDateTime = '2026-01-11T16:00';

      expect(component.isValid).toBe(false);
    });
  });

  describe('events', () => {
    it('should emit closed on close', () => {
      const closedSpy = vi.fn();
      component.closed.subscribe(closedSpy);

      component.onClose();

      expect(closedSpy).toHaveBeenCalled();
    });

    it('should emit loadData with request details', () => {
      component.startDateTime = '2026-01-11T08:00';
      component.endDateTime = '2026-01-11T16:00';
      component.activeSubscriptions = 12;

      const loadDataSpy = vi.fn();
      component.loadData.subscribe(loadDataSpy);

      component.onLoadData();

      expect(loadDataSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          startDateTime: '2026-01-11T08:00',
          endDateTime: '2026-01-11T16:00',
          timeRangeHours: 8,
          activeSubscriptions: 12,
        })
      );
    });

    it('should close modal after loading data', () => {
      const closedSpy = vi.fn();
      component.closed.subscribe(closedSpy);
      component.startDateTime = '2026-01-11T08:00';
      component.endDateTime = '2026-01-11T16:00';

      component.onLoadData();

      expect(closedSpy).toHaveBeenCalled();
    });
  });
});
