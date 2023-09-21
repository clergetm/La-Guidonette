import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListProductsModule } from '../list-products/list-products.module';
import { SearchModule } from '../search/search/search.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), MatPaginatorModule, ListProductsModule, SearchModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
