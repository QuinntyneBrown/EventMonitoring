import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Layout/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Application title displayed in header',
    },
    logoIcon: {
      control: 'text',
      description: 'Material icon name for the logo',
    },
    mode: {
      control: 'select',
      options: ['live', 'review'],
      description: 'Current telemetry mode',
    },
    showEditToggle: {
      control: 'boolean',
      description: 'Whether to show the edit mode toggle button',
    },
    editModeActive: {
      control: 'boolean',
      description: 'Whether edit mode is currently active',
    },
    menuClick: {
      action: 'menuClick',
      description: 'Emitted when menu button is clicked',
    },
    editToggle: {
      action: 'editToggle',
      description: 'Emitted when edit toggle is clicked',
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
        }
        em-header .header {
          position: relative;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Event Monitoring System',
    logoIcon: 'satellite_alt',
    mode: 'live',
    showEditToggle: true,
    editModeActive: false,
    actions: [
      { id: 'notifications', icon: 'notifications' },
      { id: 'settings', icon: 'settings' },
      { id: 'account', icon: 'account_circle' },
    ],
  },
};

export const LiveMode: Story = {
  args: {
    ...Default.args,
    mode: 'live',
  },
};

export const ReviewMode: Story = {
  args: {
    ...Default.args,
    mode: 'review',
  },
};

export const EditModeActive: Story = {
  args: {
    ...Default.args,
    editModeActive: true,
  },
};

export const WithoutEditToggle: Story = {
  args: {
    ...Default.args,
    showEditToggle: false,
  },
};

export const CustomTitle: Story = {
  args: {
    ...Default.args,
    title: 'Telemetry Dashboard',
    logoIcon: 'rocket',
  },
};

export const MinimalActions: Story = {
  args: {
    ...Default.args,
    actions: [{ id: 'settings', icon: 'settings' }],
  },
};
