import { Component } from '@angular/core';
import { CartContentService } from '../cart-content.service';
import { IProduct } from '../entities/product/product.model';

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
      const prods: IProduct[] = this.cartService.getCartItems();
      prods.forEach(product => {
        if (product.price) sum += product.price;
      });
      this.price = sum.toString();
    }
    return this.price;
  }
}
