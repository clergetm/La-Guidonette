import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 2529,
  name: 'Namibia Sausages',
};

export const sampleWithPartialData: ICategory = {
  id: 77300,
  name: 'Tala',
};

export const sampleWithFullData: ICategory = {
  id: 35403,
  name: 'gold',
};

export const sampleWithNewData: NewCategory = {
  name: 'PCI virtual Chair',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
