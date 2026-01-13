import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'UI Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'icon'],
      description: 'Visual style variant of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    icon: {
      control: 'text',
      description: 'Material icon name to display',
    },
    label: {
      control: 'text',
      description: 'Text label for the button',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    label: 'Apply Configuration',
    icon: 'check',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Cancel',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    label: 'Edit Mode',
    icon: 'edit',
  },
};

export const Icon: Story = {
  args: {
    variant: 'icon',
    icon: 'settings',
  },
};

export const IconNotifications: Story = {
  args: {
    variant: 'icon',
    icon: 'notifications',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Disabled Button',
    disabled: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    label: 'Disabled Secondary',
    disabled: true,
  },
};
