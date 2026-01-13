import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TileComponent } from './tile.component';
import { TileAction } from '../tile-header/tile-header.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [TileComponent],
  template: `<em-tile title="Test"><div class="test-content">Projected Content</div></em-tile>`,
})
class TestHostComponent {}

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render tile element', () => {
      const tile = fixture.nativeElement.querySelector('.tile');
      expect(tile).toBeTruthy();
    });

    it('should render tile header', () => {
      const header = fixture.nativeElement.querySelector('em-tile-header');
      expect(header).toBeTruthy();
    });

    it('should render tile content', () => {
      const content = fixture.nativeElement.querySelector('.tile__content');
      expect(content).toBeTruthy();
    });

    it('should pass title to tile header', () => {
      component.title = 'Test Title';
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('em-tile-header');
      expect(header.getAttribute('ng-reflect-title')).toBe('Test Title');
    });

    it('should pass icon to tile header', () => {
      component.icon = 'show_chart';
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('em-tile-header');
      expect(header.getAttribute('ng-reflect-icon')).toBe('show_chart');
    });
  });

  describe('tile types', () => {
    it('should apply graph class for graph type', () => {
      component.type = 'graph';
      fixture.detectChanges();

      const tile = fixture.nativeElement.querySelector('.tile');
      expect(tile.classList.contains('tile--graph')).toBe(true);
    });

    it('should apply tabular class for tabular type', () => {
      component.type = 'tabular';
      fixture.detectChanges();

      const tile = fixture.nativeElement.querySelector('.tile');
      expect(tile.classList.contains('tile--tabular')).toBe(true);
    });

    it('should apply telemetry-state class for telemetry-state type', () => {
      component.type = 'telemetry-state';
      fixture.detectChanges();

      const tile = fixture.nativeElement.querySelector('.tile');
      expect(tile.classList.contains('tile--telemetry-state')).toBe(true);
    });

    it('should not apply type classes for default type', () => {
      component.type = 'default';
      fixture.detectChanges();

      const tile = fixture.nativeElement.querySelector('.tile');
      expect(tile.classList.contains('tile--graph')).toBe(false);
      expect(tile.classList.contains('tile--tabular')).toBe(false);
    });
  });

  describe('edit mode', () => {
    it('should apply edit-mode class when editMode is true', () => {
      component.editMode = true;
      fixture.detectChanges();

      const tile = fixture.nativeElement.querySelector('.tile');
      expect(tile.classList.contains('tile--edit-mode')).toBe(true);
    });

    it('should show edit controls when in edit mode', () => {
      component.editMode = true;
      fixture.detectChanges();

      const editControls = fixture.nativeElement.querySelector('.tile__edit-controls');
      expect(editControls).toBeTruthy();
    });

    it('should show drag handle in edit mode', () => {
      component.editMode = true;
      fixture.detectChanges();

      const dragHandle = fixture.nativeElement.querySelector('.tile__drag-handle');
      expect(dragHandle).toBeTruthy();
    });

    it('should show remove button in edit mode', () => {
      component.editMode = true;
      fixture.detectChanges();

      const removeBtn = fixture.nativeElement.querySelector('.tile__remove-btn');
      expect(removeBtn).toBeTruthy();
    });

    it('should not show edit controls when not in edit mode', () => {
      component.editMode = false;
      fixture.detectChanges();

      const editControls = fixture.nativeElement.querySelector('.tile__edit-controls');
      expect(editControls).toBeNull();
    });
  });

  describe('grid positioning', () => {
    it('should apply gridColumn style', () => {
      component.gridColumn = 'span 8';
      fixture.detectChanges();

      const tile = fixture.nativeElement.querySelector('.tile');
      expect(tile.style.gridColumn).toBe('span 8');
    });

    it('should apply gridRow style', () => {
      component.gridRow = 'span 3';
      fixture.detectChanges();

      const tile = fixture.nativeElement.querySelector('.tile');
      expect(tile.style.gridRow).toBe('span 3');
    });
  });

  describe('events', () => {
    it('should emit actionClick when tile header action is clicked', () => {
      const actions: TileAction[] = [{ id: 'test', icon: 'settings' }];
      component.actions = actions;
      fixture.detectChanges();

      const actionClickSpy = vi.fn();
      component.actionClick.subscribe(actionClickSpy);

      component.onActionClick('test');

      expect(actionClickSpy).toHaveBeenCalledWith('test');
    });

    it('should emit dragStart when drag handle is mousedown in edit mode', () => {
      component.editMode = true;
      fixture.detectChanges();

      const dragStartSpy = vi.fn();
      component.dragStart.subscribe(dragStartSpy);

      const dragHandle = fixture.nativeElement.querySelector('.tile__drag-handle');
      dragHandle.dispatchEvent(new MouseEvent('mousedown'));

      expect(dragStartSpy).toHaveBeenCalled();
    });

    it('should not emit dragStart when not in edit mode', () => {
      component.editMode = false;
      fixture.detectChanges();

      const dragStartSpy = vi.fn();
      component.dragStart.subscribe(dragStartSpy);

      component.onDragHandleMouseDown();

      expect(dragStartSpy).not.toHaveBeenCalled();
    });

    it('should emit remove when remove button is clicked', () => {
      component.editMode = true;
      fixture.detectChanges();

      const removeSpy = vi.fn();
      component.remove.subscribe(removeSpy);

      const removeBtn = fixture.nativeElement.querySelector('.tile__remove-btn');
      removeBtn.click();

      expect(removeSpy).toHaveBeenCalled();
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
      const projectedContent = hostFixture.nativeElement.querySelector('.test-content');
      expect(projectedContent).toBeTruthy();
      expect(projectedContent.textContent).toBe('Projected Content');
    });
  });
});
