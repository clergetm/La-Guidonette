import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { CART_ROUTE } from './cart.route';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([CART_ROUTE])],
})
export class CartModule {}
