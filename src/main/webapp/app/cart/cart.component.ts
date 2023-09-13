import { Component } from '@angular/core';
import { CartContentService } from '../cart-content.service';

import { IProduct } from '../entities/product/product.model';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(public cartService: CartContentService) {}

  deleteCart(): void {
    this.cartService.removeAll();
  }

  deleteItem(prod: IProduct): void {
    this.cartService.removeFromCart(prod);
  }
}
