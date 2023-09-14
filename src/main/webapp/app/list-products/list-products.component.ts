import { Component, Input } from '@angular/core';

import { ProductService } from '../entities/product/service/product.service';
import { IProduct } from '../entities/product/product.model';

@Component({
  selector: 'jhi-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent {
  @Input() products: IProduct[] | null = null;
  query: string | null = null;

  constructor(public productService: ProductService) {}

  protected readonly onsubmit = onsubmit;
}
