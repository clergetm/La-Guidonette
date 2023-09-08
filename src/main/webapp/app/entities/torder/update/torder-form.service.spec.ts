import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../torder.test-samples';

import { TorderFormService } from './torder-form.service';

describe('Torder Form Service', () => {
  let service: TorderFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorderFormService);
  });

  describe('Service methods', () => {
    describe('createTorderFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTorderFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            total: expect.any(Object),
            status: expect.any(Object),
            userID: expect.any(Object),
            products: expect.any(Object),
          })
        );
      });

      it('passing ITorder should create a new form with FormGroup', () => {
        const formGroup = service.createTorderFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            total: expect.any(Object),
            status: expect.any(Object),
            userID: expect.any(Object),
            products: expect.any(Object),
          })
        );
      });
    });

    describe('getTorder', () => {
      it('should return NewTorder for default Torder initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTorderFormGroup(sampleWithNewData);

        const torder = service.getTorder(formGroup) as any;

        expect(torder).toMatchObject(sampleWithNewData);
      });

      it('should return NewTorder for empty Torder initial value', () => {
        const formGroup = service.createTorderFormGroup();

        const torder = service.getTorder(formGroup) as any;

        expect(torder).toMatchObject({});
      });

      it('should return ITorder', () => {
        const formGroup = service.createTorderFormGroup(sampleWithRequiredData);

        const torder = service.getTorder(formGroup) as any;

        expect(torder).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITorder should not enable id FormControl', () => {
        const formGroup = service.createTorderFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTorder should disable id FormControl', () => {
        const formGroup = service.createTorderFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
