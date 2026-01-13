import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GridItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  content?: unknown;
}

export interface GridChangeEvent {
  items: GridItem[];
}

@Component({
  selector: 'em-dashboard-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardGridComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() items: GridItem[] = [];
  @Input() editMode = false;
  @Input() columns = 12;
  @Input() cellHeight = 60;
  @Input() margin = 16;

  @Output() gridChange = new EventEmitter<GridChangeEvent>();
  @Output() itemRemove = new EventEmitter<string>();

  private grid: unknown = null;
  private gridStackLoaded = false;

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.initGrid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editMode'] && this.grid) {
      this.updateEditMode();
    }
  }

  ngOnDestroy(): void {
    this.destroyGrid();
  }

  private async initGrid(): Promise<void> {
    try {
      const GridStack = await import('gridstack');
      this.gridStackLoaded = true;

      this.ngZone.runOutsideAngular(() => {
        const gridElement = this.elementRef.nativeElement.querySelector('.dashboard-grid');
        if (gridElement && GridStack.GridStack) {
          this.grid = GridStack.GridStack.init(
            {
              column: this.columns,
              cellHeight: this.cellHeight,
              margin: this.margin,
              disableDrag: !this.editMode,
              disableResize: !this.editMode,
              float: true,
              animate: true,
            },
            gridElement
          );

          (this.grid as { on: (event: string, callback: () => void) => void }).on('change', () => {
            this.ngZone.run(() => {
              this.onGridChange();
            });
          });
        }
      });
    } catch {
      // Gridstack not available, use fallback CSS grid
      this.gridStackLoaded = false;
    }
  }

  private updateEditMode(): void {
    if (this.grid && this.gridStackLoaded) {
      const gridApi = this.grid as {
        enableMove: (enable: boolean) => void;
        enableResize: (enable: boolean) => void;
      };
      gridApi.enableMove(this.editMode);
      gridApi.enableResize(this.editMode);
    }
  }

  private onGridChange(): void {
    if (this.grid && this.gridStackLoaded) {
      const gridApi = this.grid as {
        getGridItems: () => Array<{
          gridstackNode?: { x: number; y: number; w: number; h: number };
          getAttribute: (attr: string) => string | null;
        }>;
      };
      const gridItems = gridApi.getGridItems();
      const updatedItems: GridItem[] = gridItems.map((el) => ({
        id: el.getAttribute('gs-id') || '',
        x: el.gridstackNode?.x || 0,
        y: el.gridstackNode?.y || 0,
        w: el.gridstackNode?.w || 1,
        h: el.gridstackNode?.h || 1,
      }));
      this.gridChange.emit({ items: updatedItems });
    }
  }

  private destroyGrid(): void {
    if (this.grid && this.gridStackLoaded) {
      const gridApi = this.grid as { destroy: (removeDOM?: boolean) => void };
      gridApi.destroy(false);
      this.grid = null;
    }
  }

  onRemoveItem(itemId: string): void {
    this.itemRemove.emit(itemId);
  }
}
