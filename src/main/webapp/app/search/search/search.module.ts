import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListProductsModule } from '../../list-products/list-products.module';
import { RouterModule } from '@angular/router';
import { SEARCH_ROUTE } from './search.route';
import { SharedModule } from '../../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([SEARCH_ROUTE]),
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ListProductsModule,
    MatPaginatorModule,
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent],
})
export class SearchModule {}
