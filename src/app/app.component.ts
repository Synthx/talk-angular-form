import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {
    emailAlreadyExist,
    isAdult,
    isPast,
    nicknameAlreadyExist,
    passwordStrength,
    sameValueAndConfirmation,
} from './custom-validator';
import { UserService } from './user.service';

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
        NgIf,
        JsonPipe,
        MatSelectModule,
        MatProgressSpinnerModule,
    ],
    providers: [UserService],
})
export class AppComponent {
    readonly formGroup = this.fb.group({
        nickname: [
            null,
            {
                validators: [Validators.required, Validators.minLength(4), Validators.maxLength(255)],
                asyncValidators: [nicknameAlreadyExist(this.userService)],
                updateOn: 'blur',
            },
        ],
        email: [
            null,
            {
                validators: [Validators.required, Validators.email, Validators.maxLength(255)],
                asyncValidators: [emailAlreadyExist(this.userService)],
                updateOn: 'blur',
            },
        ],
        sex: [null, [Validators.required]],
        birthDate: [null, [Validators.required, isPast, isAdult]],
        password: this.fb.group(
            {
                value: [null, [Validators.required, passwordStrength]],
                confirmation: [null, [Validators.required]],
            },
            {
                validators: [sameValueAndConfirmation],
            },
        ),
    });

    constructor(
        private readonly fb: FormBuilder,
        private readonly userService: UserService,
    ) {}

    save(): void {
        console.info('value', this.formGroup.value);
    }

    getErrorMessage(control: AbstractControl): string | null {
        const errorKeys = Object.keys(control.errors ?? {});
        if (errorKeys.length === 0) return null;

        const key = errorKeys[0];
        switch (key) {
            case 'required':
                return 'This field is required';
            case 'email':
                return 'This field should be an email';
            case 'isPast':
                return 'This date should be in the past';
            case 'isAdult':
                return 'You need to be an adult to register';
            case 'sameValueAndConfirmation':
                return 'Both values do not match';
            case 'emailAlreadyExist':
                return 'This email is already taken';
            case 'nicknameAlreadyExist':
                return 'This nickname is already taken';
            case 'minlength':
                return 'This field should be at least n characters';
            case 'maxlength':
                return 'This field should be at maximum n characters';
            default:
                return key;
        }
    }
}
