import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProduct, NewProduct } from '../product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduct for edit and NewProductFormGroupInput for create.
 */
type ProductFormGroupInput = IProduct | PartialWithRequiredKeyOf<NewProduct>;

type ProductFormDefaults = Pick<NewProduct, 'id' | 'categories'>;

type ProductFormGroupContent = {
  id: FormControl<IProduct['id'] | NewProduct['id']>;
  label: FormControl<IProduct['label']>;
  description: FormControl<IProduct['description']>;
  price: FormControl<IProduct['price']>;
  brand: FormControl<IProduct['brand']>;
  model: FormControl<IProduct['model']>;
  color: FormControl<IProduct['color']>;
  quantity: FormControl<IProduct['quantity']>;
  imageName: FormControl<IProduct['imageName']>;
  version: FormControl<IProduct['version']>;
  categories: FormControl<IProduct['categories']>;
};

export type ProductFormGroup = FormGroup<ProductFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductFormService {
  createProductFormGroup(product: ProductFormGroupInput = { id: null }): ProductFormGroup {
    const productRawValue = {
      ...this.getFormDefaults(),
      ...product,
    };
    return new FormGroup<ProductFormGroupContent>({
      id: new FormControl(
        { value: productRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      label: new FormControl(productRawValue.label, {
        validators: [Validators.required],
      }),
      description: new FormControl(productRawValue.description, {
        validators: [Validators.required],
      }),
      price: new FormControl(productRawValue.price, {
        validators: [Validators.required],
      }),
      brand: new FormControl(productRawValue.brand, {
        validators: [Validators.required],
      }),
      model: new FormControl(productRawValue.model, {
        validators: [Validators.required],
      }),
      color: new FormControl(productRawValue.color, {
        validators: [Validators.required],
      }),
      quantity: new FormControl(productRawValue.quantity, {
        validators: [Validators.required],
      }),
      imageName: new FormControl(productRawValue.imageName, {
        validators: [Validators.required],
      }),
      version: new FormControl(productRawValue.version, {
        validators: [Validators.required],
      }),
      categories: new FormControl(productRawValue.categories ?? []),
    });
  }

  getProduct(form: ProductFormGroup): IProduct | NewProduct {
    return form.getRawValue() as IProduct | NewProduct;
  }

  resetForm(form: ProductFormGroup, product: ProductFormGroupInput): void {
    const productRawValue = { ...this.getFormDefaults(), ...product };
    form.reset(
      {
        ...productRawValue,
        id: { value: productRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProductFormDefaults {
    return {
      id: null,
      categories: [],
    };
  }
}
