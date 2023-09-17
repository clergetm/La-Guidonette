import {Route} from '@angular/router';

import {UserRouteAccessService} from 'app/core/auth/user-route-access.service';
import {UserPageComponent} from './user-page.component';

export const userPageRoute: Route = {
  path: 'user-page',
  component: UserPageComponent,
  data: {
    pageTitle: 'global.menu.account.user-page',
  },
  canActivate: [UserRouteAccessService],
};
