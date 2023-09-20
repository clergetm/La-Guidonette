import { Component } from '@angular/core';
import { CartContentService } from '../services/cart-content.service';

import { IProduct } from '../entities/product/product.model';
import { AccountService } from '../core/auth/account.service';
import { StateStorageService } from '../core/auth/state-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../styles.scss'],
})
export class CartComponent {
  constructor(
    public cartService: CartContentService,
    public account: AccountService,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {}

  deleteCart(): void {
    this.cartService.removeAll();
  }

  deleteItem(prod: IProduct): void {
    this.cartService.removeFromCart(prod);
  }

  redirectToLogin(): void {
    if (this.account.isAuthenticated()) {
      this.router.navigate(['order']);
    } else {
      this.stateStorageService.storeUrl('order');
      this.router.navigate(['login']);
    }
  }
  addItem(prod: IProduct): void {
    this.cartService.addToCart(prod);
  }
}
