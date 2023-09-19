import { NgModule } from '@angular/core';

import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentComponent],
  imports: [FormsModule],
  exports: [PaymentComponent],
})
export class PaymentModule {}
