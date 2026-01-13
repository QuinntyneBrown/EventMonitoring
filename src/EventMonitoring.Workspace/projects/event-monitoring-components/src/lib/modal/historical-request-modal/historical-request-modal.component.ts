import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalOverlayComponent } from '../modal-overlay/modal-overlay.component';
import { InfoBoxComponent } from '../../ui/info-box/info-box.component';
import { ButtonComponent } from '../../ui/button/button.component';

export interface TimeRange {
  label: string;
  hours: number;
}

export interface HistoricalRequest {
  startDateTime: string;
  endDateTime: string;
  timeRangeHours: number;
  activeSubscriptions: number;
  estimatedRecords: number;
  estimatedPages: number;
  estimatedLoadTime: number;
}

@Component({
  selector: 'em-historical-request-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalOverlayComponent, InfoBoxComponent, ButtonComponent],
  templateUrl: './historical-request-modal.component.html',
  styleUrls: ['./historical-request-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricalRequestModalComponent {
  @Input() isOpen = false;
  @Input() activeSubscriptions = 12;
  @Input() recordsPerSecond = 5;
  @Input() pageSize = 100;

  @Output() closed = new EventEmitter<void>();
  @Output() loadData = new EventEmitter<HistoricalRequest>();

  startDateTime = '';
  endDateTime = '';
  selectedTimeRange: TimeRange | null = null;

  timeRanges: TimeRange[] = [
    { label: 'Last 1 hour', hours: 1 },
    { label: 'Last 4 hours', hours: 4 },
    { label: 'Last 8 hours', hours: 8 },
    { label: 'Last 24 hours', hours: 24 },
  ];

  constructor() {
    this.setDefaultTimeRange();
  }

  private setDefaultTimeRange(): void {
    const now = new Date();
    const hoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
    this.endDateTime = this.formatDateTimeLocal(now);
    this.startDateTime = this.formatDateTimeLocal(hoursAgo);
    this.selectedTimeRange = this.timeRanges[2]; // Default to 8 hours
  }

  private formatDateTimeLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  get timeRangeHours(): number {
    if (!this.startDateTime || !this.endDateTime) return 0;
    const start = new Date(this.startDateTime);
    const end = new Date(this.endDateTime);
    const diffMs = end.getTime() - start.getTime();
    return Math.max(0, Math.round(diffMs / (1000 * 60 * 60)));
  }

  get estimatedRecords(): number {
    return this.timeRangeHours * 60 * 60 * this.recordsPerSecond * this.activeSubscriptions;
  }

  get estimatedPages(): number {
    return Math.ceil(this.estimatedRecords / this.pageSize);
  }

  get estimatedLoadTimeSeconds(): number {
    return Math.ceil(this.estimatedPages / 100);
  }

  formatEstimatedRecords(): string {
    const records = this.estimatedRecords;
    if (records >= 1000000) {
      return `~${(records / 1000000).toFixed(1)}M records`;
    } else if (records >= 1000) {
      return `~${Math.round(records / 1000).toLocaleString()},000 records`;
    }
    return `~${records.toLocaleString()} records`;
  }

  formatEstimatedPages(): string {
    return `~${this.estimatedPages.toLocaleString()} pages`;
  }

  formatEstimatedLoadTime(): string {
    const seconds = this.estimatedLoadTimeSeconds;
    if (seconds >= 60) {
      return `~${Math.round(seconds / 60)} minutes`;
    }
    return `~${seconds} seconds`;
  }

  onQuickSelect(range: TimeRange): void {
    this.selectedTimeRange = range;
    const now = new Date();
    const start = new Date(now.getTime() - range.hours * 60 * 60 * 1000);
    this.endDateTime = this.formatDateTimeLocal(now);
    this.startDateTime = this.formatDateTimeLocal(start);
  }

  isRangeSelected(range: TimeRange): boolean {
    return this.selectedTimeRange?.hours === range.hours;
  }

  onCustomRange(): void {
    this.selectedTimeRange = null;
  }

  onClose(): void {
    this.closed.emit();
  }

  onLoadData(): void {
    const request: HistoricalRequest = {
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      timeRangeHours: this.timeRangeHours,
      activeSubscriptions: this.activeSubscriptions,
      estimatedRecords: this.estimatedRecords,
      estimatedPages: this.estimatedPages,
      estimatedLoadTime: this.estimatedLoadTimeSeconds,
    };
    this.loadData.emit(request);
    this.onClose();
  }

  get isValid(): boolean {
    return !!this.startDateTime && !!this.endDateTime && this.timeRangeHours > 0;
  }
}
