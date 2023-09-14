import {NgModule} from "@angular/core";
import {ProductCardComponent} from "./product-card.component";
import {CommonModule} from "@angular/common";

// Angular Material imports
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [
    ProductCardComponent,
  ],
  exports: [
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class ProductCardModule {
}
