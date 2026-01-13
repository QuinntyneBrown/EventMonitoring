import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DashboardGridComponent, GridItem } from './dashboard-grid.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [DashboardGridComponent],
  template: `
    <em-dashboard-grid [editMode]="editMode">
      <div class="test-tile">Tile 1</div>
      <div class="test-tile">Tile 2</div>
    </em-dashboard-grid>
  `,
})
class TestHostComponent {
  editMode = false;
}

describe('DashboardGridComponent', () => {
  let component: DashboardGridComponent;
  let fixture: ComponentFixture<DashboardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render dashboard-grid element', () => {
      const grid = fixture.nativeElement.querySelector('.dashboard-grid');
      expect(grid).toBeTruthy();
    });

    it('should not have edit-mode class by default', () => {
      const grid = fixture.nativeElement.querySelector('.dashboard-grid');
      expect(grid.classList.contains('dashboard-grid--edit-mode')).toBe(false);
    });

    it('should apply edit-mode class when editMode is true', () => {
      component.editMode = true;
      fixture.detectChanges();

      const grid = fixture.nativeElement.querySelector('.dashboard-grid');
      expect(grid.classList.contains('dashboard-grid--edit-mode')).toBe(true);
    });
  });

  describe('inputs', () => {
    it('should have default columns value', () => {
      expect(component.columns).toBe(12);
    });

    it('should have default cellHeight value', () => {
      expect(component.cellHeight).toBe(60);
    });

    it('should have default margin value', () => {
      expect(component.margin).toBe(16);
    });

    it('should have default editMode as false', () => {
      expect(component.editMode).toBe(false);
    });

    it('should have empty items by default', () => {
      expect(component.items).toEqual([]);
    });
  });

  describe('events', () => {
    it('should emit itemRemove when onRemoveItem is called', () => {
      const itemRemoveSpy = vi.fn();
      component.itemRemove.subscribe(itemRemoveSpy);

      component.onRemoveItem('test-id');

      expect(itemRemoveSpy).toHaveBeenCalledWith('test-id');
    });
  });

  describe('content projection', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
      }).compileComponents();

      hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
    });

    it('should project content', () => {
      const tiles = hostFixture.nativeElement.querySelectorAll('.test-tile');
      expect(tiles.length).toBe(2);
    });

    it('should toggle edit mode class based on input', () => {
      const grid = hostFixture.nativeElement.querySelector('.dashboard-grid');

      expect(grid.classList.contains('dashboard-grid--edit-mode')).toBe(false);

      hostFixture.componentInstance.editMode = true;
      hostFixture.detectChanges();

      expect(grid.classList.contains('dashboard-grid--edit-mode')).toBe(true);
    });
  });

  describe('items input', () => {
    it('should accept items array', () => {
      const items: GridItem[] = [
        { id: '1', x: 0, y: 0, w: 6, h: 4 },
        { id: '2', x: 6, y: 0, w: 6, h: 4 },
      ];
      component.items = items;
      fixture.detectChanges();

      expect(component.items.length).toBe(2);
    });

    it('should handle empty items array', () => {
      component.items = [];
      fixture.detectChanges();

      expect(component.items.length).toBe(0);
    });
  });
});
