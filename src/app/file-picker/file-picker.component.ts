import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileSizePipe } from '../file-size.pipe';

@Component({
    standalone: true,
    selector: 'file-picker',
    templateUrl: './file-picker.component.html',
    styleUrls: ['./file-picker.component.scss'],
    imports: [MatButtonModule, MatIconModule, NgForOf, FileSizePipe],
})
export class FilePickerComponent {
    files: File[] = [];

    filesSelected(event: EventTarget | null): void {
        const files = (event as HTMLInputElement)?.files;
        const file = files?.[0];
        if (!file) {
            return;
        }

        this.files = [...this.files, file];
    }

    removeFileAt(index: number): void {
        this.files = this.files.filter((_, i) => i !== index);
    }
}
