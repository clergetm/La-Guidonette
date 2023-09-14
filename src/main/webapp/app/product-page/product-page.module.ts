import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PRODUCTPAGE_ROUTE} from "./product-page.route";
import {ProductPageComponent} from "./product-page.component";

@NgModule({
  declarations: [ProductPageComponent],
  imports: [SharedModule, RouterModule.forChild([PRODUCTPAGE_ROUTE])],
  exports: [ProductPageComponent]
})
export class ProductPageModule {}
