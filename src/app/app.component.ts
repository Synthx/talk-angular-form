import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
})
export class AppComponent {
    formGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(255)]],
        nickname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
    });

    constructor(private readonly fb: FormBuilder) {}

    save(): void {
        console.info('value', this.formGroup.value);
    }
}
