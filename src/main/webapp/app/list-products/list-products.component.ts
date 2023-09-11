import { Component, NgModule, OnInit } from '@angular/core';

import { Product, products } from './product';
import { CartContentService } from '../cart-content.service';

@Component({
  selector: 'jhi-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  products:Product[] = [...products];
  constructor() {}

  ngOnInit(): void {}
}
