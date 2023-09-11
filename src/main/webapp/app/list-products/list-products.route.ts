import { Route } from '@angular/router';

import { ListProductsComponent } from './list-products.component';

export const LISTPRODUCTS_ROUTE: Route = {
  path: '',
  component: ListProductsComponent,
  data: {
    pageTitle: 'Liste produits',
  },
};
