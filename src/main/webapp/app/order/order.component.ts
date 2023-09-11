import { Component } from '@angular/core';
import { CartContentService } from '../cart-content.service';
import { Product } from '../list-products/product';

@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  price = '';
  constructor(public cartService: CartContentService) {}


  getPrice(): string {
    if (this.price === '') {
      let sum = 0;
      const prods: Product[] = this.cartService.getCartItems();
      prods.forEach(product => {
        sum += parseFloat(product.price);
      });
      this.price = sum.toString();
    }
    return this.price;
  }
}
