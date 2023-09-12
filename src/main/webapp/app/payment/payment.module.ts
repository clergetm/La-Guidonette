import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PAYMENT_ROUTE } from './payment.route';
import {StepperAnimationModule} from "../layouts/stepper-animation/stepper-animation.module";
import {PaymentComponent} from "./payment.component";

@NgModule({
  declarations:[PaymentComponent],
  imports: [SharedModule, RouterModule.forChild([PAYMENT_ROUTE]), StepperAnimationModule],
  exports: [PaymentComponent]
})
export class PaymentModule {}
