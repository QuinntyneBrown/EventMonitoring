import type { Meta, StoryObj } from '@storybook/angular';
import { ConfigFileModalComponent, ConfigFile } from './config-file-modal.component';

const mockConfigFiles: ConfigFile[] = [
  {
    id: '1',
    name: 'Propulsion System Telemetry',
    path: '/configs/propulsion/telemetry.json',
    itemCount: 12,
    lastModified: new Date('2026-01-10'),
    items: [
      'thrust_vector_x',
      'thrust_vector_y',
      'thrust_vector_z',
      'fuel_pressure',
      'oxidizer_pressure',
      'engine_temp_1',
      'engine_temp_2',
      'combustion_chamber',
      'fuel_flow_rate',
      'oxidizer_flow',
      'thrust_magnitude',
      'specific_impulse',
    ],
  },
  {
    id: '2',
    name: 'Navigation System Telemetry',
    path: '/configs/navigation/telemetry.json',
    itemCount: 8,
    lastModified: new Date('2026-01-09'),
    items: [
      'altitude',
      'velocity',
      'inclination',
      'orbital_period',
      'gps_lock',
      'position_x',
      'position_y',
      'position_z',
    ],
  },
  {
    id: '3',
    name: 'Power System Monitoring',
    path: '/configs/power/monitoring.json',
    itemCount: 15,
    lastModified: new Date('2026-01-08'),
    items: [
      'solar_panel_1',
      'solar_panel_2',
      'battery_level',
      'power_consumption',
      'voltage_bus',
    ],
  },
  {
    id: '4',
    name: 'Thermal Control Sensors',
    path: '/configs/thermal/sensors.json',
    itemCount: 6,
    lastModified: new Date('2026-01-07'),
    items: ['temp_internal', 'temp_external', 'heater_status'],
  },
  {
    id: '5',
    name: 'Communication System Status',
    path: '/configs/comm/status.json',
    itemCount: 10,
    lastModified: new Date('2026-01-05'),
    items: ['signal_strength', 'data_rate', 'packet_loss'],
  },
];

const meta: Meta<ConfigFileModalComponent> = {
  title: 'Modal/ConfigFileModal',
  component: ConfigFileModalComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    configFiles: { control: 'object' },
    closed: { action: 'closed' },
    apply: { action: 'apply' },
  },
};

export default meta;
type Story = StoryObj<ConfigFileModalComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    configFiles: mockConfigFiles,
  },
};

export const EmptyList: Story = {
  args: {
    isOpen: true,
    configFiles: [],
  },
};

export const SingleFile: Story = {
  args: {
    isOpen: true,
    configFiles: [mockConfigFiles[0]],
  },
};

export const ManyFiles: Story = {
  args: {
    isOpen: true,
    configFiles: [
      ...mockConfigFiles,
      {
        id: '6',
        name: 'Attitude Control System',
        path: '/configs/attitude/control.json',
        itemCount: 9,
        lastModified: new Date('2026-01-04'),
        items: ['roll', 'pitch', 'yaw'],
      },
      {
        id: '7',
        name: 'Life Support Systems',
        path: '/configs/life-support/telemetry.json',
        itemCount: 20,
        lastModified: new Date('2026-01-03'),
        items: ['oxygen_level', 'co2_level', 'humidity'],
      },
      {
        id: '8',
        name: 'Payload Operations',
        path: '/configs/payload/operations.json',
        itemCount: 5,
        lastModified: new Date('2026-01-02'),
        items: ['payload_status', 'data_collected'],
      },
    ],
  },
};
