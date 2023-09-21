import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PRODUCTPAGE_ROUTE } from './product-page.route';
import { ProductPageComponent } from './product-page.component';
import { ProductCardModule } from '../layouts/product-card/product-card.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductPageComponent],
  imports: [SharedModule, RouterModule.forChild([PRODUCTPAGE_ROUTE]), ProductCardModule, MatButtonModule],
  exports: [ProductPageComponent],
})
export class ProductPageModule {}
