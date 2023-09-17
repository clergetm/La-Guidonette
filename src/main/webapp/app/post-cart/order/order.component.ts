import { Component, Input } from '@angular/core';
import { CartContentService } from '../../services/cart-content.service';
import { IProduct } from '../../entities/product/product.model';
import { ProductService } from '../../entities/product/service/product.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() cartContentService: CartContentService | undefined;
  price = '';
  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    if (this.cartContentService) this.cartContentService.refreshProducts();
  }

  onPageChange() {
    if (this.cartContentService) this.cartContentService.refreshProducts();
  }

  getOrderLines() {
    if (this.cartContentService) return this.cartContentService?.getNewOrderlines();
    else return null;
  }
}
