import { Route } from '@angular/router';

import { PocketLoginComponent } from './pocket-login.component';

export const POCKETLOGIN_ROUTE: Route = {
  path: '',
  component: PocketLoginComponent,
  data: {
    pageTitle: 'login.title',
  },
};
