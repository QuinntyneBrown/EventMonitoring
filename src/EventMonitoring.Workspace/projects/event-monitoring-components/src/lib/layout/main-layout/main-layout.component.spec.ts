import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MainLayoutComponent } from './main-layout.component';
import { SidenavSection, SidenavItem } from '../sidenav/sidenav.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  const mockSections: SidenavSection[] = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'telemetry', label: 'Telemetry', icon: 'show_chart' },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render main-layout wrapper', () => {
      const layout = fixture.nativeElement.querySelector('.main-layout');
      expect(layout).toBeTruthy();
    });

    it('should render header component', () => {
      const header = fixture.nativeElement.querySelector('em-header');
      expect(header).toBeTruthy();
    });

    it('should render sidenav component', () => {
      const sidenav = fixture.nativeElement.querySelector('em-sidenav');
      expect(sidenav).toBeTruthy();
    });

    it('should render content component', () => {
      const content = fixture.nativeElement.querySelector('em-content');
      expect(content).toBeTruthy();
    });
  });

  describe('collapsed sidenav', () => {
    it('should hide sidenav when collapsed', () => {
      component.sidenavCollapsed = true;
      fixture.detectChanges();

      const sidenav = fixture.nativeElement.querySelector('em-sidenav');
      expect(sidenav).toBeNull();
    });

    it('should apply collapsed class to layout', () => {
      component.sidenavCollapsed = true;
      fixture.detectChanges();

      const layout = fixture.nativeElement.querySelector('.main-layout');
      expect(layout.classList.contains('main-layout--sidenav-collapsed')).toBe(true);
    });

    it('should show sidenav when not collapsed', () => {
      component.sidenavCollapsed = false;
      fixture.detectChanges();

      const sidenav = fixture.nativeElement.querySelector('em-sidenav');
      expect(sidenav).toBeTruthy();
    });
  });

  describe('input propagation', () => {
    it('should pass title to header', () => {
      component.title = 'Custom Title';
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('em-header');
      expect(header.getAttribute('ng-reflect-title')).toBe('Custom Title');
    });

    it('should pass mode to header', () => {
      component.mode = 'review';
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('em-header');
      expect(header.getAttribute('ng-reflect-mode')).toBe('review');
    });

    it('should pass sections to sidenav', () => {
      component.sidenavSections = mockSections;
      fixture.detectChanges();

      const sidenav = fixture.nativeElement.querySelector('em-sidenav');
      expect(sidenav).toBeTruthy();
    });

    it('should pass activeNavItemId to sidenav', () => {
      component.sidenavSections = mockSections;
      component.activeNavItemId = 'dashboard';
      fixture.detectChanges();

      const sidenav = fixture.nativeElement.querySelector('em-sidenav');
      expect(sidenav.getAttribute('ng-reflect-active-item-id')).toBe('dashboard');
    });
  });

  describe('event forwarding', () => {
    it('should emit menuClick when header menu is clicked', () => {
      const menuClickSpy = vi.fn();
      component.menuClick.subscribe(menuClickSpy);

      component.onMenuClick();

      expect(menuClickSpy).toHaveBeenCalled();
    });

    it('should emit editToggle when header edit toggle is clicked', () => {
      const editToggleSpy = vi.fn();
      component.editToggle.subscribe(editToggleSpy);

      component.onEditToggle();

      expect(editToggleSpy).toHaveBeenCalled();
    });

    it('should emit headerActionClick with action id', () => {
      const headerActionClickSpy = vi.fn();
      component.headerActionClick.subscribe(headerActionClickSpy);

      component.onHeaderActionClick('settings');

      expect(headerActionClickSpy).toHaveBeenCalledWith('settings');
    });

    it('should emit navItemClick with item', () => {
      const navItemClickSpy = vi.fn();
      component.navItemClick.subscribe(navItemClickSpy);

      const item: SidenavItem = { id: 'test', label: 'Test', icon: 'test' };
      component.onNavItemClick(item);

      expect(navItemClickSpy).toHaveBeenCalledWith(item);
    });
  });

  describe('default values', () => {
    it('should have default title', () => {
      expect(component.title).toBe('Event Monitoring System');
    });

    it('should have default logoIcon', () => {
      expect(component.logoIcon).toBe('satellite_alt');
    });

    it('should have default mode as live', () => {
      expect(component.mode).toBe('live');
    });

    it('should show edit toggle by default', () => {
      expect(component.showEditToggle).toBe(true);
    });

    it('should not be in edit mode by default', () => {
      expect(component.editModeActive).toBe(false);
    });

    it('should have default header actions', () => {
      expect(component.headerActions.length).toBe(3);
      expect(component.headerActions[0].id).toBe('notifications');
    });

    it('should have empty sidenav sections by default', () => {
      expect(component.sidenavSections).toEqual([]);
    });

    it('should not be collapsed by default', () => {
      expect(component.sidenavCollapsed).toBe(false);
    });
  });
});
