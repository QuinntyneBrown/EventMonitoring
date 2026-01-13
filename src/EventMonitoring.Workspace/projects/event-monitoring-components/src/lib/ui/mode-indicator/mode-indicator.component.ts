import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { TelemetryMode } from '../../tokens/design-tokens';

@Component({
  selector: 'em-mode-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mode-indicator.component.html',
  styleUrls: ['./mode-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeIndicatorComponent {
  @Input() mode: TelemetryMode = 'live';
  @Input() showPulse = true;

  get indicatorClasses(): Record<string, boolean> {
    return {
      'mode-indicator': true,
      'mode-indicator--live': this.mode === 'live',
      'mode-indicator--review': this.mode === 'review',
    };
  }

  get dotClasses(): Record<string, boolean> {
    return {
      'mode-indicator__dot': true,
      'mode-indicator__dot--pulse': this.showPulse && this.mode === 'live',
    };
  }

  get modeLabel(): string {
    return this.mode === 'live' ? 'LIVE MODE' : 'REVIEW MODE';
  }
}
