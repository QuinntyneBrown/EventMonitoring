import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeIndicatorComponent } from './mode-indicator.component';

describe('ModeIndicatorComponent', () => {
  let component: ModeIndicatorComponent;
  let fixture: ComponentFixture<ModeIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModeIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display LIVE MODE by default', () => {
      const label = fixture.nativeElement.querySelector('.mode-indicator__label');
      expect(label.textContent).toContain('LIVE MODE');
    });

    it('should display REVIEW MODE when mode is review', () => {
      component.mode = 'review';
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('.mode-indicator__label');
      expect(label.textContent).toContain('REVIEW MODE');
    });

    it('should apply live class by default', () => {
      const indicator = fixture.nativeElement.querySelector('.mode-indicator');
      expect(indicator.classList.contains('mode-indicator--live')).toBe(true);
    });

    it('should apply review class when mode is review', () => {
      component.mode = 'review';
      fixture.detectChanges();
      const indicator = fixture.nativeElement.querySelector('.mode-indicator');
      expect(indicator.classList.contains('mode-indicator--review')).toBe(true);
    });
  });

  describe('pulse animation', () => {
    it('should apply pulse class to dot in live mode by default', () => {
      const dot = fixture.nativeElement.querySelector('.mode-indicator__dot');
      expect(dot.classList.contains('mode-indicator__dot--pulse')).toBe(true);
    });

    it('should not apply pulse class in review mode', () => {
      component.mode = 'review';
      fixture.detectChanges();
      const dot = fixture.nativeElement.querySelector('.mode-indicator__dot');
      expect(dot.classList.contains('mode-indicator__dot--pulse')).toBe(false);
    });

    it('should not apply pulse class when showPulse is false', () => {
      component.showPulse = false;
      fixture.detectChanges();
      const dot = fixture.nativeElement.querySelector('.mode-indicator__dot');
      expect(dot.classList.contains('mode-indicator__dot--pulse')).toBe(false);
    });
  });

  describe('indicatorClasses getter', () => {
    it('should return correct classes for live mode', () => {
      component.mode = 'live';
      const classes = component.indicatorClasses;
      expect(classes['mode-indicator']).toBe(true);
      expect(classes['mode-indicator--live']).toBe(true);
      expect(classes['mode-indicator--review']).toBe(false);
    });

    it('should return correct classes for review mode', () => {
      component.mode = 'review';
      const classes = component.indicatorClasses;
      expect(classes['mode-indicator--review']).toBe(true);
      expect(classes['mode-indicator--live']).toBe(false);
    });
  });

  describe('modeLabel getter', () => {
    it('should return LIVE MODE for live mode', () => {
      component.mode = 'live';
      expect(component.modeLabel).toBe('LIVE MODE');
    });

    it('should return REVIEW MODE for review mode', () => {
      component.mode = 'review';
      expect(component.modeLabel).toBe('REVIEW MODE');
    });
  });
});
