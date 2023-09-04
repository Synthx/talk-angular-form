import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import * as dayjs from 'dayjs';
import { map } from 'rxjs';
import { UserService } from './user.service';

const PASSWORD_REGEX = /(?=.{12,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/;

export const passwordStrength: ValidatorFn = control => {
    return PASSWORD_REGEX.test(control.value) ? null : { passwordStrength: true };
};

export const isAdult: ValidatorFn = control => {
    const date = dayjs(control.value);
    const now = dayjs();

    return now.diff(date, 'year') < 18 ? { isAdult: true } : null;
};

export const isPast: ValidatorFn = control => {
    const date = dayjs(control.value);
    const now = dayjs();

    return date.isAfter(now) ? { isPast: true } : null;
};

export const sameValueAndConfirmation: ValidatorFn = control => {
    const value = control.get('value');
    const confirmation = control.get('confirmation');
    if (!value || !confirmation) {
        throw new Error('blabla');
    }

    if (value.value !== confirmation.value) {
        confirmation.setErrors({ sameValueAndConfirmation: true });

        return { sameValueAndConfirmation: true };
    }

    return null;
};

export const nicknameAlreadyExist = (userService: UserService): AsyncValidatorFn => {
    return control => {
        return userService
            .checkNickname(control.value)
            .pipe(map(exist => (exist ? { nicknameAlreadyExist: true } : null)));
    };
};

export const emailAlreadyExist = (userService: UserService): AsyncValidatorFn => {
    return control => {
        return userService.checkEmail(control.value).pipe(map(exist => (exist ? { emailAlreadyExist: true } : null)));
    };
};
