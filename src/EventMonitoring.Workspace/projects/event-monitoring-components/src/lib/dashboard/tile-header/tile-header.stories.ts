import type { Meta, StoryObj } from '@storybook/angular';
import { TileHeaderComponent } from './tile-header.component';

const meta: Meta<TileHeaderComponent> = {
  title: 'Dashboard/TileHeader',
  component: TileHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text displayed in the header',
    },
    icon: {
      control: 'text',
      description: 'Material icon name displayed before the title',
    },
    actions: {
      control: 'object',
      description: 'Array of action buttons',
    },
    actionClick: {
      action: 'actionClick',
      description: 'Emitted when an action button is clicked',
    },
  },
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          max-width: 400px;
          background: var(--em-color-surface);
          border-radius: var(--em-radius-md);
          overflow: hidden;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TileHeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Propulsion Temperature',
    icon: 'show_chart',
    actions: [
      { id: 'folder', icon: 'folder_open', label: 'Open Config' },
      { id: 'fullscreen', icon: 'fullscreen', label: 'Fullscreen' },
      { id: 'more', icon: 'more_vert', label: 'More Options' },
    ],
  },
};

export const TableTile: Story = {
  args: {
    title: 'Navigation System',
    icon: 'table_chart',
    actions: [
      { id: 'folder', icon: 'folder_open' },
      { id: 'more', icon: 'more_vert' },
    ],
  },
};

export const TelemetryState: Story = {
  args: {
    title: 'Telemetry State Control',
    icon: 'timeline',
    actions: [{ id: 'settings', icon: 'settings' }],
  },
};

export const NoIcon: Story = {
  args: {
    title: 'Simple Header',
    icon: '',
    actions: [{ id: 'more', icon: 'more_vert' }],
  },
};

export const NoActions: Story = {
  args: {
    title: 'Header Without Actions',
    icon: 'info',
    actions: [],
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Very Long Tile Title That Might Need Truncation',
    icon: 'analytics',
    actions: [
      { id: 'fullscreen', icon: 'fullscreen' },
      { id: 'more', icon: 'more_vert' },
    ],
  },
};
