import { Component } from '@angular/core';
import { CartContentService } from '../cart-content.service';
import { Product } from '../list-products/product';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent{
  constructor(public cartService: CartContentService) {}

  deleteCart():void {
    this.cartService.removeAll();
  }

  deleteItem(prod: Product): void {
    this.cartService.removeFromCart(prod);
  }
}
