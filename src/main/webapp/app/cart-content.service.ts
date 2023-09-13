import {Injectable} from '@angular/core';
import {Product} from './list-products/product';

@Injectable({
  providedIn: 'root',
})

export class CartContentService {
  private cartItems: Product[] = [];
  private size = 0;

  constructor() {
    const localStorageCart: string | null = localStorage.getItem('user-cart');
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

  addMultipleToCart(product: Product, number: number): void {
    for (let i = 0; i < number; i++) {
      this.cartItems.push(product);
      this.size += 1;
    }
    this.updatelocalStorageCart();
  }

  removeFromCart(product: Product): void {
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
