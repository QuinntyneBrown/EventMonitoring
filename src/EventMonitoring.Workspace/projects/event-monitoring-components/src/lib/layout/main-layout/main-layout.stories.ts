import type { Meta, StoryObj } from '@storybook/angular';
import { MainLayoutComponent } from './main-layout.component';
import { SidenavSection } from '../sidenav/sidenav.component';

const defaultSections: SidenavSection[] = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'telemetry', label: 'Telemetry', icon: 'show_chart' },
      { id: 'historical', label: 'Historical Data', icon: 'history' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { id: 'config', label: 'Config Files', icon: 'folder' },
      { id: 'settings', label: 'Settings', icon: 'tune' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'health', label: 'Health Status', icon: 'monitor_heart' },
      { id: 'help', label: 'Help', icon: 'help_outline' },
    ],
  },
];

const meta: Meta<MainLayoutComponent> = {
  title: 'Layout/MainLayout',
  component: MainLayoutComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    logoIcon: { control: 'text' },
    mode: { control: 'select', options: ['live', 'review'] },
    showEditToggle: { control: 'boolean' },
    editModeActive: { control: 'boolean' },
    sidenavCollapsed: { control: 'boolean' },
    menuClick: { action: 'menuClick' },
    editToggle: { action: 'editToggle' },
    headerActionClick: { action: 'headerActionClick' },
    navItemClick: { action: 'navItemClick' },
  },
  decorators: [
    (story) => ({
      ...story,
      styles: [
        `
        :host {
          display: block;
          height: 600px;
          overflow: hidden;
        }
        em-main-layout .main-layout {
          height: 600px;
        }
        em-main-layout em-header .header {
          position: absolute;
        }
        em-main-layout em-sidenav .sidenav {
          position: absolute;
          top: 64px;
          height: calc(100% - 64px);
        }
        em-main-layout em-content .content {
          position: absolute;
          top: 64px;
          left: 256px;
          right: 0;
          bottom: 0;
          margin: 0;
          height: auto;
          min-height: auto;
        }
        em-main-layout.main-layout--sidenav-collapsed em-content .content {
          left: 0;
        }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<MainLayoutComponent>;

export const Default: Story = {
  args: {
    title: 'Event Monitoring System',
    logoIcon: 'satellite_alt',
    mode: 'live',
    showEditToggle: true,
    editModeActive: false,
    sidenavSections: defaultSections,
    activeNavItemId: 'dashboard',
    sidenavCollapsed: false,
    headerActions: [
      { id: 'notifications', icon: 'notifications' },
      { id: 'settings', icon: 'settings' },
      { id: 'account', icon: 'account_circle' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <em-main-layout
        [title]="title"
        [logoIcon]="logoIcon"
        [mode]="mode"
        [showEditToggle]="showEditToggle"
        [editModeActive]="editModeActive"
        [sidenavSections]="sidenavSections"
        [activeNavItemId]="activeNavItemId"
        [sidenavCollapsed]="sidenavCollapsed"
        [headerActions]="headerActions"
        (menuClick)="menuClick($event)"
        (editToggle)="editToggle($event)"
        (headerActionClick)="headerActionClick($event)"
        (navItemClick)="navItemClick($event)"
      >
        <div style="padding: 24px; background: var(--em-color-surface-variant); border-radius: 8px;">
          <h1 style="color: var(--em-color-text-high); margin-bottom: 8px; font-size: 24px; font-weight: 400;">Dashboard</h1>
          <p style="color: var(--em-color-text-low); font-size: 14px;">Real-time space vehicle telemetry monitoring</p>
        </div>
      </em-main-layout>
    `,
  }),
};

export const ReviewMode: Story = {
  args: {
    ...Default.args,
    mode: 'review',
    activeNavItemId: 'historical',
  },
  render: Default.render,
};

export const EditModeActive: Story = {
  args: {
    ...Default.args,
    editModeActive: true,
  },
  render: Default.render,
};

export const CollapsedSidenav: Story = {
  args: {
    ...Default.args,
    sidenavCollapsed: true,
  },
  render: Default.render,
};

export const TelemetryPage: Story = {
  args: {
    ...Default.args,
    activeNavItemId: 'telemetry',
  },
  render: (args) => ({
    props: args,
    template: `
      <em-main-layout
        [title]="title"
        [logoIcon]="logoIcon"
        [mode]="mode"
        [showEditToggle]="showEditToggle"
        [editModeActive]="editModeActive"
        [sidenavSections]="sidenavSections"
        [activeNavItemId]="activeNavItemId"
        [sidenavCollapsed]="sidenavCollapsed"
        [headerActions]="headerActions"
        (menuClick)="menuClick($event)"
        (editToggle)="editToggle($event)"
        (headerActionClick)="headerActionClick($event)"
        (navItemClick)="navItemClick($event)"
      >
        <div style="padding: 24px; background: var(--em-color-surface-variant); border-radius: 8px;">
          <h1 style="color: var(--em-color-text-high); margin-bottom: 8px; font-size: 24px; font-weight: 400;">Telemetry</h1>
          <p style="color: var(--em-color-text-low); font-size: 14px;">View real-time telemetry data streams</p>
        </div>
      </em-main-layout>
    `,
  }),
};
