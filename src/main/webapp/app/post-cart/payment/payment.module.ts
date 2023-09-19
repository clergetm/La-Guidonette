import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { StepperAnimationModule } from '../../layouts/stepper-animation/stepper-animation.module';
import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';

@NgModule({
  declarations: [PaymentComponent],
  imports: [FormsModule, NgClass, NgStyle],
  exports: [PaymentComponent],
})
export class PaymentModule {}
