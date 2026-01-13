import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should apply primary variant class by default', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn--primary')).toBe(true);
    });

    it('should apply secondary variant class when variant is secondary', () => {
      component.variant = 'secondary';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn--secondary')).toBe(true);
    });

    it('should apply icon variant class when variant is icon', () => {
      component.variant = 'icon';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn--icon')).toBe(true);
    });

    it('should render icon when icon input is provided', () => {
      component.icon = 'settings';
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.btn__icon');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('settings');
    });

    it('should render label when label input is provided', () => {
      component.label = 'Click me';
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('.btn__label');
      expect(label).toBeTruthy();
      expect(label.textContent).toContain('Click me');
    });

    it('should set button type correctly', () => {
      component.type = 'submit';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.type).toBe('submit');
    });
  });

  describe('disabled state', () => {
    it('should apply disabled class when disabled is true', () => {
      component.disabled = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn--disabled')).toBe(true);
    });

    it('should set disabled attribute when disabled is true', () => {
      component.disabled = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it('should have aria-disabled attribute when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('interactions', () => {
    it('should emit clicked event when button is clicked', () => {
      const clickedSpy = vi.fn();
      component.clicked.subscribe(clickedSpy);

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(clickedSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit clicked event when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const clickedSpy = vi.fn();
      component.clicked.subscribe(clickedSpy);

      component.onClick();

      expect(clickedSpy).not.toHaveBeenCalled();
    });
  });

  describe('buttonClasses getter', () => {
    it('should return correct classes for primary variant', () => {
      component.variant = 'primary';
      const classes = component.buttonClasses;
      expect(classes['btn']).toBe(true);
      expect(classes['btn--primary']).toBe(true);
      expect(classes['btn--secondary']).toBe(false);
      expect(classes['btn--icon']).toBe(false);
    });

    it('should include disabled class when disabled', () => {
      component.disabled = true;
      const classes = component.buttonClasses;
      expect(classes['btn--disabled']).toBe(true);
    });
  });
});
