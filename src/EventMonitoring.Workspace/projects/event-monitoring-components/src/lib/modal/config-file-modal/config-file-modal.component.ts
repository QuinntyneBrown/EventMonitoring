import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalOverlayComponent } from '../modal-overlay/modal-overlay.component';
import { SearchBarComponent } from '../../ui/search-bar/search-bar.component';
import { ButtonComponent } from '../../ui/button/button.component';

export interface ConfigFile {
  id: string;
  name: string;
  path: string;
  itemCount: number;
  lastModified: Date;
  items?: string[];
}

@Component({
  selector: 'em-config-file-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalOverlayComponent, SearchBarComponent, ButtonComponent],
  templateUrl: './config-file-modal.component.html',
  styleUrls: ['./config-file-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFileModalComponent {
  @Input() isOpen = false;
  @Input() configFiles: ConfigFile[] = [];

  @Output() closed = new EventEmitter<void>();
  @Output() apply = new EventEmitter<ConfigFile>();

  selectedFile: ConfigFile | null = null;
  searchQuery = '';

  get filteredFiles(): ConfigFile[] {
    if (!this.searchQuery) {
      return this.configFiles;
    }
    const query = this.searchQuery.toLowerCase();
    return this.configFiles.filter(
      (file) =>
        file.name.toLowerCase().includes(query) ||
        file.path.toLowerCase().includes(query)
    );
  }

  onClose(): void {
    this.closed.emit();
    this.selectedFile = null;
    this.searchQuery = '';
  }

  onSelectFile(file: ConfigFile): void {
    this.selectedFile = file;
  }

  isSelected(file: ConfigFile): boolean {
    return this.selectedFile?.id === file.id;
  }

  onApply(): void {
    if (this.selectedFile) {
      this.apply.emit(this.selectedFile);
      this.onClose();
    }
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
