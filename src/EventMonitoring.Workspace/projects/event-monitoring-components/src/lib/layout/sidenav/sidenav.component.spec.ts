import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { SidenavComponent, SidenavSection, SidenavItem } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  const mockSections: SidenavSection[] = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'telemetry', label: 'Telemetry', icon: 'show_chart' },
      ],
    },
    {
      title: 'Configuration',
      items: [
        { id: 'config', label: 'Config Files', icon: 'folder' },
        { id: 'settings', label: 'Settings', icon: 'tune' },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render nav element with sidenav class', () => {
      const nav = fixture.nativeElement.querySelector('.sidenav');
      expect(nav).toBeTruthy();
    });

    it('should render sections when provided', () => {
      component.sections = mockSections;
      fixture.detectChanges();

      const sections = fixture.nativeElement.querySelectorAll('.sidenav__section');
      expect(sections.length).toBe(2);
    });

    it('should render section titles', () => {
      component.sections = mockSections;
      fixture.detectChanges();

      const titles = fixture.nativeElement.querySelectorAll('.sidenav__section-title');
      expect(titles[0].textContent).toContain('Main');
      expect(titles[1].textContent).toContain('Configuration');
    });

    it('should render items with icons and labels', () => {
      component.sections = mockSections;
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.sidenav__item');
      expect(items.length).toBe(4);

      const firstItem = items[0];
      expect(firstItem.textContent).toContain('Dashboard');
      expect(firstItem.querySelector('.sidenav__item-icon').textContent).toContain('dashboard');
    });

    it('should render dividers between sections', () => {
      component.sections = mockSections;
      fixture.detectChanges();

      const dividers = fixture.nativeElement.querySelectorAll('.sidenav__divider');
      expect(dividers.length).toBe(1);
    });
  });

  describe('active state', () => {
    beforeEach(() => {
      component.sections = mockSections;
    });

    it('should apply active class to active item', () => {
      component.activeItemId = 'dashboard';
      fixture.detectChanges();

      const activeItem = fixture.nativeElement.querySelector('.sidenav__item--active');
      expect(activeItem).toBeTruthy();
      expect(activeItem.textContent).toContain('Dashboard');
    });

    it('should not apply active class when no active item', () => {
      component.activeItemId = null;
      fixture.detectChanges();

      const activeItem = fixture.nativeElement.querySelector('.sidenav__item--active');
      expect(activeItem).toBeNull();
    });

    it('should return true for active item in isActive method', () => {
      component.activeItemId = 'dashboard';
      const item: SidenavItem = { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' };

      expect(component.isActive(item)).toBe(true);
    });

    it('should return false for inactive item in isActive method', () => {
      component.activeItemId = 'dashboard';
      const item: SidenavItem = { id: 'telemetry', label: 'Telemetry', icon: 'show_chart' };

      expect(component.isActive(item)).toBe(false);
    });
  });

  describe('item click', () => {
    it('should emit itemClick when item is clicked', () => {
      component.sections = mockSections;
      fixture.detectChanges();

      const itemClickSpy = vi.fn();
      component.itemClick.subscribe(itemClickSpy);

      const firstItem = fixture.nativeElement.querySelector('.sidenav__item');
      firstItem.click();

      expect(itemClickSpy).toHaveBeenCalledWith(mockSections[0].items[0]);
    });

    it('should call onItemClick with correct item', () => {
      const item: SidenavItem = { id: 'test', label: 'Test', icon: 'test_icon' };
      const itemClickSpy = vi.fn();
      component.itemClick.subscribe(itemClickSpy);

      component.onItemClick(item);

      expect(itemClickSpy).toHaveBeenCalledWith(item);
    });
  });
});
