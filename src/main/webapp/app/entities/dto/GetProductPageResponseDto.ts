import { Product } from '../../list-products/product';

export interface GetProductPageResponseDto {
  products: Product[];
  size: number;
  totalProducts: number;
  totalPages: number;
  page: number;
  last: boolean;
}
