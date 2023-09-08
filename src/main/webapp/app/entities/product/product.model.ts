import { ICategory } from 'app/entities/category/category.model';
import { ITorder } from 'app/entities/torder/torder.model';
import { Brand } from 'app/entities/enumerations/brand.model';
import { Color } from 'app/entities/enumerations/color.model';

export interface IProduct {
  id: number;
  label?: string | null;
  description?: string | null;
  price?: number | null;
  brand?: Brand | null;
  model?: string | null;
  color?: Color | null;
  quantity?: number | null;
  categories?: Pick<ICategory, 'id'>[] | null;
  torders?: Pick<ITorder, 'id'>[] | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
