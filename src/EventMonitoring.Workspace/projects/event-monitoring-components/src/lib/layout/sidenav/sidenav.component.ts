import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SidenavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
}

export interface SidenavSection {
  title: string;
  items: SidenavItem[];
}

@Component({
  selector: 'em-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input() sections: SidenavSection[] = [];
  @Input() activeItemId: string | null = null;

  @Output() itemClick = new EventEmitter<SidenavItem>();

  onItemClick(item: SidenavItem): void {
    this.itemClick.emit(item);
  }

  isActive(item: SidenavItem): boolean {
    return this.activeItemId === item.id;
  }
}
