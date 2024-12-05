import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static positiveNumber(control: AbstractControl): ValidationErrors | null {
        if (control && control.value) {
            const pattern = /^[0-9]+$/;
            if (!pattern.test(control.value) && control.value < 0) {
                return { custom_positive_number: true };
            }
        }

        return null;
    }

    static minMaxValidation(min?: number | string, max?: number | string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = +control.value;
            const isMin = min && !Number.isNaN(+min);
            const isMax = max && !Number.isNaN(+max);
            if (control && (isMin || isMax)) {
                if (value < Number(min) || value > Number(max) || Number.isNaN(value)) {
                    return { incorrect_amount: true };
                }
            }
            return null;
        };
    }

    static decimalDigitValidation(countOfDigit: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (value == null || value === '') {
                return null;
            }

            const stringValue = String(value);
            const decimalPartDot = stringValue.split('.').at(1) || '';
            let digitCount: number = decimalPartDot.length;
            if (!decimalPartDot) {
                const decimalPartComa = stringValue.split(',').at(1) || '';
                digitCount = decimalPartComa.length;
            }

            if (digitCount > countOfDigit) {
                return { incorrect_decimal_digit: true };
            }

            return null;
        };
    }
}
