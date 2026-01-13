import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display search icon by default', () => {
      const icon = fixture.nativeElement.querySelector('.search-bar__icon');
      expect(icon.textContent).toContain('search');
    });

    it('should display custom icon when provided', () => {
      component.icon = 'filter_list';
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.search-bar__icon');
      expect(icon.textContent).toContain('filter_list');
    });

    it('should display placeholder text', () => {
      component.placeholder = 'Search files...';
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('.search-bar__input');
      expect(input.placeholder).toBe('Search files...');
    });
  });

  describe('disabled state', () => {
    it('should apply disabled class when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const searchBar = fixture.nativeElement.querySelector('.search-bar');
      expect(searchBar.classList.contains('search-bar--disabled')).toBe(true);
    });

    it('should disable input when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('.search-bar__input');
      expect(input.disabled).toBe(true);
    });
  });

  describe('input handling', () => {
    it('should emit searchChange on input', () => {
      const searchChangeSpy = vi.fn();
      component.searchChange.subscribe(searchChangeSpy);

      const input = fixture.nativeElement.querySelector('.search-bar__input');
      input.value = 'test';
      input.dispatchEvent(new Event('input'));

      expect(searchChangeSpy).toHaveBeenCalledWith('test');
    });

    it('should update value on input change', () => {
      const input = fixture.nativeElement.querySelector('.search-bar__input');
      input.value = 'hello';
      input.dispatchEvent(new Event('input'));

      expect(component.value).toBe('hello');
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value correctly', () => {
      component.writeValue('test value');
      expect(component.value).toBe('test value');
    });

    it('should write empty string for null value', () => {
      component.writeValue(null as unknown as string);
      expect(component.value).toBe('');
    });

    it('should register onChange callback', () => {
      const onChangeFn = vi.fn();
      component.registerOnChange(onChangeFn);

      const input = fixture.nativeElement.querySelector('.search-bar__input');
      input.value = 'test';
      input.dispatchEvent(new Event('input'));

      expect(onChangeFn).toHaveBeenCalledWith('test');
    });

    it('should register onTouched callback', () => {
      const onTouchedFn = vi.fn();
      component.registerOnTouched(onTouchedFn);

      const input = fixture.nativeElement.querySelector('.search-bar__input');
      input.dispatchEvent(new Event('blur'));

      expect(onTouchedFn).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);

      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });
});
