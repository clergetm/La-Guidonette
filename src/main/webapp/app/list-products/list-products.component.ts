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
  constructor(public productService: ProductService, public searchService: SearchService) {}

  ngOnInit(): void {
    console.log(this.products);
  }
  onSubmit() {
    if (this.query) {
      this.searchService.search(this.query).subscribe(data => {
        this.products = data;
      });
    }
  }

  protected readonly onsubmit = onsubmit;
}
