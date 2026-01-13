import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'em-tile-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile-placeholder.component.html',
  styleUrls: ['./tile-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TilePlaceholderComponent {
  @Input() icon = 'add';
  @Input() text = 'Add Tile';
  @Input() gridColumn = 'span 3';
  @Input() gridRow = 'span 2';

  @Output() add = new EventEmitter<void>();

  onAdd(): void {
    this.add.emit();
  }
}
