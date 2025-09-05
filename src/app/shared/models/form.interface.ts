import { ValidatorFn } from '@angular/forms';

export interface DynamicControl {
    controlKey: string;
    formFieldType?: 'input' | 'select' | 'textarea';
    inputType?: string;
    label?: string;
    defaultValue?: unknown;
    selectOptions?: (string | number)[];
    updateOn?: 'change' | 'blur' | 'submit';
    rows?: number;
    accept?: string;
    validators?: ValidatorFn[];
    maxlength?: number;
    minlength?: number;
    min?: Date | string | number;
    max?: Date | string | number;
}
