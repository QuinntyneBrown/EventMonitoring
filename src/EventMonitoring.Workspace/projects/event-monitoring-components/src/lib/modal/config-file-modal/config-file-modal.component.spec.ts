import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ConfigFileModalComponent, ConfigFile } from './config-file-modal.component';

describe('ConfigFileModalComponent', () => {
  let component: ConfigFileModalComponent;
  let fixture: ComponentFixture<ConfigFileModalComponent>;

  const mockConfigFiles: ConfigFile[] = [
    {
      id: '1',
      name: 'Propulsion System Telemetry',
      path: '/configs/propulsion/telemetry.json',
      itemCount: 12,
      lastModified: new Date('2026-01-10'),
      items: ['thrust_vector_x', 'thrust_vector_y', 'fuel_pressure'],
    },
    {
      id: '2',
      name: 'Navigation System Telemetry',
      path: '/configs/navigation/telemetry.json',
      itemCount: 8,
      lastModified: new Date('2026-01-09'),
      items: ['altitude', 'velocity', 'inclination'],
    },
    {
      id: '3',
      name: 'Power System Monitoring',
      path: '/configs/power/monitoring.json',
      itemCount: 15,
      lastModified: new Date('2026-01-08'),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigFileModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render modal overlay', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const modal = fixture.nativeElement.querySelector('em-modal-overlay');
      expect(modal).toBeTruthy();
    });

    it('should render search bar', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const searchBar = fixture.nativeElement.querySelector('em-search-bar');
      expect(searchBar).toBeTruthy();
    });

    it('should render config files list', () => {
      component.isOpen = true;
      component.configFiles = mockConfigFiles;
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.config-list__item');
      expect(items.length).toBe(3);
    });
  });

  describe('file selection', () => {
    beforeEach(() => {
      component.isOpen = true;
      component.configFiles = mockConfigFiles;
      fixture.detectChanges();
    });

    it('should select file on click', () => {
      component.onSelectFile(mockConfigFiles[0]);
      fixture.detectChanges();

      expect(component.selectedFile).toBe(mockConfigFiles[0]);
    });

    it('should return true for selected file in isSelected', () => {
      component.selectedFile = mockConfigFiles[0];

      expect(component.isSelected(mockConfigFiles[0])).toBe(true);
      expect(component.isSelected(mockConfigFiles[1])).toBe(false);
    });

    it('should apply selected class to selected file', () => {
      component.selectedFile = mockConfigFiles[0];
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.config-list__item');
      expect(items[0].classList.contains('config-list__item--selected')).toBe(true);
    });
  });

  describe('filtering', () => {
    beforeEach(() => {
      component.configFiles = mockConfigFiles;
    });

    it('should return all files when searchQuery is empty', () => {
      component.searchQuery = '';
      expect(component.filteredFiles.length).toBe(3);
    });

    it('should filter files by name', () => {
      component.searchQuery = 'propulsion';
      expect(component.filteredFiles.length).toBe(1);
      expect(component.filteredFiles[0].name).toContain('Propulsion');
    });

    it('should filter files by path', () => {
      component.searchQuery = '/configs/navigation';
      expect(component.filteredFiles.length).toBe(1);
      expect(component.filteredFiles[0].path).toContain('navigation');
    });

    it('should be case insensitive', () => {
      component.searchQuery = 'POWER';
      expect(component.filteredFiles.length).toBe(1);
    });

    it('should show empty state when no files match', () => {
      component.searchQuery = 'nonexistent';
      expect(component.filteredFiles.length).toBe(0);
    });
  });

  describe('preview panel', () => {
    beforeEach(() => {
      component.isOpen = true;
      component.configFiles = mockConfigFiles;
      fixture.detectChanges();
    });

    it('should show preview panel when file with items is selected', () => {
      component.selectedFile = mockConfigFiles[0];
      fixture.detectChanges();

      const previewPanel = fixture.nativeElement.querySelector('.preview-panel');
      expect(previewPanel).toBeTruthy();
    });

    it('should not show preview panel when file without items is selected', () => {
      component.selectedFile = mockConfigFiles[2];
      fixture.detectChanges();

      const previewPanel = fixture.nativeElement.querySelector('.preview-panel');
      expect(previewPanel).toBeNull();
    });

    it('should display telemetry items', () => {
      component.selectedFile = mockConfigFiles[0];
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.preview-panel__telemetry-item');
      expect(items.length).toBe(3);
    });
  });

  describe('events', () => {
    beforeEach(() => {
      component.configFiles = mockConfigFiles;
    });

    it('should emit closed on close', () => {
      const closedSpy = vi.fn();
      component.closed.subscribe(closedSpy);

      component.onClose();

      expect(closedSpy).toHaveBeenCalled();
    });

    it('should reset state on close', () => {
      component.selectedFile = mockConfigFiles[0];
      component.searchQuery = 'test';

      component.onClose();

      expect(component.selectedFile).toBeNull();
      expect(component.searchQuery).toBe('');
    });

    it('should emit apply with selected file', () => {
      const applySpy = vi.fn();
      component.apply.subscribe(applySpy);
      component.selectedFile = mockConfigFiles[0];

      component.onApply();

      expect(applySpy).toHaveBeenCalledWith(mockConfigFiles[0]);
    });

    it('should not emit apply when no file selected', () => {
      const applySpy = vi.fn();
      component.apply.subscribe(applySpy);
      component.selectedFile = null;

      component.onApply();

      expect(applySpy).not.toHaveBeenCalled();
    });

    it('should update search query on search change', () => {
      component.onSearchChange('test query');

      expect(component.searchQuery).toBe('test query');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2026-01-10');
      const formatted = component.formatDate(date);

      expect(formatted).toContain('Jan');
      expect(formatted).toContain('10');
      expect(formatted).toContain('2026');
    });
  });
});
