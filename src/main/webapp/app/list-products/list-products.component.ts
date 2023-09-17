import { Component } from '@angular/core';

import { ProductService } from '../entities/product/service/product.service';
import { PageEvent } from '@angular/material/paginator';
import { IProduct } from '../entities/product/product.model';
import { SearchService } from '../search/search-service';

@Component({
  selector: 'jhi-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent {
  products: IProduct[] | null = null;
  totalProducts = 0;
  size: number[] = [6, 9, 12];
  currentPageSize = 6;
  page = 0;
  query: string | null = null;
  searchMode = false;

  answerFormState = false;
  constructor(public productService: ProductService, public searchService: SearchService) {}
  ngOnInit(): void {
    this.fetchProducts(this.page, this.currentPageSize);
    console.log(this.products);
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
