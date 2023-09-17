import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { CART_ROUTE } from './cart.route';
import { CartComponent } from './cart.component';
import { ProductCardModule } from '../layouts/product-card/product-card.module';

@NgModule({
  declarations: [CartComponent],
  imports: [SharedModule, RouterModule.forChild([CART_ROUTE]), ProductCardModule],
  exports: [CartComponent],
})
export class CartModule {}
