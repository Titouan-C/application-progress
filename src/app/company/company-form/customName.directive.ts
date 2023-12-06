import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export function customNameValidator(nameRe: RegExp = /^[A-Za-z]+$/): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const isInvalid = nameRe.test(value);
        return isInvalid
            ? { 'invalidName': { value: value } }
            : null;
    }
}