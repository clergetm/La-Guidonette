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
  imageName: 'calculate neural Automotive',
};

export const sampleWithPartialData: IProduct = {
  id: 92938,
  label: 'Garden Customer-focused Island',
  description: 'mission-critical',
  price: 32091,
  brand: Brand['SPECIALIZED'],
  model: 'Dynamic encompassing vertical',
  color: Color['BLACK'],
  quantity: 73727,
  imageName: 'neural frictionless payment',
};

export const sampleWithFullData: IProduct = {
  id: 13518,
  label: 'Intelligent structure lime',
  description: 'bandwidth magnetic',
  price: 68285,
  brand: Brand['SANTA'],
  model: 'Global',
  color: Color['BLUE'],
  quantity: 63146,
  imageName: 'compressing out-of-the-box Progressive',
};

export const sampleWithNewData: NewProduct = {
  label: 'monitor feed',
  description: 'copy Account orchestration',
  price: 84770,
  brand: Brand['BTWIN'],
  model: 'Iraqi synergy',
  color: Color['YELLOW'],
  quantity: 94300,
  imageName: 'mission-critical capacitor',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
