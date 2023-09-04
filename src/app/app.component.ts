import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

function shouldStartWithTest(): ValidatorFn {
    return control => {
        if (!control.value.startsWith('test')) {
            return { shouldStartWithTest: true };
        }

        return null;
    };
}

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, NgIf],
})
export class AppComponent {
    control = this.fb.control('', [Validators.required, shouldStartWithTest()]);

    constructor(private readonly fb: FormBuilder) {}
}
