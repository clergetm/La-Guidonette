import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import {StepperAnimationModule} from "../../layouts/stepper-animation/stepper-animation.module";
import {PaymentComponent} from "./payment.component";

@NgModule({
  declarations:[PaymentComponent],
  exports: [PaymentComponent]
})
export class PaymentModule {}
