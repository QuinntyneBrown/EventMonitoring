import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileType, TileTypeDefinition } from '../../services/dashboard.service';

@Component({
  selector: 'app-tile-palette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile-palette.component.html',
  styleUrls: ['./tile-palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TilePaletteComponent {
  @Input() tileTypes: TileTypeDefinition[] = [];
  @Input() canAddTile: (type: TileType) => boolean = () => true;

  @Output() addTile = new EventEmitter<TileType>();

  onAddTile(type: TileType): void {
    if (this.canAddTile(type)) {
      this.addTile.emit(type);
    }
  }

  getDisabledReason(tileType: TileTypeDefinition): string | null {
    if (this.canAddTile(tileType.type)) {
      return null;
    }

    if (!tileType.allowMultiple) {
      return 'Only one instance allowed';
    }

    if (tileType.requiresTelemetryState) {
      return 'Requires Telemetry State tile';
    }

    return 'Cannot add tile';
  }
}
