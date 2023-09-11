import { Component, OnInit } from '@angular/core';
import { CartContentService } from '../cart-content.service';
import { Product } from '../list-products/product';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartContentService) {}

  ngOnInit(): void {}

  deleteCart() {
    this.cartService.removeAll();
  }

  deleteItem(prod: Product) {
    this.cartService.removeFromCart(prod);
  }
}
