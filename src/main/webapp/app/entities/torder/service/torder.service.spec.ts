import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITorder } from '../torder.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../torder.test-samples';

import { TorderService, RestTorder } from './torder.service';

const requireRestSample: RestTorder = {
  ...sampleWithRequiredData,
  date: sampleWithRequiredData.date?.toJSON(),
};

describe('Torder Service', () => {
  let service: TorderService;
  let httpMock: HttpTestingController;
  let expectedResult: ITorder | ITorder[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TorderService);
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

    it('should create a Torder', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const torder = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(torder).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Torder', () => {
      const torder = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(torder).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Torder', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Torder', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Torder', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTorderToCollectionIfMissing', () => {
      it('should add a Torder to an empty array', () => {
        const torder: ITorder = sampleWithRequiredData;
        expectedResult = service.addTorderToCollectionIfMissing([], torder);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(torder);
      });

      it('should not add a Torder to an array that contains it', () => {
        const torder: ITorder = sampleWithRequiredData;
        const torderCollection: ITorder[] = [
          {
            ...torder,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTorderToCollectionIfMissing(torderCollection, torder);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Torder to an array that doesn't contain it", () => {
        const torder: ITorder = sampleWithRequiredData;
        const torderCollection: ITorder[] = [sampleWithPartialData];
        expectedResult = service.addTorderToCollectionIfMissing(torderCollection, torder);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(torder);
      });

      it('should add only unique Torder to an array', () => {
        const torderArray: ITorder[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const torderCollection: ITorder[] = [sampleWithRequiredData];
        expectedResult = service.addTorderToCollectionIfMissing(torderCollection, ...torderArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const torder: ITorder = sampleWithRequiredData;
        const torder2: ITorder = sampleWithPartialData;
        expectedResult = service.addTorderToCollectionIfMissing([], torder, torder2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(torder);
        expect(expectedResult).toContain(torder2);
      });

      it('should accept null and undefined values', () => {
        const torder: ITorder = sampleWithRequiredData;
        expectedResult = service.addTorderToCollectionIfMissing([], null, torder, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(torder);
      });

      it('should return initial array if no Torder is added', () => {
        const torderCollection: ITorder[] = [sampleWithRequiredData];
        expectedResult = service.addTorderToCollectionIfMissing(torderCollection, undefined, null);
        expect(expectedResult).toEqual(torderCollection);
      });
    });

    describe('compareTorder', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTorder(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTorder(entity1, entity2);
        const compareResult2 = service.compareTorder(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTorder(entity1, entity2);
        const compareResult2 = service.compareTorder(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTorder(entity1, entity2);
        const compareResult2 = service.compareTorder(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
