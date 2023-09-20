import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../entities/product/product.model';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from '../../entities/product/service/product.service';
import { SearchService } from '../search-service';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  products: IProduct[] | null = null;
  totalProducts = 0;
  size: number[] = [6, 9, 12];
  currentPageSize = 6;
  page = 0;
  noProductMode = false;
  query = '';
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedColors: string[] = [];
  constructor(public searchService: SearchService, public productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts(this.page, this.currentPageSize);
  }
  onSubmit(e: Event): void {
    e.preventDefault();
    this.fetchProducts(this.page, this.currentPageSize);
  }
  submitFilters(): void {
    this.fetchProducts(this.page, this.currentPageSize);
  }
  onPageChange(event: PageEvent): void {
    this.fetchProducts(event.pageIndex, event.pageSize);
  }
  fetchProducts(page: number, size: number): void {
    this.searchService
      .filteredSearch(this.query, this.selectedCategories, this.selectedColors, this.selectedBrands, page, size)
      .subscribe(data => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
        this.currentPageSize = data.size;
        this.page = data.page;
        if (this.products.length === 0) {
          this.noProductMode = true;
          this.productService.findBestSellers().subscribe(found => (this.products = found));
        } else {
          this.noProductMode = false;
        }
      });
  }
  getSelectedCategories(selectedCategories: string[]): void {
    this.selectedCategories = selectedCategories;
  }
  getSelectedColors(selectedColors: string[]): void {
    this.selectedColors = selectedColors;
  }
  getSelectedBrands(selectedBrands: string[]): void {
    this.selectedBrands = selectedBrands;
  }
}
