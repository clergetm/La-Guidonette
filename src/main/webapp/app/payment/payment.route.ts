import { Route } from '@angular/router';

import { PaymentComponent } from './payment.component';

export const PAYMENT_ROUTE: Route = {
  path: '',
  component: PaymentComponent,
  data: {
    pageTitle: 'Payement',
  },
};
