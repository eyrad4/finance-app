import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type FormStructureOf<T, PrimitiveArrayItemIsControl extends boolean = true> = {
    [K in keyof T]: T[K] extends (infer R)[]
        ? [PrimitiveArrayItemIsControl, R] extends [true, string | number | boolean | null]
            ? FormControl<R[]>
            : FormArray<
                  R extends object
                      ? FormGroup<FormStructureOf<R, PrimitiveArrayItemIsControl>>
                      : FormControl<R extends string | boolean | null ? (R extends number ? number : R) : any>
              >
        : T[K] extends object
          ? FormGroup<FormStructureOf<T[K], PrimitiveArrayItemIsControl>>
          : FormControl<T[K]>;
};
