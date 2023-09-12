import { IProduct } from '../product/product.model';

export interface GetProductPageResponseDto {
  products: IProduct[];
  size: number;
  totalProducts: number;
  totalPages: number;
  page: number;
  last: boolean;
}
