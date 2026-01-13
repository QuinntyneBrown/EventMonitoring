import type { Meta, StoryObj } from '@storybook/angular';
import { TileComponent } from './tile.component';

const meta: Meta<TileComponent> = {
  title: 'Dashboard/Tile',
  component: TileComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    icon: { control: 'text' },
    type: {
      control: 'select',
      options: ['default', 'graph', 'tabular', 'telemetry-state'],
    },
    editMode: { control: 'boolean' },
    gridColumn: { control: 'text' },
    gridRow: { control: 'text' },
    actionClick: { action: 'actionClick' },
    dragStart: { action: 'dragStart' },
    remove: { action: 'remove' },
  },
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          max-width: 500px;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TileComponent>;

export const Default: Story = {
  args: {
    title: 'Propulsion Temperature',
    icon: 'show_chart',
    type: 'default',
    editMode: false,
    actions: [
      { id: 'folder', icon: 'folder_open' },
      { id: 'fullscreen', icon: 'fullscreen' },
      { id: 'more', icon: 'more_vert' },
    ],
    gridColumn: 'auto',
    gridRow: 'auto',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-tile
        [title]="title"
        [icon]="icon"
        [type]="type"
        [editMode]="editMode"
        [actions]="actions"
        [gridColumn]="gridColumn"
        [gridRow]="gridRow"
        (actionClick)="actionClick($event)"
        (dragStart)="dragStart($event)"
        (remove)="remove($event)"
      >
        <div style="height: 200px; display: flex; align-items: center; justify-content: center; color: var(--em-color-text-low);">
          Chart content goes here
        </div>
      </em-tile>
    `,
  }),
};

export const GraphTile: Story = {
  args: {
    ...Default.args,
    title: 'Power System Output',
    type: 'graph',
  },
  render: Default.render,
};

export const TabularTile: Story = {
  args: {
    ...Default.args,
    title: 'Navigation System',
    icon: 'table_chart',
    type: 'tabular',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-tile
        [title]="title"
        [icon]="icon"
        [type]="type"
        [editMode]="editMode"
        [actions]="actions"
        (actionClick)="actionClick($event)"
      >
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; color: var(--em-color-text-medium);">Parameter</th>
              <th style="text-align: left; padding: 8px; color: var(--em-color-text-medium);">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; color: var(--em-color-text-medium);">Altitude</td>
              <td style="padding: 8px; color: var(--em-color-secondary); font-family: monospace;">408.2 km</td>
            </tr>
            <tr>
              <td style="padding: 8px; color: var(--em-color-text-medium);">Velocity</td>
              <td style="padding: 8px; color: var(--em-color-secondary); font-family: monospace;">7.66 km/s</td>
            </tr>
          </tbody>
        </table>
      </em-tile>
    `,
  }),
};

export const EditMode: Story = {
  args: {
    ...Default.args,
    editMode: true,
  },
  render: Default.render,
};

export const TelemetryState: Story = {
  args: {
    ...Default.args,
    title: 'Telemetry State Control',
    icon: 'timeline',
    type: 'telemetry-state',
    actions: [{ id: 'settings', icon: 'settings' }],
  },
  render: (args) => ({
    props: args,
    template: `
      <em-tile
        [title]="title"
        [icon]="icon"
        [type]="type"
        [editMode]="editMode"
        [actions]="actions"
        (actionClick)="actionClick($event)"
      >
        <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 12px; color: var(--em-color-text-low);">Update Rate</span>
            <span style="font-size: 16px; color: var(--em-color-secondary); font-weight: 500;">5 Hz</span>
          </div>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 12px; color: var(--em-color-text-low);">Active Subscriptions</span>
            <span style="font-size: 16px; color: var(--em-color-secondary); font-weight: 500;">12</span>
          </div>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 12px; color: var(--em-color-text-low);">Messages/sec</span>
            <span style="font-size: 16px; color: var(--em-color-secondary); font-weight: 500;">247</span>
          </div>
        </div>
      </em-tile>
    `,
  }),
};
