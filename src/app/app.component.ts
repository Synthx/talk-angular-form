import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
        email: '',
        password: '',
        nickname: '',
    });

    constructor(private readonly fb: FormBuilder) {}

    save(): void {
        console.info('value', this.formGroup.value);
    }
}
