import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TilePlaceholderComponent } from './tile-placeholder.component';

describe('TilePlaceholderComponent', () => {
  let component: TilePlaceholderComponent;
  let fixture: ComponentFixture<TilePlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilePlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TilePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render tile-placeholder element', () => {
      const placeholder = fixture.nativeElement.querySelector('.tile-placeholder');
      expect(placeholder).toBeTruthy();
    });

    it('should display default icon', () => {
      const icon = fixture.nativeElement.querySelector('.tile-placeholder__icon');
      expect(icon.textContent).toContain('add');
    });

    it('should display custom icon when provided', () => {
      component.icon = 'widgets';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.tile-placeholder__icon');
      expect(icon.textContent).toContain('widgets');
    });

    it('should display default text', () => {
      const text = fixture.nativeElement.querySelector('.tile-placeholder__text');
      expect(text.textContent).toContain('Add Tile');
    });

    it('should display custom text when provided', () => {
      component.text = 'Click to add widget';
      fixture.detectChanges();

      const text = fixture.nativeElement.querySelector('.tile-placeholder__text');
      expect(text.textContent).toContain('Click to add widget');
    });
  });

  describe('grid positioning', () => {
    it('should apply default gridColumn style', () => {
      const placeholder = fixture.nativeElement.querySelector('.tile-placeholder');
      expect(placeholder.style.gridColumn).toBe('span 3');
    });

    it('should apply custom gridColumn style', () => {
      component.gridColumn = 'span 6';
      fixture.detectChanges();

      const placeholder = fixture.nativeElement.querySelector('.tile-placeholder');
      expect(placeholder.style.gridColumn).toBe('span 6');
    });

    it('should apply default gridRow style', () => {
      const placeholder = fixture.nativeElement.querySelector('.tile-placeholder');
      expect(placeholder.style.gridRow).toBe('span 2');
    });

    it('should apply custom gridRow style', () => {
      component.gridRow = 'span 4';
      fixture.detectChanges();

      const placeholder = fixture.nativeElement.querySelector('.tile-placeholder');
      expect(placeholder.style.gridRow).toBe('span 4');
    });
  });

  describe('events', () => {
    it('should emit add when clicked', () => {
      const addSpy = vi.fn();
      component.add.subscribe(addSpy);

      const placeholder = fixture.nativeElement.querySelector('.tile-placeholder');
      placeholder.click();

      expect(addSpy).toHaveBeenCalled();
    });

    it('should emit add through onAdd method', () => {
      const addSpy = vi.fn();
      component.add.subscribe(addSpy);

      component.onAdd();

      expect(addSpy).toHaveBeenCalled();
    });
  });

  describe('default values', () => {
    it('should have default icon', () => {
      expect(component.icon).toBe('add');
    });

    it('should have default text', () => {
      expect(component.text).toBe('Add Tile');
    });

    it('should have default gridColumn', () => {
      expect(component.gridColumn).toBe('span 3');
    });

    it('should have default gridRow', () => {
      expect(component.gridRow).toBe('span 2');
    });
  });
});
