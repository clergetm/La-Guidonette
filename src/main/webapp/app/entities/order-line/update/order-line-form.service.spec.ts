import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../order-line.test-samples';

import { OrderLineFormService } from './order-line-form.service';

describe('OrderLine Form Service', () => {
  let service: OrderLineFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderLineFormService);
  });

  describe('Service methods', () => {
    describe('createOrderLineFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOrderLineFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantity: expect.any(Object),
            product: expect.any(Object),
            torder: expect.any(Object),
          })
        );
      });

      it('passing IOrderLine should create a new form with FormGroup', () => {
        const formGroup = service.createOrderLineFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantity: expect.any(Object),
            product: expect.any(Object),
            torder: expect.any(Object),
          })
        );
      });
    });

    describe('getOrderLine', () => {
      it('should return NewOrderLine for default OrderLine initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOrderLineFormGroup(sampleWithNewData);

        const orderLine = service.getOrderLine(formGroup) as any;

        expect(orderLine).toMatchObject(sampleWithNewData);
      });

      it('should return NewOrderLine for empty OrderLine initial value', () => {
        const formGroup = service.createOrderLineFormGroup();

        const orderLine = service.getOrderLine(formGroup) as any;

        expect(orderLine).toMatchObject({});
      });

      it('should return IOrderLine', () => {
        const formGroup = service.createOrderLineFormGroup(sampleWithRequiredData);

        const orderLine = service.getOrderLine(formGroup) as any;

        expect(orderLine).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOrderLine should not enable id FormControl', () => {
        const formGroup = service.createOrderLineFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOrderLine should disable id FormControl', () => {
        const formGroup = service.createOrderLineFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
