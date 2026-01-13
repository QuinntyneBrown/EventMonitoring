import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'icon';

@Component({
  selector: 'em-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() label?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): Record<string, boolean> {
    return {
      btn: true,
      'btn--primary': this.variant === 'primary',
      'btn--secondary': this.variant === 'secondary',
      'btn--icon': this.variant === 'icon',
      'btn--disabled': this.disabled,
    };
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
