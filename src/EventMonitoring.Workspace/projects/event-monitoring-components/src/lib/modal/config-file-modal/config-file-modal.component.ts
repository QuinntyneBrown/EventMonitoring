import {
  Component,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

export interface ConfigFileModalData {
  configFiles: ConfigFile[];
}

@Component({
  selector: 'em-config-file-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, SearchBarComponent, ButtonComponent],
  templateUrl: './config-file-modal.component.html',
  styleUrls: ['./config-file-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFileModalComponent {
  configFiles: ConfigFile[] = [];
  selectedFile: ConfigFile | null = null;
  searchQuery = '';

  constructor(
    public dialogRef: MatDialogRef<ConfigFileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigFileModalData
  ) {
    if (data?.configFiles) {
      this.configFiles = data.configFiles;
    }
  }

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
    this.dialogRef.close();
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
      this.dialogRef.close(this.selectedFile);
      this.selectedFile = null;
      this.searchQuery = '';
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
