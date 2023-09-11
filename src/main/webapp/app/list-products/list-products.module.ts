import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { LISTPRODUCTS_ROUTE } from './list-products.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LISTPRODUCTS_ROUTE])],
})
export class ListProductsModule {}
