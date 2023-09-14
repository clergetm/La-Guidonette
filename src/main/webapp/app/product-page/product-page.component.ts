import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CartContentService} from '../services/cart-content.service';
import {IProduct} from "../entities/product/product.model";
import {ProductService} from "../entities/product/service/product.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'jhi-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']

})
export class ProductPageComponent implements OnInit {
  productId: string | null = "-1"
  product: IProduct | null = null;

  constructor(public route: ActivatedRoute, public productService: ProductService, private cartService: CartContentService) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (typeof this.productId === "string") {
      this.getProductById(parseInt(this.productId));
    }
  }

  onPageChange(event: PageEvent) {
    if (typeof this.productId === "string") {
      this.getProductById(parseInt(this.productId));
    }
  }

  getProductById(productId: number): void {
    this.productService.find(productId).subscribe(data => {
        this.product = data.body;
      }
    )
  }

  addToCart(): void {
    if (this.product != null) {
      var numberSelector: any;
      numberSelector = document.getElementById("numberOfItem");
      if (numberSelector != null) {
        this.cartService.addMultipleToCart(this.product, numberSelector.value);
      }
    }
  }

}
