import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TelemetryStateTileComponent, TelemetryStats, TimelineState } from './telemetry-state-tile.component';

describe('TelemetryStateTileComponent', () => {
  let component: TelemetryStateTileComponent;
  let fixture: ComponentFixture<TelemetryStateTileComponent>;

  const mockStats: TelemetryStats = {
    updateRate: '5 Hz',
    subscriptions: 12,
    messagesPerSecond: 247,
    connectionStatus: 'OK',
    duration: '8h 24m',
    totalRecords: 18456,
    progress: 42,
  };

  const mockTimeline: TimelineState = {
    startTime: '2026-01-12 08:00:00',
    endTime: 'Now',
    currentTime: '2026-01-12 14:45:32 UTC',
    progress: 75,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelemetryStateTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelemetryStateTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render em-tile component', () => {
      const tile = fixture.nativeElement.querySelector('em-tile');
      expect(tile).toBeTruthy();
    });

    it('should render mode toggle buttons', () => {
      const modeButtons = fixture.nativeElement.querySelectorAll('.telemetry-state__mode-btn');
      expect(modeButtons.length).toBe(2);
    });

    it('should render playback controls', () => {
      const playbackControls = fixture.nativeElement.querySelector('.telemetry-state__playback');
      expect(playbackControls).toBeTruthy();
    });

    it('should render timeline', () => {
      const timeline = fixture.nativeElement.querySelector('.telemetry-state__timeline');
      expect(timeline).toBeTruthy();
    });

    it('should render stats', () => {
      const stats = fixture.nativeElement.querySelectorAll('.telemetry-state__stat');
      expect(stats.length).toBeGreaterThan(0);
    });
  });

  describe('mode toggle', () => {
    it('should apply active class to live button when in live mode', () => {
      component.mode = 'live';
      fixture.detectChanges();

      const liveBtn = fixture.nativeElement.querySelector('.telemetry-state__mode-btn--active-live');
      expect(liveBtn).toBeTruthy();
    });

    it('should apply active class to review button when in review mode', () => {
      component.mode = 'review';
      fixture.detectChanges();

      const reviewBtn = fixture.nativeElement.querySelector('.telemetry-state__mode-btn--active-review');
      expect(reviewBtn).toBeTruthy();
    });

    it('should emit modeChange when mode button is clicked', () => {
      const modeChangeSpy = vi.fn();
      component.modeChange.subscribe(modeChangeSpy);

      component.onModeChange('review');

      expect(modeChangeSpy).toHaveBeenCalledWith('review');
    });
  });

  describe('playback controls', () => {
    it('should show play icon when not playing', () => {
      component.isPlaying = false;
      expect(component.playPauseIcon).toBe('play_arrow');
    });

    it('should show pause icon when playing', () => {
      component.isPlaying = true;
      expect(component.playPauseIcon).toBe('pause');
    });

    it('should emit playPause when play/pause button is clicked', () => {
      const playPauseSpy = vi.fn();
      component.playPause.subscribe(playPauseSpy);

      component.onPlayPause();

      expect(playPauseSpy).toHaveBeenCalled();
    });

    it('should emit skipPrevious when skip previous is clicked', () => {
      const skipPreviousSpy = vi.fn();
      component.skipPrevious.subscribe(skipPreviousSpy);

      component.onSkipPrevious();

      expect(skipPreviousSpy).toHaveBeenCalled();
    });

    it('should emit skipNext when skip next is clicked', () => {
      const skipNextSpy = vi.fn();
      component.skipNext.subscribe(skipNextSpy);

      component.onSkipNext();

      expect(skipNextSpy).toHaveBeenCalled();
    });
  });

  describe('review mode specific controls', () => {
    beforeEach(() => {
      component.mode = 'review';
      fixture.detectChanges();
    });

    it('should show fast rewind button in review mode', () => {
      const fastRewindBtn = fixture.nativeElement.querySelector('.telemetry-state__playback-btn');
      expect(fastRewindBtn.querySelector('.material-icons').textContent).toContain('fast_rewind');
    });

    it('should show speed control in review mode', () => {
      const speedControl = fixture.nativeElement.querySelector('.telemetry-state__speed');
      expect(speedControl).toBeTruthy();
    });

    it('should emit fastRewind when button is clicked', () => {
      const fastRewindSpy = vi.fn();
      component.fastRewind.subscribe(fastRewindSpy);

      component.onFastRewind();

      expect(fastRewindSpy).toHaveBeenCalled();
    });

    it('should emit fastForward when button is clicked', () => {
      const fastForwardSpy = vi.fn();
      component.fastForward.subscribe(fastForwardSpy);

      component.onFastForward();

      expect(fastForwardSpy).toHaveBeenCalled();
    });
  });

  describe('speed control', () => {
    it('should emit speedChange when increasing speed', () => {
      component.playbackSpeed = 1;
      const speedChangeSpy = vi.fn();
      component.speedChange.subscribe(speedChangeSpy);

      component.onSpeedIncrease();

      expect(speedChangeSpy).toHaveBeenCalledWith(2);
    });

    it('should emit speedChange when decreasing speed', () => {
      component.playbackSpeed = 2;
      const speedChangeSpy = vi.fn();
      component.speedChange.subscribe(speedChangeSpy);

      component.onSpeedDecrease();

      expect(speedChangeSpy).toHaveBeenCalledWith(1);
    });

    it('should not emit speedChange when at min speed and decreasing', () => {
      component.playbackSpeed = 0.5;
      const speedChangeSpy = vi.fn();
      component.speedChange.subscribe(speedChangeSpy);

      component.onSpeedDecrease();

      expect(speedChangeSpy).not.toHaveBeenCalled();
    });

    it('should not emit speedChange when at max speed and increasing', () => {
      component.playbackSpeed = 8;
      const speedChangeSpy = vi.fn();
      component.speedChange.subscribe(speedChangeSpy);

      component.onSpeedIncrease();

      expect(speedChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('live mode specific controls', () => {
    beforeEach(() => {
      component.mode = 'live';
      fixture.detectChanges();
    });

    it('should show load historical data button in live mode', () => {
      const historyBtn = fixture.nativeElement.querySelector('.telemetry-state__history-btn');
      expect(historyBtn).toBeTruthy();
    });

    it('should emit loadHistoricalData when button is clicked', () => {
      const loadHistoricalDataSpy = vi.fn();
      component.loadHistoricalData.subscribe(loadHistoricalDataSpy);

      component.onLoadHistoricalData();

      expect(loadHistoricalDataSpy).toHaveBeenCalled();
    });
  });

  describe('timeline', () => {
    it('should apply timeline progress style', () => {
      component.timeline = mockTimeline;
      fixture.detectChanges();

      const progress = fixture.nativeElement.querySelector('.telemetry-state__timeline-progress');
      expect(progress.style.width).toBe('75%');
    });

    it('should emit timelineSeek on timeline click', () => {
      const timelineSeekSpy = vi.fn();
      component.timelineSeek.subscribe(timelineSeekSpy);

      const mockEvent = {
        currentTarget: {
          getBoundingClientRect: () => ({ left: 0, width: 100 }),
        },
        clientX: 50,
      } as unknown as MouseEvent;

      component.onTimelineClick(mockEvent);

      expect(timelineSeekSpy).toHaveBeenCalledWith(50);
    });
  });

  describe('info banner', () => {
    it('should show live info text in live mode', () => {
      component.mode = 'live';
      component.stats = mockStats;

      expect(component.infoBannerText).toContain('live telemetry');
      expect(component.infoBannerText).toContain('5 Hz');
    });

    it('should show review info text in review mode', () => {
      component.mode = 'review';
      component.stats = mockStats;

      expect(component.infoBannerText).toContain('historical data');
      expect(component.infoBannerText).toContain('18,456');
    });

    it('should return correct info variant', () => {
      component.mode = 'live';
      expect(component.infoVariant).toBe('live');

      component.mode = 'review';
      expect(component.infoVariant).toBe('review');
    });
  });

  describe('default values', () => {
    it('should have default mode as live', () => {
      expect(component.mode).toBe('live');
    });

    it('should not be playing by default', () => {
      expect(component.isPlaying).toBe(false);
    });

    it('should have default playback speed of 1', () => {
      expect(component.playbackSpeed).toBe(1);
    });

    it('should have default stats', () => {
      expect(component.stats.updateRate).toBe('5 Hz');
      expect(component.stats.subscriptions).toBe(12);
    });
  });
});
