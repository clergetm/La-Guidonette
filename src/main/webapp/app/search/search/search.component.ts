import { Component } from '@angular/core';
import { SearchService } from '../service/search-service';
import { IProduct } from '../../entities/product/product.model';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from '../../entities/product/service/product.service';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  products: IProduct[] | null = null;
  query: string | null = null;
  totalProducts: number = 0;
  size: number[] = [6, 9, 12];
  currentPageSize: number = 6;
  page: number = 0;
  searchMode: boolean = false;
  constructor(public searchService: SearchService, public productService: ProductService) {}
  ngOnInit(): void {
    this.productService.findBestSellers().subscribe(data => {
      this.products = data;
    });
  }
  onSubmit() {
    this.fetchProducts(this.page, this.currentPageSize);
    if (this.query) {
      this.searchMode = true;
    } else {
      this.searchMode = false;
      this.productService.findBestSellers().subscribe(data => {
        this.products = data;
      });
    }
  }
  onPageChange(event: PageEvent) {
    this.fetchProducts(event.pageIndex, event.pageSize);
  }
  fetchProducts(page: number, size: number) {
    if (this.query)
      this.searchService.paginatedSearch(this.query, page, size).subscribe(data => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
        this.currentPageSize = data.size;
        this.page = data.page;
        console.log(this.products);
      });
  }
}
