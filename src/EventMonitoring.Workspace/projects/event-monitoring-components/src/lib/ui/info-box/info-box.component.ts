import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type InfoBoxVariant = 'info' | 'live' | 'review';

@Component({
  selector: 'em-info-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBoxComponent {
  @Input() variant: InfoBoxVariant = 'info';
  @Input() icon = 'info';

  get boxClasses(): Record<string, boolean> {
    return {
      'info-box': true,
      'info-box--info': this.variant === 'info',
      'info-box--live': this.variant === 'live',
      'info-box--review': this.variant === 'review',
    };
  }
}
