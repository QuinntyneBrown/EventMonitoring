import { TestBed } from '@angular/core/testing';
import { HistoricalTelemetryService } from './historical-telemetry.service';

describe('HistoricalTelemetryService', () => {
  let service: HistoricalTelemetryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricalTelemetryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('queryHistoricalData', () => {
    it('should return paginated historical data', (done) => {
      const query = {
        startTime: new Date(Date.now() - 3600000),
        endTime: new Date(),
        page: 1,
        pageSize: 50,
      };

      service.queryHistoricalData(query).subscribe((response) => {
        expect(response).toBeTruthy();
        expect(response.records).toBeDefined();
        expect(response.totalRecords).toBeGreaterThan(0);
        expect(response.currentPage).toBe(1);
        done();
      });
    });

    it('should return filtered data by metrics', (done) => {
      const query = {
        startTime: new Date(Date.now() - 3600000),
        endTime: new Date(),
        metrics: ['cpu_usage', 'memory_usage'],
        pageSize: 100,
      };

      service.queryHistoricalData(query).subscribe((response) => {
        expect(response.records.every((r) =>
          ['cpu_usage', 'memory_usage'].includes(r.name)
        )).toBe(true);
        done();
      });
    });
  });

  describe('playback controls', () => {
    it('should start playback', () => {
      const startTime = new Date(Date.now() - 60000);
      const endTime = new Date();

      service.startPlayback(startTime, endTime, 1);

      service.playbackState$.subscribe((state) => {
        expect(state.isPlaying).toBe(true);
        expect(state.speed).toBe(1);
      });
    });

    it('should stop playback', () => {
      const startTime = new Date(Date.now() - 60000);
      const endTime = new Date();

      service.startPlayback(startTime, endTime, 1);
      service.stopPlayback();

      service.playbackState$.subscribe((state) => {
        expect(state.isPlaying).toBe(false);
      });
    });

    it('should seek to specific progress', () => {
      const startTime = new Date(Date.now() - 60000);
      const endTime = new Date();

      service.startPlayback(startTime, endTime, 1);
      service.seekTo(50);

      service.playbackState$.subscribe((state) => {
        expect(state.progress).toBe(50);
      });
    });

    it('should change playback speed', () => {
      service.setSpeed(2);

      service.playbackState$.subscribe((state) => {
        expect(state.speed).toBe(2);
      });
    });
  });
});
