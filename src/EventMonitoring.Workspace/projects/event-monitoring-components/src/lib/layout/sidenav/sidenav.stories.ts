import type { Meta, StoryObj } from '@storybook/angular';
import { SidenavComponent, SidenavSection } from './sidenav.component';

const defaultSections: SidenavSection[] = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'telemetry', label: 'Telemetry', icon: 'show_chart' },
      { id: 'historical', label: 'Historical Data', icon: 'history' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { id: 'config', label: 'Config Files', icon: 'folder' },
      { id: 'settings', label: 'Settings', icon: 'tune' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'health', label: 'Health Status', icon: 'monitor_heart' },
      { id: 'help', label: 'Help', icon: 'help_outline' },
    ],
  },
];

const meta: Meta<SidenavComponent> = {
  title: 'Layout/Sidenav',
  component: SidenavComponent,
  tags: ['autodocs'],
  argTypes: {
    sections: {
      control: 'object',
      description: 'Array of navigation sections with items',
    },
    activeItemId: {
      control: 'text',
      description: 'ID of the currently active item',
    },
    itemClick: {
      action: 'itemClick',
      description: 'Emitted when a navigation item is clicked',
    },
  },
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          height: 500px;
        }
        em-sidenav .sidenav {
          position: relative;
          top: 0;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<SidenavComponent>;

export const Default: Story = {
  args: {
    sections: defaultSections,
    activeItemId: 'dashboard',
  },
};

export const TelemetryActive: Story = {
  args: {
    sections: defaultSections,
    activeItemId: 'telemetry',
  },
};

export const ConfigActive: Story = {
  args: {
    sections: defaultSections,
    activeItemId: 'config',
  },
};

export const NoActiveItem: Story = {
  args: {
    sections: defaultSections,
    activeItemId: null,
  },
};

export const SingleSection: Story = {
  args: {
    sections: [defaultSections[0]],
    activeItemId: 'dashboard',
  },
};
