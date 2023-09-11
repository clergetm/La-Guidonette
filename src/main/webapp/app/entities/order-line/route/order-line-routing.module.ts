import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OrderLineComponent } from '../list/order-line.component';
import { OrderLineDetailComponent } from '../detail/order-line-detail.component';
import { OrderLineUpdateComponent } from '../update/order-line-update.component';
import { OrderLineRoutingResolveService } from './order-line-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const orderLineRoute: Routes = [
  {
    path: '',
    component: OrderLineComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrderLineDetailComponent,
    resolve: {
      orderLine: OrderLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrderLineUpdateComponent,
    resolve: {
      orderLine: OrderLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrderLineUpdateComponent,
    resolve: {
      orderLine: OrderLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderLineRoute)],
  exports: [RouterModule],
})
export class OrderLineRoutingModule {}
