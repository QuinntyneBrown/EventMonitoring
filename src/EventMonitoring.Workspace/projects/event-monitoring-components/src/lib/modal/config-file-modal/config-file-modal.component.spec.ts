import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigFileModalComponent, ConfigFile, ConfigFileModalData } from './config-file-modal.component';

describe('ConfigFileModalComponent', () => {
  let component: ConfigFileModalComponent;
  let fixture: ComponentFixture<ConfigFileModalComponent>;
  let mockDialogRef: { close: ReturnType<typeof vi.fn> };

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
    mockDialogRef = {
      close: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ConfigFileModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { configFiles: mockConfigFiles } as ConfigFileModalData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with config files from data', () => {
      expect(component.configFiles).toEqual(mockConfigFiles);
    });

    it('should render search bar', () => {
      const searchBar = fixture.nativeElement.querySelector('em-search-bar');
      expect(searchBar).toBeTruthy();
    });

    it('should render config files list', () => {
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.config-list__item');
      expect(items.length).toBe(3);
    });
  });

  describe('file selection', () => {
    beforeEach(() => {
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
      fixture.detectChanges();
    });

    it('should call dialogRef.close on close', () => {
      component.onClose();

      expect(mockDialogRef.close).toHaveBeenCalled();
    });

    it('should reset state on close', () => {
      component.selectedFile = mockConfigFiles[0];
      component.searchQuery = 'test';

      component.onClose();

      expect(component.selectedFile).toBeNull();
      expect(component.searchQuery).toBe('');
    });

    it('should call dialogRef.close with selected file on apply', () => {
      component.selectedFile = mockConfigFiles[0];

      component.onApply();

      expect(mockDialogRef.close).toHaveBeenCalledWith(mockConfigFiles[0]);
    });

    it('should not call dialogRef.close when no file selected', () => {
      component.selectedFile = null;

      component.onApply();

      expect(mockDialogRef.close).not.toHaveBeenCalled();
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
