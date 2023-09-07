import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITorder, NewTorder } from '../torder.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITorder for edit and NewTorderFormGroupInput for create.
 */
type TorderFormGroupInput = ITorder | PartialWithRequiredKeyOf<NewTorder>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITorder | NewTorder> = Omit<T, 'date'> & {
  date?: string | null;
};

type TorderFormRawValue = FormValueOf<ITorder>;

type NewTorderFormRawValue = FormValueOf<NewTorder>;

type TorderFormDefaults = Pick<NewTorder, 'id' | 'date' | 'products'>;

type TorderFormGroupContent = {
  id: FormControl<TorderFormRawValue['id'] | NewTorder['id']>;
  date: FormControl<TorderFormRawValue['date']>;
  total: FormControl<TorderFormRawValue['total']>;
  status: FormControl<TorderFormRawValue['status']>;
  userID: FormControl<TorderFormRawValue['userID']>;
  products: FormControl<TorderFormRawValue['products']>;
};

export type TorderFormGroup = FormGroup<TorderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TorderFormService {
  createTorderFormGroup(torder: TorderFormGroupInput = { id: null }): TorderFormGroup {
    const torderRawValue = this.convertTorderToTorderRawValue({
      ...this.getFormDefaults(),
      ...torder,
    });
    return new FormGroup<TorderFormGroupContent>({
      id: new FormControl(
        { value: torderRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      date: new FormControl(torderRawValue.date),
      total: new FormControl(torderRawValue.total),
      status: new FormControl(torderRawValue.status),
      userID: new FormControl(torderRawValue.userID),
      products: new FormControl(torderRawValue.products ?? []),
    });
  }

  getTorder(form: TorderFormGroup): ITorder | NewTorder {
    return this.convertTorderRawValueToTorder(form.getRawValue() as TorderFormRawValue | NewTorderFormRawValue);
  }

  resetForm(form: TorderFormGroup, torder: TorderFormGroupInput): void {
    const torderRawValue = this.convertTorderToTorderRawValue({ ...this.getFormDefaults(), ...torder });
    form.reset(
      {
        ...torderRawValue,
        id: { value: torderRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TorderFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
      products: [],
    };
  }

  private convertTorderRawValueToTorder(rawTorder: TorderFormRawValue | NewTorderFormRawValue): ITorder | NewTorder {
    return {
      ...rawTorder,
      date: dayjs(rawTorder.date, DATE_TIME_FORMAT),
    };
  }

  private convertTorderToTorderRawValue(
    torder: ITorder | (Partial<NewTorder> & TorderFormDefaults)
  ): TorderFormRawValue | PartialWithRequiredKeyOf<NewTorderFormRawValue> {
    return {
      ...torder,
      date: torder.date ? torder.date.format(DATE_TIME_FORMAT) : undefined,
      products: torder.products ?? [],
    };
  }
}
