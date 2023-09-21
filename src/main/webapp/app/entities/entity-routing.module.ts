import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        data: { authorities: ['ROLE_ADMIN'], pageTitle: 'laGuidonetteApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'category',
        data: { authorities: ['ROLE_ADMIN'], pageTitle: 'laGuidonetteApp.category.home.title' },
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'torder',
        data: { authorities: ['ROLE_ADMIN'], pageTitle: 'laGuidonetteApp.torder.home.title' },
        loadChildren: () => import('./torder/torder.module').then(m => m.TorderModule),
      },
      {
        path: 'order-line',
        data: { authorities: ['ROLE_ADMIN'], pageTitle: 'laGuidonetteApp.orderLine.home.title' },
        loadChildren: () => import('./order-line/order-line.module').then(m => m.OrderLineModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
