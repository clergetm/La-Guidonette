import { Injectable } from '@angular/core';
import { IProduct } from '../entities/product/product.model';
import { NewOrderLine } from '../entities/order-line/order-line.model';

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

  addMultipleToCart(product: IProduct, number: number): void {
    for (let i = 0; i < number; i++) {
      this.cartItems.push(product);
      this.size += 1;
    }
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

  getPrice(): string {
    let sum = 0;
    this.cartItems.forEach(product => {
      if (product.price) sum += product.price;
    });
    return sum.toString();
  }

  getSize(): number {
    return this.size;
  }

  getNewOrderlines() {
    let newOrderlines: NewOrderLine[] = [];
    for (let product of this.getCartItems()) {
      let added = false;
      for (let index in newOrderlines) {
        // @ts-ignore
        if (product.id == newOrderlines[index].product.id) {
          // @ts-ignore
          newOrderlines[index].quantity++;
          added = true;
          break;
        }
      }
      if (!added) {
        let anNewOrderLine: NewOrderLine = {
          id: null,
          product: product,
          quantity: 1,
          torder: null,
        };
        newOrderlines.push(anNewOrderLine);
      }
    }
    return newOrderlines;
  }

  private updatelocalStorageCart(): void {
    localStorage.setItem('user-cart', JSON.stringify(this.cartItems));
  }
}
