import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ModalSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'em-modal-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-overlay.component.html',
  styleUrls: ['./modal-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalOverlayComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() icon = '';
  @Input() iconColor: 'primary' | 'secondary' = 'primary';
  @Input() size: ModalSize = 'medium';
  @Input() closeOnBackdrop = true;
  @Input() showFooter = true;

  @Output() closed = new EventEmitter<void>();

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  onContentClick(event: Event): void {
    event.stopPropagation();
  }

  close(): void {
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.close();
    }
  }
}
