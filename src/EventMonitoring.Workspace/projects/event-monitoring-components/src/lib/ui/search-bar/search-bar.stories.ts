import type { Meta, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar.component';

const meta: Meta<SearchBarComponent> = {
  title: 'UI Components/SearchBar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    icon: {
      control: 'text',
      description: 'Material icon name to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the search bar is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    icon: 'search',
    disabled: false,
  },
};

export const ConfigurationFiles: Story = {
  args: {
    placeholder: 'Search configuration files...',
    icon: 'search',
    disabled: false,
  },
};

export const WithFilterIcon: Story = {
  args: {
    placeholder: 'Filter results...',
    icon: 'filter_list',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search is disabled',
    icon: 'search',
    disabled: true,
  },
};
