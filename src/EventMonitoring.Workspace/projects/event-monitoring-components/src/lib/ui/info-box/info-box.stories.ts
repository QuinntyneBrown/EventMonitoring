import type { Meta, StoryObj } from '@storybook/angular';
import { InfoBoxComponent } from './info-box.component';

const meta: Meta<InfoBoxComponent> = {
  title: 'UI Components/InfoBox',
  component: InfoBoxComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'live', 'review'],
      description: 'Visual variant of the info box',
    },
    icon: {
      control: 'text',
      description: 'Material icon name to display',
    },
  },
};

export default meta;
type Story = StoryObj<InfoBoxComponent>;

export const Info: Story = {
  args: {
    variant: 'info',
    icon: 'info',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-info-box [variant]="variant" [icon]="icon">
        This is an informational message with some <strong>important details</strong>.
      </em-info-box>
    `,
  }),
};

export const LiveMode: Story = {
  args: {
    variant: 'live',
    icon: 'broadcast_on_personal',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-info-box [variant]="variant" [icon]="icon">
        Receiving <strong>live telemetry</strong> from TelemetryStreaming service via SignalR at <strong>5 Hz</strong>
      </em-info-box>
    `,
  }),
};

export const ReviewMode: Story = {
  args: {
    variant: 'review',
    icon: 'history',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-info-box [variant]="variant" [icon]="icon">
        Viewing historical data from <strong>2026-01-11</strong>. Loaded <strong>18,456</strong> records across <strong>12</strong> metrics.
      </em-info-box>
    `,
  }),
};
