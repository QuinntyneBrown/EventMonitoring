import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileHeaderComponent, TileAction } from '../tile-header/tile-header.component';
import type { TileType } from '../../tokens/design-tokens';

@Component({
  selector: 'em-tile',
  standalone: true,
  imports: [CommonModule, TileHeaderComponent],
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() type: TileType = 'default';
  @Input() editMode = false;
  @Input() actions: TileAction[] = [];
  @Input() gridColumn = 'span 6';
  @Input() gridRow = 'span 4';

  @Output() actionClick = new EventEmitter<string>();
  @Output() dragStart = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }

  onDragHandleMouseDown(): void {
    if (this.editMode) {
      this.dragStart.emit();
    }
  }

  onRemove(): void {
    this.remove.emit();
  }
}
