import { NgModule } from '@angular/core';
import { ProductCardComponent } from './product-card.component';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductImageComponent } from '../product-image/product-image.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [ProductCardComponent, ProductImageComponent],
  exports: [ProductCardComponent, ProductImageComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatToolbarModule, RouterLink, RouterLinkActive],
})
export class ProductCardModule {}
