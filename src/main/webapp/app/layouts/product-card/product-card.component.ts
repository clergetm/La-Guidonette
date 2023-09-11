import { Component, OnInit, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../list-products/product';
import { CartContentService } from '../../cart-content.service';

@Component({
  selector: 'jhi-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
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

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    var products: Product[] = this.cartService.getCartItems();
    products.forEach(product => {
      console.log(product.name);
    });
  }
}
