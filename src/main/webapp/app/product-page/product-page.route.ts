import { Route } from '@angular/router';

import { ProductPageComponent } from './product-page.component';

export const PRODUCTPAGE_ROUTE: Route = {
  path: '',
  component: ProductPageComponent,
  data: {
    pageTitle: 'product-page.title',
  },
};
