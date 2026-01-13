import type { Meta, StoryObj } from '@storybook/angular';
import { GraphTileComponent, GraphSeries } from './graph-tile.component';

const temperatureData: GraphSeries[] = [
  {
    label: 'Temperature (K)',
    data: Array.from({ length: 20 }, (_, i) => ({
      timestamp: `${i * 3}s`,
      value: 850 + Math.sin(i * 0.5) * 40 + Math.random() * 10,
    })),
    color: '#bb86fc',
  },
];

const powerData: GraphSeries[] = [
  {
    label: 'Power (kW)',
    data: Array.from({ length: 20 }, (_, i) => ({
      timestamp: `${i * 3}s`,
      value: 50 + Math.cos(i * 0.3) * 15 + Math.random() * 5,
    })),
    color: '#03dac6',
  },
];

const multiSeriesData: GraphSeries[] = [
  {
    label: 'Sensor 1',
    data: Array.from({ length: 15 }, (_, i) => ({
      timestamp: `${i}m`,
      value: 100 + Math.sin(i * 0.4) * 30,
    })),
    color: '#bb86fc',
  },
  {
    label: 'Sensor 2',
    data: Array.from({ length: 15 }, (_, i) => ({
      timestamp: `${i}m`,
      value: 80 + Math.cos(i * 0.4) * 25,
    })),
    color: '#03dac6',
  },
];

const meta: Meta<GraphTileComponent> = {
  title: 'Tiles/GraphTile',
  component: GraphTileComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    icon: { control: 'text' },
    graphType: { control: 'select', options: ['line', 'bar', 'area'] },
    editMode: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    yAxisMin: { control: 'number' },
    yAxisMax: { control: 'number' },
    actionClick: { action: 'actionClick' },
  },
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          max-width: 500px;
          height: 350px;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<GraphTileComponent>;

export const PropulsionTemperature: Story = {
  args: {
    title: 'Propulsion Temperature',
    icon: 'show_chart',
    series: temperatureData,
    graphType: 'line',
    editMode: false,
    showLegend: false,
    yAxisMin: 800,
    yAxisMax: 950,
  },
};

export const PowerSystemOutput: Story = {
  args: {
    title: 'Power System Output',
    icon: 'show_chart',
    series: powerData,
    graphType: 'line',
    editMode: false,
    showLegend: false,
    yAxisMin: 30,
    yAxisMax: 80,
  },
};

export const AreaChart: Story = {
  args: {
    title: 'Area Chart Example',
    icon: 'area_chart',
    series: temperatureData,
    graphType: 'area',
    editMode: false,
    showLegend: false,
  },
};

export const BarChart: Story = {
  args: {
    title: 'Bar Chart Example',
    icon: 'bar_chart',
    series: [
      {
        label: 'Values',
        data: Array.from({ length: 8 }, (_, i) => ({
          timestamp: `Day ${i + 1}`,
          value: 50 + Math.random() * 50,
        })),
        color: '#bb86fc',
      },
    ],
    graphType: 'bar',
    editMode: false,
    showLegend: false,
  },
};

export const MultiSeries: Story = {
  args: {
    title: 'Multi-Sensor Comparison',
    icon: 'show_chart',
    series: multiSeriesData,
    graphType: 'line',
    editMode: false,
    showLegend: true,
  },
};

export const EditMode: Story = {
  args: {
    title: 'Propulsion Temperature',
    icon: 'show_chart',
    series: temperatureData,
    graphType: 'line',
    editMode: true,
    showLegend: false,
  },
};

export const Empty: Story = {
  args: {
    title: 'Empty Chart',
    icon: 'show_chart',
    series: [],
    graphType: 'line',
    editMode: false,
    showLegend: false,
  },
};
