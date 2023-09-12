import { Component } from '@angular/core';

import { ProductService } from '../entities/product/service/product.service';
import { PageEvent } from '@angular/material/paginator';
import { IProduct, Product } from './product';

@Component({
  selector: 'jhi-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent {
  // products:Product[] = [...products];
  products: Product[] | null = null;
  totalProducts: number = 0;
  size: number[] = [3, 6, 9];
  currentPageSize: number = 3;
  page: number = 0;
  answerFormState: boolean = false;
  constructor(public productService: ProductService) {}
  ngOnInit(): void {
    this.fetchQuestions(this.page, this.currentPageSize);
    console.log(this.products);
  }
  onPageChange(event: PageEvent) {
    this.fetchQuestions(event.pageIndex, event.pageSize);
  }
  fetchQuestions(page: number, size: number) {
    this.productService.findProductsPage(page, size).subscribe(data => {
      this.products = data.products;
      this.totalProducts = data.totalProducts;
      this.currentPageSize = data.size;
      this.page = data.page;
    });
  }
}
