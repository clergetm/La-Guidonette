import { IOrderLine, NewOrderLine } from './order-line.model';

export const sampleWithRequiredData: IOrderLine = {
  id: 13942,
  quantity: 29560,
};

export const sampleWithPartialData: IOrderLine = {
  id: 49479,
  quantity: 22866,
};

export const sampleWithFullData: IOrderLine = {
  id: 62523,
  quantity: 78913,
};

export const sampleWithNewData: NewOrderLine = {
  quantity: 45770,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
