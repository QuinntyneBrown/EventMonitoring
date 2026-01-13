import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { HeaderComponent, HeaderAction } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render header element', () => {
      const header = fixture.nativeElement.querySelector('.header');
      expect(header).toBeTruthy();
    });

    it('should display default title', () => {
      const title = fixture.nativeElement.querySelector('.header__title');
      expect(title.textContent).toBe('Event Monitoring System');
    });

    it('should display custom title when provided', () => {
      component.title = 'Custom Title';
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.header__title');
      expect(title.textContent).toBe('Custom Title');
    });

    it('should display logo icon', () => {
      const icon = fixture.nativeElement.querySelector('.header__logo-icon');
      expect(icon.textContent).toContain('satellite_alt');
    });

    it('should display custom logo icon when provided', () => {
      component.logoIcon = 'rocket';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.header__logo-icon');
      expect(icon.textContent).toContain('rocket');
    });

    it('should render mode indicator', () => {
      const modeIndicator = fixture.nativeElement.querySelector('em-mode-indicator');
      expect(modeIndicator).toBeTruthy();
    });

    it('should render edit toggle by default', () => {
      const editToggle = fixture.nativeElement.querySelector('.header__edit-toggle');
      expect(editToggle).toBeTruthy();
    });

    it('should hide edit toggle when showEditToggle is false', () => {
      component.showEditToggle = false;
      fixture.detectChanges();

      const editToggle = fixture.nativeElement.querySelector('.header__edit-toggle');
      expect(editToggle).toBeNull();
    });

    it('should render default action buttons', () => {
      const actionButtons = fixture.nativeElement.querySelectorAll('.header__btn');
      expect(actionButtons.length).toBe(3);
    });
  });

  describe('edit mode', () => {
    it('should apply active class when editModeActive is true', () => {
      component.editModeActive = true;
      fixture.detectChanges();

      const editToggle = fixture.nativeElement.querySelector('.header__edit-toggle');
      expect(editToggle.classList.contains('header__edit-toggle--active')).toBe(true);
    });

    it('should not apply active class when editModeActive is false', () => {
      component.editModeActive = false;
      fixture.detectChanges();

      const editToggle = fixture.nativeElement.querySelector('.header__edit-toggle');
      expect(editToggle.classList.contains('header__edit-toggle--active')).toBe(false);
    });
  });

  describe('events', () => {
    it('should emit menuClick when menu button is clicked', () => {
      const menuClickSpy = vi.fn();
      component.menuClick.subscribe(menuClickSpy);

      const menuBtn = fixture.nativeElement.querySelector('.header__menu-btn');
      menuBtn.click();

      expect(menuClickSpy).toHaveBeenCalled();
    });

    it('should emit editToggle when edit toggle is clicked', () => {
      const editToggleSpy = vi.fn();
      component.editToggle.subscribe(editToggleSpy);

      const editBtn = fixture.nativeElement.querySelector('.header__edit-toggle');
      editBtn.click();

      expect(editToggleSpy).toHaveBeenCalled();
    });

    it('should emit actionClick with action id when action button is clicked', () => {
      const actionClickSpy = vi.fn();
      component.actionClick.subscribe(actionClickSpy);

      const actionBtns = fixture.nativeElement.querySelectorAll('.header__btn');
      actionBtns[0].click();

      expect(actionClickSpy).toHaveBeenCalledWith('notifications');
    });
  });

  describe('custom actions', () => {
    it('should render custom actions', () => {
      const customActions: HeaderAction[] = [
        { id: 'refresh', icon: 'refresh' },
        { id: 'download', icon: 'download', label: 'Download Data' },
      ];
      component.actions = customActions;
      fixture.detectChanges();

      const actionBtns = fixture.nativeElement.querySelectorAll('.header__btn');
      expect(actionBtns.length).toBe(2);
    });

    it('should emit correct action id for custom actions', () => {
      const customActions: HeaderAction[] = [{ id: 'custom-action', icon: 'star' }];
      component.actions = customActions;
      fixture.detectChanges();

      const actionClickSpy = vi.fn();
      component.actionClick.subscribe(actionClickSpy);

      const actionBtn = fixture.nativeElement.querySelector('.header__btn');
      actionBtn.click();

      expect(actionClickSpy).toHaveBeenCalledWith('custom-action');
    });
  });

  describe('mode', () => {
    it('should pass mode to mode indicator', () => {
      component.mode = 'review';
      fixture.detectChanges();

      const modeIndicator = fixture.nativeElement.querySelector('em-mode-indicator');
      expect(modeIndicator.getAttribute('ng-reflect-mode')).toBe('review');
    });
  });
});
