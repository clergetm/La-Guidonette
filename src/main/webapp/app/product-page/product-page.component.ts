import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {getProductById, Product, products} from "../list-products/product";
import {CartContentService} from '../cart-content.service';

@Component({
  selector: 'jhi-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']

})
export class ProductPageComponent implements OnInit {
  productId: string | null = "-1"
  product: Product | null = {
    id: -1,
    price: '233',
    name: '',
    brand: '',
    mediaUrl: '',
    stock: -1,
    color: '',
    description: '',
  };

  constructor(public route: ActivatedRoute, private cartService: CartContentService) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (typeof this.productId === "string") {
      this.product = getProductById(parseInt(this.productId));
    }
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
