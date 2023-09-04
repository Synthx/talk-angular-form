import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { FilePickerComponent } from './file-picker/file-picker.component';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        ColorPickerComponent,
        JsonPipe,
        FilePickerComponent,
    ],
})
export class AppComponent {
    formGroup = this.fb.group({
        files: [[], [Validators.required]],
        color: [undefined, [Validators.required]],
    });

    constructor(private readonly fb: FormBuilder) {}

    save(): void {
        console.info('value', this.formGroup.value);
    }
}
