import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeIndicatorComponent } from '../../ui/mode-indicator/mode-indicator.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { TelemetryMode } from '../../tokens/design-tokens';

export interface HeaderAction {
  id: string;
  icon: string;
  label?: string;
}

@Component({
  selector: 'em-header',
  standalone: true,
  imports: [CommonModule, ModeIndicatorComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() title = 'Event Monitoring System';
  @Input() logoIcon = 'satellite_alt';
  @Input() mode: TelemetryMode = 'live';
  @Input() showEditToggle = true;
  @Input() editModeActive = false;
  @Input() actions: HeaderAction[] = [
    { id: 'notifications', icon: 'notifications' },
    { id: 'settings', icon: 'settings' },
    { id: 'account', icon: 'account_circle' },
  ];

  @Output() menuClick = new EventEmitter<void>();
  @Output() editToggle = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<string>();

  onMenuClick(): void {
    this.menuClick.emit();
  }

  onEditToggle(): void {
    this.editToggle.emit();
  }

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }
}
