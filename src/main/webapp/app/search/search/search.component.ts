import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search-service';
import { IProduct } from '../../entities/product/product.model';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from '../../entities/product/service/product.service';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  products: IProduct[] | null = null;
  query: string | null = null;
  totalProducts = 0;
  size: number[] = [6, 9, 12];
  currentPageSize = 6;
  page = 0;
  searchMode = false;
  constructor(public searchService: SearchService, public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.findBestSellers().subscribe(data => {
      this.products = data;
    });
  }
  onSubmit(): void {
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
  onPageChange(event: PageEvent): void {
    this.fetchProducts(event.pageIndex, event.pageSize);
  }
  fetchProducts(page: number, size: number): void {
    if (this.query) {
      this.searchService.paginatedSearch(this.query, page, size).subscribe(data => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
        this.currentPageSize = data.size;
        this.page = data.page;
      });
    }
  }
}
