import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TileHeaderComponent, TileAction } from './tile-header.component';

describe('TileHeaderComponent', () => {
  let component: TileHeaderComponent;
  let fixture: ComponentFixture<TileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render tile-header element', () => {
      const header = fixture.nativeElement.querySelector('.tile-header');
      expect(header).toBeTruthy();
    });

    it('should display title', () => {
      component.title = 'Test Title';
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.tile-header__title');
      expect(title.textContent).toContain('Test Title');
    });

    it('should display icon when provided', () => {
      component.icon = 'show_chart';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.tile-header__title-icon');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('show_chart');
    });

    it('should not display icon when not provided', () => {
      component.icon = '';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.tile-header__title-icon');
      expect(icon).toBeNull();
    });
  });

  describe('actions', () => {
    const mockActions: TileAction[] = [
      { id: 'folder', icon: 'folder_open', label: 'Open Folder' },
      { id: 'fullscreen', icon: 'fullscreen' },
      { id: 'more', icon: 'more_vert' },
    ];

    it('should render action buttons when provided', () => {
      component.actions = mockActions;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.tile-header__action-btn');
      expect(buttons.length).toBe(3);
    });

    it('should not render actions container when no actions', () => {
      component.actions = [];
      fixture.detectChanges();

      const actionsContainer = fixture.nativeElement.querySelector('.tile-header__actions');
      expect(actionsContainer).toBeNull();
    });

    it('should display action icons', () => {
      component.actions = mockActions;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.tile-header__action-btn');
      expect(buttons[0].querySelector('.material-icons').textContent).toContain('folder_open');
      expect(buttons[1].querySelector('.material-icons').textContent).toContain('fullscreen');
    });

    it('should set title attribute from label', () => {
      component.actions = mockActions;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.tile-header__action-btn');
      expect(buttons[0].getAttribute('title')).toBe('Open Folder');
    });

    it('should use id as title when label not provided', () => {
      component.actions = mockActions;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.tile-header__action-btn');
      expect(buttons[1].getAttribute('title')).toBe('fullscreen');
    });
  });

  describe('events', () => {
    it('should emit actionClick when action button is clicked', () => {
      const mockActions: TileAction[] = [{ id: 'settings', icon: 'settings' }];
      component.actions = mockActions;
      fixture.detectChanges();

      const actionClickSpy = vi.fn();
      component.actionClick.subscribe(actionClickSpy);

      const button = fixture.nativeElement.querySelector('.tile-header__action-btn');
      button.click();

      expect(actionClickSpy).toHaveBeenCalledWith('settings');
    });

    it('should emit correct action id for multiple actions', () => {
      const mockActions: TileAction[] = [
        { id: 'first', icon: 'first_page' },
        { id: 'second', icon: 'last_page' },
      ];
      component.actions = mockActions;
      fixture.detectChanges();

      const actionClickSpy = vi.fn();
      component.actionClick.subscribe(actionClickSpy);

      const buttons = fixture.nativeElement.querySelectorAll('.tile-header__action-btn');
      buttons[1].click();

      expect(actionClickSpy).toHaveBeenCalledWith('second');
    });
  });
});
