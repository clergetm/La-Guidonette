import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { ORDER_ROUTE } from './order.route';
import { OrderComponent } from './order.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([ORDER_ROUTE])],
})
export class OrderModule {}
