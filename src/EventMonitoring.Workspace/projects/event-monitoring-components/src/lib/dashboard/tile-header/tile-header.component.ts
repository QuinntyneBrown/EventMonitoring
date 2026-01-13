import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TileAction {
  id: string;
  icon: string;
  label?: string;
}

@Component({
  selector: 'em-tile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile-header.component.html',
  styleUrls: ['./tile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileHeaderComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() actions: TileAction[] = [];

  @Output() actionClick = new EventEmitter<string>();

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }
}
