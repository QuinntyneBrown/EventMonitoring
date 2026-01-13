import type { Meta, StoryObj } from '@storybook/angular';
import { TabularTileComponent, TabularRow } from './tabular-tile.component';

const navigationData: TabularRow[] = [
  { id: '1', parameter: 'Altitude', value: 408.2, unit: 'km', status: 'normal', timestamp: '14:45:32.234' },
  { id: '2', parameter: 'Velocity', value: 7.66, unit: 'km/s', status: 'normal', timestamp: '14:45:32.234' },
  { id: '3', parameter: 'Inclination', value: 51.64, unit: '\u00B0', status: 'normal', timestamp: '14:45:32.234' },
  { id: '4', parameter: 'Orbital Period', value: 92.68, unit: 'min', status: 'normal', timestamp: '14:45:32.234' },
  { id: '5', parameter: 'GPS Lock', value: 'Acquired', status: 'normal', timestamp: '14:45:32.234' },
];

const propulsionData: TabularRow[] = [
  { id: '1', parameter: 'Thrust Vector X', value: 0.0023, status: 'normal', timestamp: '14:45:32.234' },
  { id: '2', parameter: 'Fuel Pressure', value: 324.7, unit: 'kPa', status: 'warning', timestamp: '14:45:32.234' },
  { id: '3', parameter: 'Engine Temp', value: 892.3, unit: 'K', status: 'normal', timestamp: '14:45:32.234' },
  { id: '4', parameter: 'Oxidizer Flow', value: 12.4, unit: 'kg/s', status: 'normal', timestamp: '14:45:32.234' },
  { id: '5', parameter: 'Chamber Pressure', value: 2.1, unit: 'MPa', status: 'critical', timestamp: '14:45:32.234' },
];

const meta: Meta<TabularTileComponent> = {
  title: 'Tiles/TabularTile',
  component: TabularTileComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    icon: { control: 'text' },
    editMode: { control: 'boolean' },
    showTimestamp: { control: 'boolean' },
    actionClick: { action: 'actionClick' },
    rowClick: { action: 'rowClick' },
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
type Story = StoryObj<TabularTileComponent>;

export const NavigationSystem: Story = {
  args: {
    title: 'Navigation System',
    icon: 'table_chart',
    rows: navigationData,
    editMode: false,
    showTimestamp: true,
  },
};

export const PropulsionSystem: Story = {
  args: {
    title: 'Propulsion System',
    icon: 'table_chart',
    rows: propulsionData,
    editMode: false,
    showTimestamp: true,
  },
};

export const EditMode: Story = {
  args: {
    title: 'Navigation System',
    icon: 'table_chart',
    rows: navigationData,
    editMode: true,
    showTimestamp: true,
  },
};

export const WithoutTimestamp: Story = {
  args: {
    title: 'Simple Metrics',
    icon: 'table_chart',
    rows: navigationData,
    editMode: false,
    showTimestamp: false,
  },
};

export const Empty: Story = {
  args: {
    title: 'Empty Table',
    icon: 'table_chart',
    rows: [],
    editMode: false,
    showTimestamp: true,
  },
};

export const AllNormal: Story = {
  args: {
    title: 'All Systems Normal',
    icon: 'check_circle',
    rows: navigationData,
    editMode: false,
    showTimestamp: true,
  },
};
