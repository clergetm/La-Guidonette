import { Injectable } from '@angular/core';
import { IProduct } from '../entities/product/product.model';
import { NewOrderLine } from '../entities/order-line/order-line.model';
import { ProductService } from '../entities/product/service/product.service';
import { CoupleProductQuantity } from '../entities/dto/CoupleProductQuantity';

@Injectable({
  providedIn: 'root',
})
export class CartContentService {
  private cartItems: IProduct[] = [];
  private size = 0;

  constructor(public productService: ProductService) {
    const localStorageCart: string | null = localStorage.getItem('user-cart');
    if (localStorageCart) {
      this.cartItems = JSON.parse(localStorageCart);
      this.size = this.cartItems.length;
    }
  }

  cartItemsIndexOf(prod: IProduct): number {
    let retour = -1;
    for (let index = 0; index < this.cartItems.length; index++) {
      if (this.cartItems[index].id === prod.id) {
        retour = index;
        break;
      }
    }
    return retour;
  }

  isEmpty(): boolean {
    return this.size === 0;
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
    const index: number = this.cartItemsIndexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.size -= 1;
      this.updatelocalStorageCart();
    }
  }

  removeAllFromCart(product: IProduct): void {
    var index: number = this.cartItemsIndexOf(product);
    while (index > -1) {
      this.cartItems.splice(index, 1);
      this.size -= 1;
      index = this.cartItemsIndexOf(product);
    }
    this.updatelocalStorageCart();
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
      if (product.price) {
        sum += product.price;
      }
    });
    return sum.toString();
  }

  getSize(): number {
    return this.size;
  }

  getNewOrderlines(): NewOrderLine[] {
    const newOrderlines: NewOrderLine[] = [];
    for (const product of this.getCartItems()) {
      let added = false;

      for (const index in newOrderlines) {
        if (product.id === newOrderlines[index].product!.id) {
          newOrderlines[index].quantity!++;
          added = true;
          break;
        }
      }
      if (!added) {
        const anNewOrderLine: NewOrderLine = {
          id: null,
          product,
          quantity: 1,
          torder: null,
        };
        newOrderlines.push(anNewOrderLine);
      }
    }
    return newOrderlines;
  }

  getProductsAndQuantity() {
    const coupleProductStocks: CoupleProductQuantity[] = [];
    for (const product of this.getCartItems()) {
      let added = false;
      for (const index in coupleProductStocks) {
        // @ts-ignore
        if (product.id == coupleProductStocks[index].product.id) {
          // @ts-ignore
          coupleProductStocks[index].quantity++;
          added = true;
          break;
        }
      }
      if (!added) {
        const coupleProductStock: CoupleProductQuantity = {
          product,
          quantity: 1,
        };
        coupleProductStocks.push(coupleProductStock);
      }
    }
    return coupleProductStocks;
  }

  refreshProducts(): void {
    for (const p in this.cartItems) {
      this.productService.find(this.cartItems[p].id).subscribe(data => {
        if (data.body) {
          this.cartItems[p] = data.body;
        }
      });
    }
    this.updatelocalStorageCart();
  }

  private updatelocalStorageCart(): void {
    localStorage.setItem('user-cart', JSON.stringify(this.cartItems));
  }
}
