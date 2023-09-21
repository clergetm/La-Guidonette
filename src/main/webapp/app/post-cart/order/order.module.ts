import { NgModule } from '@angular/core';

import { OrderComponent } from './order.component';
import { NgForOf, NgIf } from '@angular/common';

@NgModule({
  declarations: [OrderComponent],
  imports: [NgForOf, NgIf],
  exports: [OrderComponent],
})
export class OrderModule {}
