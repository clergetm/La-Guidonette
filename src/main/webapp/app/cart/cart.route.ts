import { Route } from '@angular/router';

import { CartComponent } from './cart.component';

export const CART_ROUTE: Route = {
  path: '',
  component: CartComponent,
  data: {
    pageTitle: 'cart.title',
  },
};
