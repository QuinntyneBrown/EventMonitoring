import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';

describe('StatusBadgeComponent', () => {
  let component: StatusBadgeComponent;
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should apply normal class by default', () => {
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.classList.contains('status-badge--normal')).toBe(true);
    });

    it('should apply warning class when status is warning', () => {
      component.status = 'warning';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.classList.contains('status-badge--warning')).toBe(true);
    });

    it('should apply critical class when status is critical', () => {
      component.status = 'critical';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.classList.contains('status-badge--critical')).toBe(true);
    });
  });

  describe('label display', () => {
    it('should display capitalized status when no label provided', () => {
      component.status = 'normal';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.textContent).toContain('Normal');
    });

    it('should display custom label when provided', () => {
      component.label = 'OK';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.textContent).toContain('OK');
    });

    it('should display Warning when status is warning', () => {
      component.status = 'warning';
      fixture.detectChanges();
      expect(component.displayLabel).toBe('Warning');
    });

    it('should display Critical when status is critical', () => {
      component.status = 'critical';
      fixture.detectChanges();
      expect(component.displayLabel).toBe('Critical');
    });
  });

  describe('badgeClasses getter', () => {
    it('should return correct classes for normal status', () => {
      component.status = 'normal';
      const classes = component.badgeClasses;
      expect(classes['status-badge']).toBe(true);
      expect(classes['status-badge--normal']).toBe(true);
      expect(classes['status-badge--warning']).toBe(false);
      expect(classes['status-badge--critical']).toBe(false);
    });

    it('should return correct classes for warning status', () => {
      component.status = 'warning';
      const classes = component.badgeClasses;
      expect(classes['status-badge--warning']).toBe(true);
      expect(classes['status-badge--normal']).toBe(false);
    });

    it('should return correct classes for critical status', () => {
      component.status = 'critical';
      const classes = component.badgeClasses;
      expect(classes['status-badge--critical']).toBe(true);
      expect(classes['status-badge--normal']).toBe(false);
    });
  });
});
