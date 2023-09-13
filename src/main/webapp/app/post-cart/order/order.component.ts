import { Component } from '@angular/core';
import { CartContentService } from '../../cart-content.service';
import { IProduct } from '../../entities/product/product.model';

@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  price = '';
  constructor(public cartService: CartContentService) {}
}
