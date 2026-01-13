import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatusType = 'normal' | 'warning' | 'critical';

@Component({
  selector: 'em-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  @Input() status: StatusType = 'normal';
  @Input() label?: string;

  get badgeClasses(): Record<string, boolean> {
    return {
      'status-badge': true,
      'status-badge--normal': this.status === 'normal',
      'status-badge--warning': this.status === 'warning',
      'status-badge--critical': this.status === 'critical',
    };
  }

  get displayLabel(): string {
    return this.label ?? this.status.charAt(0).toUpperCase() + this.status.slice(1);
  }
}
