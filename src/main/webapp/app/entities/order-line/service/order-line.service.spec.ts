import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOrderLine } from '../order-line.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../order-line.test-samples';

import { OrderLineService } from './order-line.service';

const requireRestSample: IOrderLine = {
  ...sampleWithRequiredData,
};

describe('OrderLine Service', () => {
  let service: OrderLineService;
  let httpMock: HttpTestingController;
  let expectedResult: IOrderLine | IOrderLine[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OrderLineService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a OrderLine', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const orderLine = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(orderLine).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OrderLine', () => {
      const orderLine = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(orderLine).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OrderLine', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OrderLine', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OrderLine', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOrderLineToCollectionIfMissing', () => {
      it('should add a OrderLine to an empty array', () => {
        const orderLine: IOrderLine = sampleWithRequiredData;
        expectedResult = service.addOrderLineToCollectionIfMissing([], orderLine);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(orderLine);
      });

      it('should not add a OrderLine to an array that contains it', () => {
        const orderLine: IOrderLine = sampleWithRequiredData;
        const orderLineCollection: IOrderLine[] = [
          {
            ...orderLine,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOrderLineToCollectionIfMissing(orderLineCollection, orderLine);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OrderLine to an array that doesn't contain it", () => {
        const orderLine: IOrderLine = sampleWithRequiredData;
        const orderLineCollection: IOrderLine[] = [sampleWithPartialData];
        expectedResult = service.addOrderLineToCollectionIfMissing(orderLineCollection, orderLine);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(orderLine);
      });

      it('should add only unique OrderLine to an array', () => {
        const orderLineArray: IOrderLine[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const orderLineCollection: IOrderLine[] = [sampleWithRequiredData];
        expectedResult = service.addOrderLineToCollectionIfMissing(orderLineCollection, ...orderLineArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const orderLine: IOrderLine = sampleWithRequiredData;
        const orderLine2: IOrderLine = sampleWithPartialData;
        expectedResult = service.addOrderLineToCollectionIfMissing([], orderLine, orderLine2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(orderLine);
        expect(expectedResult).toContain(orderLine2);
      });

      it('should accept null and undefined values', () => {
        const orderLine: IOrderLine = sampleWithRequiredData;
        expectedResult = service.addOrderLineToCollectionIfMissing([], null, orderLine, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(orderLine);
      });

      it('should return initial array if no OrderLine is added', () => {
        const orderLineCollection: IOrderLine[] = [sampleWithRequiredData];
        expectedResult = service.addOrderLineToCollectionIfMissing(orderLineCollection, undefined, null);
        expect(expectedResult).toEqual(orderLineCollection);
      });
    });

    describe('compareOrderLine', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOrderLine(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOrderLine(entity1, entity2);
        const compareResult2 = service.compareOrderLine(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOrderLine(entity1, entity2);
        const compareResult2 = service.compareOrderLine(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOrderLine(entity1, entity2);
        const compareResult2 = service.compareOrderLine(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
