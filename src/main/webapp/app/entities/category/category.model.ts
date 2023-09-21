import { IProduct } from 'app/entities/product/product.model';

export interface ICategory {
  id: number;
  name?: string | null;
  products?: Pick<IProduct, 'id'>[] | null;
}

export type NewCategory = Omit<ICategory, 'id'> & { id: null };
