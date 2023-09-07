import { Brand } from 'app/entities/enumerations/brand.model';
import { Color } from 'app/entities/enumerations/color.model';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 77672,
};

export const sampleWithPartialData: IProduct = {
  id: 94362,
  brand: Brand['BTWIN'],
  model: 'Programmable Networked deliver',
  color: Color['YELLOW'],
};

export const sampleWithFullData: IProduct = {
  id: 99933,
  label: 'driver synthesizing',
  description: 'neural Automotive Assurance',
  price: 33131,
  brand: Brand['SANTA'],
  model: 'Fresh',
  color: Color['BLUE'],
  quantity: 86156,
};

export const sampleWithNewData: NewProduct = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
