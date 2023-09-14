import { Component } from '@angular/core';

import { ProductService } from '../entities/product/service/product.service';
import { PageEvent } from '@angular/material/paginator';
import { IProduct } from '../entities/product/product.model';
import { SearchService } from '../search/search-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent {
  products: IProduct[] | null = null;
  totalProducts: number = 0;
  size: number[] = [6, 9, 12];
  currentPageSize: number = 6;
  page: number = 0;
  query: string | null = null;
  searchMode: boolean = false;

  answerFormState: boolean = false;
  constructor(public productService: ProductService, public searchService: SearchService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.fetchProducts(this.page, this.currentPageSize);
    console.log(this.products);
    this.route.queryParams.subscribe(params => {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const paramValue = params[key];
          if (key === 'category') {
            this.searchService.search(paramValue).subscribe(data => {
              this.products = data;
            });
          }
        }
      }
    });
  }
  onSubmit() {
    if (this.query) {
      this.searchMode = true;
      this.searchService.search(this.query).subscribe(data => {
        this.products = data;
      });
      this.query = '';
    } else {
      this.searchMode = false;
      this.fetchProducts(this.page, this.currentPageSize);
    }
  }
  onPageChange(event: PageEvent) {
    this.fetchProducts(event.pageIndex, event.pageSize);
  }
  fetchProducts(page: number, size: number) {
    this.productService.findProductsPage(page, size).subscribe(data => {
      this.products = data.products;
      this.totalProducts = data.totalProducts;
      this.currentPageSize = data.size;
      this.page = data.page;
    });
  }
  protected readonly onsubmit = onsubmit;
}
