import { Component } from '@angular/core';
import { IProduct } from '../../entities/product/product.model';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from '../../entities/product/service/product.service';
import { SearchService } from '../search-service';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  products: IProduct[] | null = null;
  totalProducts: number = 0;
  size: number[] = [6, 9, 12];
  currentPageSize: number = 6;
  page: number = 0;
  noProductMode: boolean = false;
  query: string = '';
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedColors: string[] = [];
  constructor(public searchService: SearchService, public productService: ProductService) {}
  ngOnInit(): void {
    this.fetchProducts(this.page, this.currentPageSize);
  }
  onSubmit(e: Event) {
    e.preventDefault();
    this.fetchProducts(this.page, this.currentPageSize);
  }
  submitFilters() {
    this.fetchProducts(this.page, this.currentPageSize);
  }
  onPageChange(event: PageEvent) {
    this.fetchProducts(event.pageIndex, event.pageSize);
  }
  fetchProducts(page: number, size: number) {
    this.searchService
      .filteredSearch(this.query, this.selectedCategories, this.selectedColors, this.selectedBrands, page, size)
      .subscribe(data => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
        this.currentPageSize = data.size;
        this.page = data.page;
        if (this.products?.length == 0) {
          this.noProductMode = true;
          this.productService.findBestSellers().subscribe(data => (this.products = data));
        } else {
          this.noProductMode = false;
        }
      });
  }
  getSelectedCategories(selectedCategories: string[]) {
    this.selectedCategories = selectedCategories;
  }
  getSelectedColors(selectedColors: string[]) {
    this.selectedColors = selectedColors;
  }
  getSelectedBrands(selectedBrands: string[]) {
    this.selectedBrands = selectedBrands;
  }
}
