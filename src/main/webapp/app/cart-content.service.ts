import { Injectable } from '@angular/core';
import { Product } from './list-products/product';

@Injectable({
  providedIn: 'root',
})

// Note: this class currently contains an attempt at storing the
// cart data inside the session storage to avoid refresh deleting the cart.
// Maybe we can detect an exit of the site and backup on the server when it happens
export class CartContentService {

  private cartItems: Product[] = [];
  private size = 0;

  constructor() {
    const localStorageCart = localStorage.getItem('user-cart');
    if (localStorageCart) {
      this.cartItems = JSON.parse(localStorageCart);
      this.size = this.cartItems.length;
    }
  }

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.size += 1;
    this.updatelocalStorageCart();
  }

  removeFromCart(product: Product): void {
    const index = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.size -= 1;
      this.updatelocalStorageCart();
    }
  }

  removeAll() : void{
    this.cartItems = [];
    this.size = this.cartItems.length;
    this.updatelocalStorageCart();
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getSize(): number {
    return this.size;
  }

  private updatelocalStorageCart(): void {
    localStorage.setItem('user-cart', JSON.stringify(this.cartItems));
  }
}
