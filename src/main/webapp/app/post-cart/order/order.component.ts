import { Component, Input, OnInit } from '@angular/core';
import { CartContentService } from '../../services/cart-content.service';
import { ProductService } from '../../entities/product/service/product.service';
import { NewOrderLine } from 'app/entities/order-line/order-line.model';
import { IProduct } from '../../entities/product/product.model';
import { PageEvent } from '@angular/material/paginator';
import { min } from 'rxjs';

@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', '../../styles.scss', '../post-cart.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() cartContentService: CartContentService | undefined;
  price = '';
  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    if (this.cartContentService) {
      this.cartContentService.refreshProducts();
    }
  }

  onPageChange(): void {
    if (this.cartContentService) {
      this.cartContentService.refreshProducts();
    }
  }

  getOrderLines(): NewOrderLine[] | null {
    if (this.cartContentService) {
      return this.cartContentService.getNewOrderlines();
    } else {
      return null;
    }
  }

  totalPrice(product: IProduct, quantity: number): number {
    if (quantity === 0 || product.quantity === 0) {
      return 0;
    } else {
      return (product.price ?? 0) * Math.min(product.quantity ?? 0, quantity ?? 0); // ?? is case if undefined
    }
  }
}
