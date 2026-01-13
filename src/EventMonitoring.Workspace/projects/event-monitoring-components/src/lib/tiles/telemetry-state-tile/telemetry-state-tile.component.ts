import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../../dashboard/tile/tile.component';
import { InfoBoxComponent } from '../../ui/info-box/info-box.component';
import { TileAction } from '../../dashboard/tile-header/tile-header.component';
import { TelemetryMode } from '../../tokens/design-tokens';

export interface TelemetryStats {
  updateRate: string;
  subscriptions: number;
  messagesPerSecond: number;
  connectionStatus: 'OK' | 'Error' | 'Connecting';
  duration?: string;
  totalRecords?: number;
  progress?: number;
}

export interface TimelineState {
  startTime: string;
  endTime: string;
  currentTime: string;
  progress: number;
}

export type PlaybackSpeed = 0.5 | 1 | 2 | 4 | 8;

@Component({
  selector: 'em-telemetry-state-tile',
  standalone: true,
  imports: [CommonModule, TileComponent, InfoBoxComponent],
  templateUrl: './telemetry-state-tile.component.html',
  styleUrls: ['./telemetry-state-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelemetryStateTileComponent {
  @Input() mode: TelemetryMode = 'live';
  @Input() isPlaying = false;
  @Input() playbackSpeed: PlaybackSpeed = 1;
  @Input() stats: TelemetryStats = {
    updateRate: '5 Hz',
    subscriptions: 12,
    messagesPerSecond: 247,
    connectionStatus: 'OK',
  };
  @Input() timeline: TimelineState = {
    startTime: '2026-01-12 08:00:00',
    endTime: 'Now',
    currentTime: '2026-01-12 14:45:32 UTC',
    progress: 75,
  };
  @Input() editMode = false;
  @Input() actions: TileAction[] = [
    { id: 'history', icon: 'history' },
    { id: 'settings', icon: 'settings' },
  ];

  @Output() modeChange = new EventEmitter<TelemetryMode>();
  @Output() playPause = new EventEmitter<void>();
  @Output() skipPrevious = new EventEmitter<void>();
  @Output() skipNext = new EventEmitter<void>();
  @Output() fastRewind = new EventEmitter<void>();
  @Output() fastForward = new EventEmitter<void>();
  @Output() speedChange = new EventEmitter<PlaybackSpeed>();
  @Output() timelineSeek = new EventEmitter<number>();
  @Output() loadHistoricalData = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<string>();

  readonly speedOptions: PlaybackSpeed[] = [0.5, 1, 2, 4, 8];

  onModeChange(newMode: TelemetryMode): void {
    this.modeChange.emit(newMode);
  }

  onPlayPause(): void {
    this.playPause.emit();
  }

  onSkipPrevious(): void {
    this.skipPrevious.emit();
  }

  onSkipNext(): void {
    this.skipNext.emit();
  }

  onFastRewind(): void {
    this.fastRewind.emit();
  }

  onFastForward(): void {
    this.fastForward.emit();
  }

  onSpeedDecrease(): void {
    const currentIndex = this.speedOptions.indexOf(this.playbackSpeed);
    if (currentIndex > 0) {
      this.speedChange.emit(this.speedOptions[currentIndex - 1]);
    }
  }

  onSpeedIncrease(): void {
    const currentIndex = this.speedOptions.indexOf(this.playbackSpeed);
    if (currentIndex < this.speedOptions.length - 1) {
      this.speedChange.emit(this.speedOptions[currentIndex + 1]);
    }
  }

  onTimelineClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    this.timelineSeek.emit(Math.max(0, Math.min(100, percent)));
  }

  onLoadHistoricalData(): void {
    this.loadHistoricalData.emit();
  }

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }

  get playPauseIcon(): string {
    return this.isPlaying ? 'pause' : 'play_arrow';
  }

  get infoBannerText(): string {
    if (this.mode === 'live') {
      return `Receiving live telemetry from TelemetryStreaming service via SignalR at ${this.stats.updateRate}`;
    }
    return `Viewing historical data. Loaded ${this.stats.totalRecords?.toLocaleString() || 0} records across ${this.stats.subscriptions} metrics.`;
  }

  get infoVariant(): 'info' | 'live' | 'review' {
    return this.mode === 'live' ? 'live' : 'review';
  }
}
