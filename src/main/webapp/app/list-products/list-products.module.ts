import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { LISTPRODUCTS_ROUTE } from './list-products.route';
import { ProductCardModule } from '../layouts/product-card/product-card.module';
import { ListProductsComponent } from './list-products.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([LISTPRODUCTS_ROUTE]),
    ProductCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  declarations: [ListProductsComponent],
})
export class ListProductsModule {}
