import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MainLayoutComponent,
  SidenavSection,
  SidenavItem,
} from 'event-monitoring-components';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  mode: 'live' | 'review' = 'live';
  editModeActive = false;
  activeNavItemId = 'dashboard';

  sidenavSections: SidenavSection[] = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'telemetry', label: 'Telemetry', icon: 'show_chart' },
        { id: 'historical', label: 'Historical Data', icon: 'history' },
      ],
    },
    {
      title: 'Configuration',
      items: [
        { id: 'config-files', label: 'Config Files', icon: 'folder' },
        { id: 'settings', label: 'Settings', icon: 'tune' },
      ],
    },
    {
      title: 'System',
      items: [
        { id: 'health', label: 'Health Status', icon: 'monitor_heart' },
        { id: 'help', label: 'Help', icon: 'help_outline' },
      ],
    },
  ];

  onMenuClick(): void {
    // Menu toggle functionality can be implemented here
  }

  onEditToggle(): void {
    this.editModeActive = !this.editModeActive;
  }

  onHeaderActionClick(actionId: string): void {
    // Handle header actions (notifications, settings, account)
  }

  onNavItemClick(item: SidenavItem): void {
    this.activeNavItemId = item.id;
  }
}
