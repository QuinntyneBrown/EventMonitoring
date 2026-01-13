import type { Meta, StoryObj } from '@storybook/angular';
import { ContentComponent } from './content.component';

const meta: Meta<ContentComponent> = {
  title: 'Layout/Content',
  component: ContentComponent,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          height: 400px;
          background: var(--em-color-surface);
        }
        em-content {
          margin-left: 0;
          margin-top: 0;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ContentComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <em-content>
        <div style="padding: 24px; background: var(--em-color-surface-variant); border-radius: 8px;">
          <h1 style="color: var(--em-color-text-high); margin-bottom: 8px;">Dashboard</h1>
          <p style="color: var(--em-color-text-low);">Real-time space vehicle telemetry monitoring</p>
        </div>
      </em-content>
    `,
  }),
};

export const WithDashboardPlaceholder: Story = {
  render: () => ({
    template: `
      <em-content>
        <div style="text-align: center; padding: 48px; background: var(--em-color-surface); border-radius: 8px; border: 1px dashed var(--em-color-border);">
          <span class="material-icons" style="font-size: 64px; color: var(--em-color-text-disabled);">widgets</span>
          <p style="color: var(--em-color-text-low); margin-top: 16px;">Dashboard tiles will be displayed here</p>
        </div>
      </em-content>
    `,
  }),
};
