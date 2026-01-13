import type { Meta, StoryObj } from '@storybook/angular';
import { HistoricalRequestModalComponent } from './historical-request-modal.component';

const meta: Meta<HistoricalRequestModalComponent> = {
  title: 'Modal/HistoricalRequestModal',
  component: HistoricalRequestModalComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    activeSubscriptions: { control: 'number' },
    recordsPerSecond: { control: 'number' },
    pageSize: { control: 'number' },
    closed: { action: 'closed' },
    loadData: { action: 'loadData' },
  },
};

export default meta;
type Story = StoryObj<HistoricalRequestModalComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    activeSubscriptions: 12,
    recordsPerSecond: 5,
    pageSize: 100,
  },
};

export const HighFrequency: Story = {
  args: {
    isOpen: true,
    activeSubscriptions: 20,
    recordsPerSecond: 10,
    pageSize: 100,
  },
};

export const LargePageSize: Story = {
  args: {
    isOpen: true,
    activeSubscriptions: 12,
    recordsPerSecond: 5,
    pageSize: 1000,
  },
};

export const FewSubscriptions: Story = {
  args: {
    isOpen: true,
    activeSubscriptions: 3,
    recordsPerSecond: 1,
    pageSize: 100,
  },
};
