import { Injectable } from '@angular/core';
import { IProduct } from './entities/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartContentService {
  private cartItems: IProduct[] = [];
  private size = 0;
  constructor() {
    const localStorageCart: string | null = localStorage.getItem('user-cart');
    if (localStorageCart) {
      this.cartItems = JSON.parse(localStorageCart);
      this.size = this.cartItems.length;
    }
  }

  addToCart(product: IProduct): void {
    this.cartItems.push(product);
    this.size += 1;
    this.updatelocalStorageCart();
  }

  removeFromCart(product: IProduct): void {
    const index: number = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.size -= 1;
      this.updatelocalStorageCart();
    }
  }

  removeAll(): void {
    this.cartItems = [];
    this.size = this.cartItems.length;
    this.updatelocalStorageCart();
  }

  getCartItems(): IProduct[] {
    return this.cartItems;
  }

  getSize(): number {
    return this.size;
  }

  private updatelocalStorageCart(): void {
    localStorage.setItem('user-cart', JSON.stringify(this.cartItems));
  }
}
