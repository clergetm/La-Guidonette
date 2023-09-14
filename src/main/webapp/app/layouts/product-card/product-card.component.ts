import { Component, Input } from '@angular/core';

import { CartContentService } from '../../services/cart-content.service';
import { IProduct } from '../../entities/product/product.model';

@Component({
  selector: 'jhi-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: IProduct | null = null;
  constructor(private cartService: CartContentService) {}

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
  }
}
