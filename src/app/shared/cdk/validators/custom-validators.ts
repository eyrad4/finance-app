import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static positiveNumber(control: AbstractControl): ValidationErrors {
        if (control && control.value) {
            const pattern = /^[0-9]+$/;
            if (!pattern.test(control.value) && control.value < 0) {
                return { custom_positive_number: true };
            }
        }

        return {};
    }

    static minMaxValidation(min?: number | string, max?: number | string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            const value = +control.value;
            const isMin = min && !Number.isNaN(+min);
            const isMax = max && !Number.isNaN(+max);
            if (control && (isMin || isMax)) {
                if (value < Number(min) || value > Number(max) || Number.isNaN(value)) {
                    return { incorrect_amount: true };
                }
            }
            return { };
        };
    }
}
