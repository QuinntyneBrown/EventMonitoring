import type { Meta, StoryObj } from '@storybook/angular';
import { ModalOverlayComponent } from './modal-overlay.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<ModalOverlayComponent> = {
  title: 'Modal/ModalOverlay',
  component: ModalOverlayComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    icon: { control: 'text' },
    iconColor: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    closeOnBackdrop: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    closed: { action: 'closed' },
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ModalOverlayComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Modal Title',
    icon: 'info',
    iconColor: 'primary',
    size: 'medium',
    closeOnBackdrop: true,
    showFooter: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <em-modal-overlay
        [isOpen]="isOpen"
        [title]="title"
        [icon]="icon"
        [iconColor]="iconColor"
        [size]="size"
        [closeOnBackdrop]="closeOnBackdrop"
        [showFooter]="showFooter"
        (closed)="closed($event)"
      >
        <p style="color: var(--em-color-text-medium); margin-bottom: 16px;">
          This is the modal content. You can put any content here.
        </p>
        <p style="color: var(--em-color-text-low);">
          Click the X button or press Escape to close.
        </p>
        <div modal-footer>
          <em-button variant="secondary" (clicked)="closed()">Cancel</em-button>
          <em-button variant="primary" (clicked)="closed()">Confirm</em-button>
        </div>
      </em-modal-overlay>
    `,
  }),
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'small',
    title: 'Confirm Action',
    icon: 'warning',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-modal-overlay
        [isOpen]="isOpen"
        [title]="title"
        [icon]="icon"
        [iconColor]="iconColor"
        [size]="size"
        (closed)="closed($event)"
      >
        <p style="color: var(--em-color-text-medium);">
          Are you sure you want to perform this action?
        </p>
        <div modal-footer>
          <em-button variant="secondary" (clicked)="closed()">Cancel</em-button>
          <em-button variant="primary" (clicked)="closed()">Confirm</em-button>
        </div>
      </em-modal-overlay>
    `,
  }),
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
    title: 'Select Configuration File',
    icon: 'folder_open',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-modal-overlay
        [isOpen]="isOpen"
        [title]="title"
        [icon]="icon"
        [iconColor]="iconColor"
        [size]="size"
        (closed)="closed($event)"
      >
        <p style="color: var(--em-color-text-medium); margin-bottom: 16px;">
          Select a configuration file from the list below.
        </p>
        <div style="background: var(--em-color-surface-variant); padding: 16px; border-radius: 4px; margin-bottom: 8px;">
          Configuration Item 1
        </div>
        <div style="background: var(--em-color-surface-variant); padding: 16px; border-radius: 4px; margin-bottom: 8px;">
          Configuration Item 2
        </div>
        <div style="background: var(--em-color-surface-variant); padding: 16px; border-radius: 4px;">
          Configuration Item 3
        </div>
        <div modal-footer>
          <em-button variant="secondary" (clicked)="closed()">Cancel</em-button>
          <em-button variant="primary" (clicked)="closed()">Apply Configuration</em-button>
        </div>
      </em-modal-overlay>
    `,
  }),
};

export const SecondaryIconColor: Story = {
  args: {
    ...Default.args,
    title: 'Request Historical Data',
    icon: 'history',
    iconColor: 'secondary',
  },
  render: Default.render,
};

export const NoFooter: Story = {
  args: {
    ...Default.args,
    showFooter: false,
    title: 'Information',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-modal-overlay
        [isOpen]="isOpen"
        [title]="title"
        [icon]="icon"
        [size]="size"
        [showFooter]="showFooter"
        (closed)="closed($event)"
      >
        <p style="color: var(--em-color-text-medium);">
          This modal has no footer. Close it using the X button or Escape key.
        </p>
      </em-modal-overlay>
    `,
  }),
};

export const NoIcon: Story = {
  args: {
    ...Default.args,
    icon: '',
    title: 'Simple Modal',
  },
  render: Default.render,
};
