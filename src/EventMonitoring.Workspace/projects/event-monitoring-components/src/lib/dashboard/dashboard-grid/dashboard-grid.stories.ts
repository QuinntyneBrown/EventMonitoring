import type { Meta, StoryObj } from '@storybook/angular';
import { DashboardGridComponent } from './dashboard-grid.component';
import { TileComponent } from '../tile/tile.component';
import { TilePlaceholderComponent } from '../tile-placeholder/tile-placeholder.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<DashboardGridComponent> = {
  title: 'Dashboard/DashboardGrid',
  component: DashboardGridComponent,
  tags: ['autodocs'],
  argTypes: {
    editMode: { control: 'boolean' },
    columns: { control: 'number' },
    cellHeight: { control: 'number' },
    margin: { control: 'number' },
    gridChange: { action: 'gridChange' },
    itemRemove: { action: 'itemRemove' },
  },
  decorators: [
    moduleMetadata({
      imports: [TileComponent, TilePlaceholderComponent],
    }),
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          height: 600px;
          padding: 16px;
          background: var(--em-color-background);
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DashboardGridComponent>;

export const Default: Story = {
  args: {
    editMode: false,
    columns: 12,
    cellHeight: 60,
    margin: 16,
    items: [],
  },
  render: (args) => ({
    props: args,
    template: `
      <em-dashboard-grid [editMode]="editMode" [columns]="columns" [cellHeight]="cellHeight" [margin]="margin">
        <em-tile
          title="Propulsion Temperature"
          icon="show_chart"
          [actions]="[{id: 'fullscreen', icon: 'fullscreen'}]"
          gridColumn="span 6"
          gridRow="span 4"
          [editMode]="editMode"
        >
          <div style="height: 180px; display: flex; align-items: center; justify-content: center; color: var(--em-color-text-low);">
            Chart placeholder
          </div>
        </em-tile>
        <em-tile
          title="Power System Output"
          icon="show_chart"
          [actions]="[{id: 'fullscreen', icon: 'fullscreen'}]"
          gridColumn="span 6"
          gridRow="span 4"
          [editMode]="editMode"
        >
          <div style="height: 180px; display: flex; align-items: center; justify-content: center; color: var(--em-color-text-low);">
            Chart placeholder
          </div>
        </em-tile>
        <em-tile
          title="Navigation System"
          icon="table_chart"
          type="tabular"
          gridColumn="span 6"
          gridRow="span 4"
          [editMode]="editMode"
        >
          <div style="color: var(--em-color-text-low);">Table data placeholder</div>
        </em-tile>
        <em-tile
          title="Propulsion System"
          icon="table_chart"
          type="tabular"
          gridColumn="span 6"
          gridRow="span 4"
          [editMode]="editMode"
        >
          <div style="color: var(--em-color-text-low);">Table data placeholder</div>
        </em-tile>
      </em-dashboard-grid>
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

export const WithTelemetryState: Story = {
  args: {
    ...Default.args,
    editMode: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <em-dashboard-grid [editMode]="editMode">
        <em-tile
          title="Telemetry State Control"
          icon="timeline"
          type="telemetry-state"
          [actions]="[{id: 'settings', icon: 'settings'}]"
          gridColumn="span 12"
          gridRow="span 2"
          [editMode]="editMode"
        >
          <div style="display: flex; gap: 24px; align-items: center;">
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 12px; color: var(--em-color-text-low);">Update Rate</span>
              <span style="font-size: 16px; color: var(--em-color-secondary);">5 Hz</span>
            </div>
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 12px; color: var(--em-color-text-low);">Active Subscriptions</span>
              <span style="font-size: 16px; color: var(--em-color-secondary);">12</span>
            </div>
          </div>
        </em-tile>
        <em-tile
          title="Propulsion Temperature"
          icon="show_chart"
          gridColumn="span 6"
          gridRow="span 4"
          [editMode]="editMode"
        >
          <div style="height: 150px; display: flex; align-items: center; justify-content: center; color: var(--em-color-text-low);">
            Chart placeholder
          </div>
        </em-tile>
        <em-tile
          title="Navigation System"
          icon="table_chart"
          type="tabular"
          gridColumn="span 6"
          gridRow="span 4"
          [editMode]="editMode"
        >
          <div style="color: var(--em-color-text-low);">Table data placeholder</div>
        </em-tile>
      </em-dashboard-grid>
    `,
  }),
};

export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    editMode: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <em-dashboard-grid [editMode]="editMode">
        <em-tile
          title="Existing Tile"
          icon="show_chart"
          gridColumn="span 6"
          gridRow="span 4"
          [editMode]="editMode"
        >
          <div style="height: 150px; display: flex; align-items: center; justify-content: center; color: var(--em-color-text-low);">
            Chart placeholder
          </div>
        </em-tile>
        <em-tile-placeholder
          icon="add"
          text="Add new tile"
          gridColumn="span 6"
          gridRow="span 4"
        ></em-tile-placeholder>
      </em-dashboard-grid>
    `,
  }),
};

export const EmptyGrid: Story = {
  args: {
    ...Default.args,
    editMode: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <em-dashboard-grid [editMode]="editMode">
        <em-tile-placeholder
          icon="dashboard_customize"
          text="Click to add your first tile"
          gridColumn="span 12"
          gridRow="span 4"
        ></em-tile-placeholder>
      </em-dashboard-grid>
    `,
  }),
};
