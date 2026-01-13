import type { Meta, StoryObj } from '@storybook/angular';
import { ModeIndicatorComponent } from './mode-indicator.component';

const meta: Meta<ModeIndicatorComponent> = {
  title: 'UI Components/ModeIndicator',
  component: ModeIndicatorComponent,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['live', 'review'],
      description: 'The current telemetry mode',
    },
    showPulse: {
      control: 'boolean',
      description: 'Whether to show pulse animation in live mode',
    },
  },
};

export default meta;
type Story = StoryObj<ModeIndicatorComponent>;

export const LiveMode: Story = {
  args: {
    mode: 'live',
    showPulse: true,
  },
};

export const LiveModeNoPulse: Story = {
  args: {
    mode: 'live',
    showPulse: false,
  },
};

export const ReviewMode: Story = {
  args: {
    mode: 'review',
  },
};

export const BothModes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <em-mode-indicator mode="live"></em-mode-indicator>
        <em-mode-indicator mode="review"></em-mode-indicator>
      </div>
    `,
  }),
};
