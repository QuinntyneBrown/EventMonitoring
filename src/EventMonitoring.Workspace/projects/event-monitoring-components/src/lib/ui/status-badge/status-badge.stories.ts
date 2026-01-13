import type { Meta, StoryObj } from '@storybook/angular';
import { StatusBadgeComponent } from './status-badge.component';

const meta: Meta<StatusBadgeComponent> = {
  title: 'UI Components/StatusBadge',
  component: StatusBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['normal', 'warning', 'critical'],
      description: 'Status type that determines the badge color',
    },
    label: {
      control: 'text',
      description: 'Optional custom label (defaults to capitalized status)',
    },
  },
};

export default meta;
type Story = StoryObj<StatusBadgeComponent>;

export const Normal: Story = {
  args: {
    status: 'normal',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
  },
};

export const Critical: Story = {
  args: {
    status: 'critical',
  },
};

export const CustomLabel: Story = {
  args: {
    status: 'normal',
    label: 'OK',
  },
};

export const AllStatuses: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <em-status-badge status="normal"></em-status-badge>
        <em-status-badge status="warning"></em-status-badge>
        <em-status-badge status="critical"></em-status-badge>
      </div>
    `,
  }),
};
