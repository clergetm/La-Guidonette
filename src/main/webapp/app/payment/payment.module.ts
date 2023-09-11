import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PAYMENT_ROUTE } from './payment.route';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([PAYMENT_ROUTE])],
})
export class PaymentModule {}
