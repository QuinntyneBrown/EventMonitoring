import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoBoxComponent } from './info-box.component';

describe('InfoBoxComponent', () => {
  let component: InfoBoxComponent;
  let fixture: ComponentFixture<InfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should apply info variant class by default', () => {
      const box = fixture.nativeElement.querySelector('.info-box');
      expect(box.classList.contains('info-box--info')).toBe(true);
    });

    it('should apply live variant class when variant is live', () => {
      component.variant = 'live';
      fixture.detectChanges();
      const box = fixture.nativeElement.querySelector('.info-box');
      expect(box.classList.contains('info-box--live')).toBe(true);
    });

    it('should apply review variant class when variant is review', () => {
      component.variant = 'review';
      fixture.detectChanges();
      const box = fixture.nativeElement.querySelector('.info-box');
      expect(box.classList.contains('info-box--review')).toBe(true);
    });

    it('should display info icon by default', () => {
      const icon = fixture.nativeElement.querySelector('.info-box__icon');
      expect(icon.textContent).toContain('info');
    });

    it('should display custom icon when provided', () => {
      component.icon = 'warning';
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.info-box__icon');
      expect(icon.textContent).toContain('warning');
    });
  });

  describe('boxClasses getter', () => {
    it('should return correct classes for info variant', () => {
      component.variant = 'info';
      const classes = component.boxClasses;
      expect(classes['info-box']).toBe(true);
      expect(classes['info-box--info']).toBe(true);
      expect(classes['info-box--live']).toBe(false);
      expect(classes['info-box--review']).toBe(false);
    });

    it('should return correct classes for live variant', () => {
      component.variant = 'live';
      const classes = component.boxClasses;
      expect(classes['info-box--live']).toBe(true);
      expect(classes['info-box--info']).toBe(false);
    });

    it('should return correct classes for review variant', () => {
      component.variant = 'review';
      const classes = component.boxClasses;
      expect(classes['info-box--review']).toBe(true);
      expect(classes['info-box--info']).toBe(false);
    });
  });
});
