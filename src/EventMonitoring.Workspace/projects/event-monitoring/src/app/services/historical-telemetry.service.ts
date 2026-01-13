import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { TelemetryMessage } from './telemetry.service';

export interface HistoricalTelemetryQuery {
  sources?: string[];
  metrics?: string[];
  startTime: Date;
  endTime: Date;
  page?: number;
  pageSize?: number;
}

export interface HistoricalTelemetryResponse {
  records: TelemetryMessage[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface PlaybackState {
  isPlaying: boolean;
  speed: number;
  currentTime: Date;
  startTime: Date;
  endTime: Date;
  progress: number;
}

@Injectable({
  providedIn: 'root',
})
export class HistoricalTelemetryService {
  private readonly playbackStateSubject = new BehaviorSubject<PlaybackState>({
    isPlaying: false,
    speed: 1,
    currentTime: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    progress: 0,
  });

  readonly playbackState$ = this.playbackStateSubject.asObservable();

  private historicalData: TelemetryMessage[] = [];
  private playbackInterval: ReturnType<typeof setInterval> | null = null;
  private readonly telemetryTypes = [
    'cpu_usage', 'memory_usage', 'fuel_level', 'oxygen_level', 'temperature',
    'pressure', 'altitude', 'velocity', 'acceleration', 'battery_voltage',
    'solar_panel_output', 'thruster_temp', 'gyroscope_x', 'gyroscope_y', 'gyroscope_z',
  ];

  queryHistoricalData(query: HistoricalTelemetryQuery): Observable<HistoricalTelemetryResponse> {
    // Mock implementation - generates sample historical data
    const pageSize = query.pageSize || 100;
    const page = query.page || 1;
    
    // Generate mock data for the time range
    const records = this.generateMockHistoricalData(
      query.startTime,
      query.endTime,
      query.metrics
    );

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRecords = records.slice(startIndex, endIndex);
    const totalPages = Math.ceil(records.length / pageSize);

    return of({
      records: paginatedRecords,
      totalRecords: records.length,
      totalPages,
      currentPage: page,
      hasMore: page < totalPages,
    }).pipe(delay(300)); // Simulate network delay
  }

  async loadAllHistoricalData(query: HistoricalTelemetryQuery): Promise<TelemetryMessage[]> {
    const allRecords: TelemetryMessage[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.queryHistoricalData({
        ...query,
        page: currentPage,
      }).toPromise();

      if (response) {
        allRecords.push(...response.records);
        hasMore = response.hasMore;
        currentPage++;
      } else {
        break;
      }
    }

    this.historicalData = allRecords.sort(
      (a, b) => new Date(a.ust).getTime() - new Date(b.ust).getTime()
    );

    return this.historicalData;
  }

  startPlayback(startTime: Date, endTime: Date, speed: number = 1): void {
    this.stopPlayback();

    this.playbackStateSubject.next({
      isPlaying: true,
      speed,
      currentTime: startTime,
      startTime,
      endTime,
      progress: 0,
    });

    // Play back at specified speed
    const intervalMs = 100; // Update every 100ms
    const timeIncrementMs = intervalMs * speed;

    this.playbackInterval = setInterval(() => {
      const state = this.playbackStateSubject.value;
      const newTime = new Date(state.currentTime.getTime() + timeIncrementMs);

      if (newTime >= state.endTime) {
        this.stopPlayback();
        return;
      }

      const totalDuration = state.endTime.getTime() - state.startTime.getTime();
      const elapsed = newTime.getTime() - state.startTime.getTime();
      const progress = (elapsed / totalDuration) * 100;

      this.playbackStateSubject.next({
        ...state,
        currentTime: newTime,
        progress,
      });
    }, intervalMs);
  }

  stopPlayback(): void {
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = null;
    }

    const state = this.playbackStateSubject.value;
    this.playbackStateSubject.next({
      ...state,
      isPlaying: false,
    });
  }

  pausePlayback(): void {
    this.stopPlayback();
  }

  resumePlayback(): void {
    const state = this.playbackStateSubject.value;
    if (!state.isPlaying) {
      this.startPlayback(state.currentTime, state.endTime, state.speed);
    }
  }

  seekTo(progress: number): void {
    const state = this.playbackStateSubject.value;
    const totalDuration = state.endTime.getTime() - state.startTime.getTime();
    const newTime = new Date(state.startTime.getTime() + (totalDuration * progress) / 100);

    this.playbackStateSubject.next({
      ...state,
      currentTime: newTime,
      progress,
    });
  }

  setSpeed(speed: number): void {
    const state = this.playbackStateSubject.value;
    const wasPlaying = state.isPlaying;

    if (wasPlaying) {
      this.stopPlayback();
    }

    this.playbackStateSubject.next({
      ...state,
      speed,
    });

    if (wasPlaying) {
      this.startPlayback(state.currentTime, state.endTime, speed);
    }
  }

  getTelemetryAtTime(time: Date): TelemetryMessage[] {
    // Find all telemetry messages at or before the given time
    return this.historicalData.filter(
      (record) => new Date(record.ust) <= time
    );
  }

  private generateMockHistoricalData(
    startTime: Date,
    endTime: Date,
    metrics?: string[]
  ): TelemetryMessage[] {
    const records: TelemetryMessage[] = [];
    const metricsToUse = metrics || this.telemetryTypes;
    
    // Generate data points every 5 seconds
    const intervalMs = 5000;
    let currentTime = startTime.getTime();
    const endTimeMs = endTime.getTime();

    while (currentTime <= endTimeMs) {
      for (const metric of metricsToUse) {
        records.push({
          name: metric,
          ust: new Date(currentTime).toISOString(),
          value: this.generateMockValue(metric),
        });
      }
      currentTime += intervalMs;
    }

    return records;
  }

  private generateMockValue(type: string): string {
    if (type.includes('status') || type.includes('mode')) {
      const statuses = ['OK', 'Warning', 'Active'];
      return statuses[Math.floor(Math.random() * statuses.length)];
    } else if (type.includes('level') || type.includes('usage')) {
      return (Math.random() * 100).toFixed(2);
    } else if (type.includes('temp')) {
      return (Math.random() * 50 + 20).toFixed(1);
    } else {
      return (Math.random() * 1000).toFixed(2);
    }
  }
}
