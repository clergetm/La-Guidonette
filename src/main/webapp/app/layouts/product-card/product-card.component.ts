import { Component, Input } from '@angular/core';

import { CartContentService } from '../../services/cart-content.service';
import { IProduct } from '../../entities/product/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: IProduct | null = null;
  constructor(private cartService: CartContentService, private router: Router) {}

  addToCart(event: MouseEvent): void {
    event.stopPropagation(); // don't open the product page
    if (this.product != null) {
      this.cartService.addToCart(this.product);
    }
  }
  goToProductPage(): void {
    if (this.product != null) {
      this.router.navigate(['/product/' + this.product.id]);
    }
  }
}
