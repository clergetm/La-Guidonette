import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartContentService } from '../../services/cart-content.service';
import { ProductService } from '../../entities/product/service/product.service';
import { NewOrderLine } from 'app/entities/order-line/order-line.model';
import { IProduct } from '../../entities/product/product.model';
import { PageEvent } from '@angular/material/paginator';
import { min } from 'rxjs';
import { CoupleProductQuantity } from '../../entities/dto/CoupleProductQuantity';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', '../../styles.scss', '../post-cart.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() cartContentService: CartContentService | undefined;
  @Output() canOrder = new EventEmitter<boolean>();
  price = '';
  impossibleOrder = false;
  constructor(public productService: ProductService, private router: Router) {
    // if the user just arrived, set impossibleOrder at false
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (this.router.url === '/order') {
        this.impossibleOrder = false;
      }
    });
  }

  ngOnInit(): void {
    if (this.cartContentService) {
      this.cartContentService.refreshProducts();
    }
    this.impossibleOrder = false;
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

  /**
   * True if there isn't enough stock for this order
   * @param productQuantity
   */
  notEnoughProduct(productQuantity: CoupleProductQuantity): boolean {
    const stock = productQuantity.product?.quantity ?? 0;
    const quantity = productQuantity.quantity;
    let currentReturn = false;
    if (stock < quantity) {
      this.impossibleOrder = true;
      currentReturn = true;
    }
    // emit the value in every case, it will be true if something can't be ordered
    this.canOrder.emit(!this.impossibleOrder);
    return currentReturn;
  }
}
