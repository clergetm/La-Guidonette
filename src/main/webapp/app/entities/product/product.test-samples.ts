import { Brand } from 'app/entities/enumerations/brand.model';
import { Color } from 'app/entities/enumerations/color.model';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 77672,
  label: 'Customer-focused',
  description: 'cross-platform Unbranded deposit',
  price: 49054,
  brand: Brand['ORBEA'],
  model: 'Bangladesh Administrator',
  color: Color['WHITE'],
  quantity: 45804,
};

export const sampleWithPartialData: IProduct = {
  id: 82094,
  label: 'invoice bluetooth District',
  description: 'Garden Customer-focused Island',
  price: 13074,
  brand: Brand['ORBEA'],
  model: 'Incredible',
  color: Color['GREEN'],
  quantity: 90500,
};

export const sampleWithFullData: IProduct = {
  id: 19060,
  label: 'encompassing vertical policy',
  description: 'neural intuitive SDR',
  price: 76296,
  brand: Brand['BTWIN'],
  model: 'Groves',
  color: Color['RED'],
  quantity: 21588,
};

export const sampleWithNewData: NewProduct = {
  label: 'Loaf withdrawal architectures',
  description: 'Universal bricks-and-clicks',
  price: 72638,
  brand: Brand['LAPIERRE'],
  model: 'Horizontal',
  color: Color['BLACK'],
  quantity: 22531,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
