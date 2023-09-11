import { Component } from '@angular/core';

import {Product, products} from './product';

@Component({
  selector: 'jhi-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent  {
  products: Product[] = [...products];
}
