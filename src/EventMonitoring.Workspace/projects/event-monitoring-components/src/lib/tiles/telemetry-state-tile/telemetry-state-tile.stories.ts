import type { Meta, StoryObj } from '@storybook/angular';
import { TelemetryStateTileComponent, TelemetryStats, TimelineState } from './telemetry-state-tile.component';

const liveStats: TelemetryStats = {
  updateRate: '5 Hz',
  subscriptions: 12,
  messagesPerSecond: 247,
  connectionStatus: 'OK',
};

const reviewStats: TelemetryStats = {
  updateRate: '5 Hz',
  subscriptions: 12,
  messagesPerSecond: 0,
  connectionStatus: 'OK',
  duration: '8h 24m',
  totalRecords: 18456,
  progress: 42,
};

const liveTimeline: TimelineState = {
  startTime: '2026-01-12 08:00:00',
  endTime: 'Now (Live)',
  currentTime: '2026-01-12 14:52:18 UTC',
  progress: 78,
};

const reviewTimeline: TimelineState = {
  startTime: '2026-01-11 08:00:00',
  endTime: '2026-01-11 16:24:00',
  currentTime: '2026-01-11 11:32:18 UTC',
  progress: 42,
};

const meta: Meta<TelemetryStateTileComponent> = {
  title: 'Tiles/TelemetryStateTile',
  component: TelemetryStateTileComponent,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['live', 'review'] },
    isPlaying: { control: 'boolean' },
    playbackSpeed: { control: 'select', options: [0.5, 1, 2, 4, 8] },
    editMode: { control: 'boolean' },
    modeChange: { action: 'modeChange' },
    playPause: { action: 'playPause' },
    skipPrevious: { action: 'skipPrevious' },
    skipNext: { action: 'skipNext' },
    fastRewind: { action: 'fastRewind' },
    fastForward: { action: 'fastForward' },
    speedChange: { action: 'speedChange' },
    timelineSeek: { action: 'timelineSeek' },
    loadHistoricalData: { action: 'loadHistoricalData' },
    actionClick: { action: 'actionClick' },
  },
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          max-width: 100%;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TelemetryStateTileComponent>;

export const LiveMode: Story = {
  args: {
    mode: 'live',
    isPlaying: true,
    playbackSpeed: 1,
    stats: liveStats,
    timeline: liveTimeline,
    editMode: false,
  },
};

export const LiveModePaused: Story = {
  args: {
    mode: 'live',
    isPlaying: false,
    playbackSpeed: 1,
    stats: liveStats,
    timeline: liveTimeline,
    editMode: false,
  },
};

export const ReviewMode: Story = {
  args: {
    mode: 'review',
    isPlaying: false,
    playbackSpeed: 1,
    stats: reviewStats,
    timeline: reviewTimeline,
    editMode: false,
  },
};

export const ReviewModePlaying: Story = {
  args: {
    mode: 'review',
    isPlaying: true,
    playbackSpeed: 2,
    stats: reviewStats,
    timeline: reviewTimeline,
    editMode: false,
  },
};

export const ReviewModeFastPlayback: Story = {
  args: {
    mode: 'review',
    isPlaying: true,
    playbackSpeed: 4,
    stats: reviewStats,
    timeline: { ...reviewTimeline, progress: 65 },
    editMode: false,
  },
};

export const EditMode: Story = {
  args: {
    mode: 'live',
    isPlaying: true,
    playbackSpeed: 1,
    stats: liveStats,
    timeline: liveTimeline,
    editMode: true,
  },
};

export const ConnectionError: Story = {
  args: {
    mode: 'live',
    isPlaying: false,
    playbackSpeed: 1,
    stats: {
      ...liveStats,
      connectionStatus: 'Error',
      messagesPerSecond: 0,
    },
    timeline: liveTimeline,
    editMode: false,
  },
};
