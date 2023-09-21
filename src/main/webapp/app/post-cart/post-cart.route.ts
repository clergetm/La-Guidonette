import { Route } from '@angular/router';

import { PostCartComponent } from './post-cart.component';

export const POSTCART_ROUTE: Route = {
  path: '',
  component: PostCartComponent,
  data: {
    pageTitle: 'laGuidonetteApp.torder.detail.title',
  },
};
