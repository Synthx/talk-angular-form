import { NgForOf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileSizePipe } from '../file-size.pipe';

@Component({
    standalone: true,
    selector: 'file-picker',
    templateUrl: './file-picker.component.html',
    styleUrls: ['./file-picker.component.scss'],
    imports: [MatButtonModule, MatIconModule, NgForOf, FileSizePipe],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FilePickerComponent),
            multi: true,
        },
    ],
})
export class FilePickerComponent implements ControlValueAccessor {
    files: File[] = [];

    onChange!: (value: File[]) => void;
    onTouched!: () => void;

    filesSelected(event: EventTarget | null): void {
        const files = (event as HTMLInputElement)?.files;
        const file = files?.[0];
        if (!file) {
            return;
        }

        this.files = [...this.files, file];
        this.onChange(this.files);
    }

    removeFileAt(index: number): void {
        this.files = this.files.filter((_, i) => i !== index);
        this.onChange(this.files);
    }

    writeValue(value: File[] | undefined): void {
        this.files = value ?? [];
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
