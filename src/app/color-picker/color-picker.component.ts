import { NgForOf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    imports: [NgForOf],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorPickerComponent),
            multi: true,
        },
    ],
})
export class ColorPickerComponent implements ControlValueAccessor {
    readonly colors = [
        'rgb(255, 255, 255)',
        'rgb(156, 156, 82)',
        'rgb(219, 181, 142)',
        'rgb(1, 76, 144)',
        'rgb(152, 150, 164)',
        'rgb(230, 125, 0)',
        'rgb(229, 75, 125)',
        'rgb(0, 0, 0)',
    ];

    selectedColor?: string;

    onChange!: (value: string) => void;
    onTouched!: () => void;

    selectColor(color: string): void {
        this.selectedColor = color;
        this.onChange?.(color);
    }

    writeValue(value: string | undefined): void {
        this.selectedColor = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
