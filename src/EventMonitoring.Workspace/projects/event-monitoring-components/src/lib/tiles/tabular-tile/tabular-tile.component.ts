import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../../dashboard/tile/tile.component';
import { StatusBadgeComponent } from '../../ui/status-badge/status-badge.component';
import { TileAction } from '../../dashboard/tile-header/tile-header.component';
import { StatusType } from '../../tokens/design-tokens';

export interface TabularRow {
  id: string;
  parameter: string;
  value: string | number;
  unit?: string;
  status: StatusType;
  timestamp?: string;
}

export interface TabularColumn {
  key: string;
  label: string;
  width?: string;
}

@Component({
  selector: 'em-tabular-tile',
  standalone: true,
  imports: [CommonModule, TileComponent, StatusBadgeComponent],
  templateUrl: './tabular-tile.component.html',
  styleUrls: ['./tabular-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabularTileComponent {
  @Input() title = '';
  @Input() icon = 'table_chart';
  @Input() rows: TabularRow[] = [];
  @Input() editMode = false;
  @Input() showTimestamp = true;
  @Input() actions: TileAction[] = [
    { id: 'folder', icon: 'folder_open' },
    { id: 'more', icon: 'more_vert' },
  ];

  @Output() actionClick = new EventEmitter<string>();
  @Output() rowClick = new EventEmitter<TabularRow>();

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }

  onRowClick(row: TabularRow): void {
    this.rowClick.emit(row);
  }

  formatValue(row: TabularRow): string {
    if (row.unit) {
      return `${row.value} ${row.unit}`;
    }
    return String(row.value);
  }

  getValueClass(status: StatusType): string {
    if (status === 'warning' || status === 'critical') {
      return `tabular-tile__value--${status}`;
    }
    return '';
  }
}
