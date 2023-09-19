import { Component, Input, OnInit } from '@angular/core';
import { CartContentService } from '../../services/cart-content.service';
import { ProductService } from '../../entities/product/service/product.service';
import { NewOrderLine } from 'app/entities/order-line/order-line.model';

@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', '../post-cart.component.scss'],
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
}
