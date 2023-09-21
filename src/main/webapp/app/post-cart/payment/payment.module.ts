import { NgModule } from '@angular/core';

import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@NgModule({
  declarations: [PaymentComponent],
  imports: [FormsModule, NgClass, NgStyle, NgIf],
  exports: [PaymentComponent],
})
export class PaymentModule {}
