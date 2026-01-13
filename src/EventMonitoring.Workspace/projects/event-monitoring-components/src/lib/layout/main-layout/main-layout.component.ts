import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, HeaderAction } from '../header/header.component';
import { SidenavComponent, SidenavSection, SidenavItem } from '../sidenav/sidenav.component';
import { ContentComponent } from '../content/content.component';
import { TelemetryMode } from '../../tokens/design-tokens';

@Component({
  selector: 'em-main-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidenavComponent, ContentComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  @Input() title = 'Event Monitoring System';
  @Input() logoIcon = 'satellite_alt';
  @Input() mode: TelemetryMode = 'live';
  @Input() showEditToggle = true;
  @Input() editModeActive = false;
  @Input() headerActions: HeaderAction[] = [
    { id: 'notifications', icon: 'notifications' },
    { id: 'settings', icon: 'settings' },
    { id: 'account', icon: 'account_circle' },
  ];
  @Input() sidenavSections: SidenavSection[] = [];
  @Input() activeNavItemId: string | null = null;
  @Input() sidenavCollapsed = false;

  @Output() menuClick = new EventEmitter<void>();
  @Output() editToggle = new EventEmitter<void>();
  @Output() headerActionClick = new EventEmitter<string>();
  @Output() navItemClick = new EventEmitter<SidenavItem>();

  onMenuClick(): void {
    this.menuClick.emit();
  }

  onEditToggle(): void {
    this.editToggle.emit();
  }

  onHeaderActionClick(actionId: string): void {
    this.headerActionClick.emit(actionId);
  }

  onNavItemClick(item: SidenavItem): void {
    this.navItemClick.emit(item);
  }
}
