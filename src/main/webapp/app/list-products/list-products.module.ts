import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { LISTPRODUCTS_ROUTE } from './list-products.route';
import { ListProductsComponent } from './list-products.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LISTPRODUCTS_ROUTE])],
})
export class ListProductsModule {}
