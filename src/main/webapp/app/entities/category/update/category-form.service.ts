import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICategory, NewCategory } from '../category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICategory for edit and NewCategoryFormGroupInput for create.
 */
type CategoryFormGroupInput = ICategory | PartialWithRequiredKeyOf<NewCategory>;

type CategoryFormDefaults = Pick<NewCategory, 'id' | 'products'>;

type CategoryFormGroupContent = {
  id: FormControl<ICategory['id'] | NewCategory['id']>;
  name: FormControl<ICategory['name']>;
  products: FormControl<ICategory['products']>;
};

export type CategoryFormGroup = FormGroup<CategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CategoryFormService {
  createCategoryFormGroup(category: CategoryFormGroupInput = { id: null }): CategoryFormGroup {
    const categoryRawValue = {
      ...this.getFormDefaults(),
      ...category,
    };
    return new FormGroup<CategoryFormGroupContent>({
      id: new FormControl(
        { value: categoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(categoryRawValue.name, {
        validators: [Validators.required],
      }),
      products: new FormControl(categoryRawValue.products ?? []),
    });
  }

  getCategory(form: CategoryFormGroup): ICategory | NewCategory {
    return form.getRawValue() as ICategory | NewCategory;
  }

  resetForm(form: CategoryFormGroup, category: CategoryFormGroupInput): void {
    const categoryRawValue = { ...this.getFormDefaults(), ...category };
    form.reset(
      {
        ...categoryRawValue,
        id: { value: categoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CategoryFormDefaults {
    return {
      id: null,
      products: [],
    };
  }
}
