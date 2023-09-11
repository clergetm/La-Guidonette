import { IProduct } from 'app/entities/product/product.model';
import { ITorder } from 'app/entities/torder/torder.model';

export interface IOrderLine {
  id: number;
  quantity?: number | null;
  product?: Pick<IProduct, 'id'> | null;
  torder?: Pick<ITorder, 'id'> | null;
}

export type NewOrderLine = Omit<IOrderLine, 'id'> & { id: null };
