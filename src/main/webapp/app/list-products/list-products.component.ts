import { Component, Input } from '@angular/core';

import { ProductService } from '../entities/product/service/product.service';
import { IProduct } from '../entities/product/product.model';
import { SearchService } from '../search/service/search-service';

@Component({
  selector: 'jhi-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent {
  @Input() products: IProduct[] | null = null;
  query: string | null = null;
  protected readonly onsubmit = onsubmit;

  constructor(public productService: ProductService, public searchService: SearchService) {}

  onSubmit(): void {
    if (this.query) {
      this.searchService.search(this.query).subscribe(data => {
        this.products = data;
      });
    }
  }

}
