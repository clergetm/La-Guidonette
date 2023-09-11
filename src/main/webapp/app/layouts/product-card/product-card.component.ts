import { Component, Input } from '@angular/core';
import { Product } from '../../list-products/product';
import { CartContentService } from '../../cart-content.service';

@Component({
  selector: 'jhi-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product = {
    id: 1,
    price: '233',
    name: '',
    brand: '',
    mediaUrl: '',
    stock: -1,
    color: '',
    description: '',
  };
  constructor(private cartService: CartContentService) {}


  addToCart(product: Product):void {
    this.cartService.addToCart(product);
  }
}
