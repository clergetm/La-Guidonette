import { Route } from '@angular/router';

import { OrderComponent } from './order.component';

export const ORDER_ROUTE: Route = {
  path: '',
  component: OrderComponent,
  data: {
    pageTitle: 'Commande',
  },
};
