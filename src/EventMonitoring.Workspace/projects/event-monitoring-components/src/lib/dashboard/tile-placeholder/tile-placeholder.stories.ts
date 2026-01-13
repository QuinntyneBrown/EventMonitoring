import type { Meta, StoryObj } from '@storybook/angular';
import { TilePlaceholderComponent } from './tile-placeholder.component';

const meta: Meta<TilePlaceholderComponent> = {
  title: 'Dashboard/TilePlaceholder',
  component: TilePlaceholderComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Material icon name displayed in the placeholder',
    },
    text: {
      control: 'text',
      description: 'Text displayed below the icon',
    },
    gridColumn: {
      control: 'text',
      description: 'CSS grid-column value',
    },
    gridRow: {
      control: 'text',
      description: 'CSS grid-row value',
    },
    add: {
      action: 'add',
      description: 'Emitted when placeholder is clicked',
    },
  },
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          max-width: 300px;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TilePlaceholderComponent>;

export const Default: Story = {
  args: {
    icon: 'add',
    text: 'Add Tile',
    gridColumn: 'auto',
    gridRow: 'auto',
  },
};

export const AddWidget: Story = {
  args: {
    icon: 'widgets',
    text: 'Add Widget',
    gridColumn: 'auto',
    gridRow: 'auto',
  },
};

export const AddChart: Story = {
  args: {
    icon: 'show_chart',
    text: 'Add Chart',
    gridColumn: 'auto',
    gridRow: 'auto',
  },
};

export const EmptyDashboard: Story = {
  args: {
    icon: 'dashboard_customize',
    text: 'Click to add your first tile',
    gridColumn: 'auto',
    gridRow: 'auto',
  },
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          max-width: 400px;
        }
        em-tile-placeholder {
          min-height: 200px;
        }
        `,
      ],
    }),
  ],
};
