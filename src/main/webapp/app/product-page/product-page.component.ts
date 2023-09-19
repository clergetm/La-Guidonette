import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartContentService } from '../services/cart-content.service';
import { IProduct } from '../entities/product/product.model';
import { ProductService } from '../entities/product/service/product.service';

@Component({
  selector: 'jhi-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  productId: string | null = '-1';
  product: IProduct | null = null;

  constructor(public route: ActivatedRoute, public productService: ProductService, private cartService: CartContentService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (typeof this.productId === 'string') {
      this.getProductById(Number(this.productId));
    }
  }

  onPageChange(): void {
    if (typeof this.productId === 'string') {
      this.getProductById(Number(this.productId));
    }
  }

  getProductById(productId: number): void {
    this.productService.find(productId).subscribe(data => {
      this.product = data.body;
    });
  }

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
  }
}
