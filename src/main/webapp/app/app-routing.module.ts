import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: '',
          loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        },
        {
          path: 'search',
          loadChildren: () => import('./search/search/search.module').then(m => m.SearchModule),
        },
        {
          path: 'cart',
          loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
        },
        {
          path: 'order',
          loadChildren: () => import('./post-cart/post-cart.module').then(m => m.PostCartModule),
        },
        {
          path: 'product/:id',
          loadChildren: () => import('./product-page/product-page.module').then(m => m.ProductPageModule),
        },
        {
          path: 'entity',
          loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
        },
        navbarRoute,
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
