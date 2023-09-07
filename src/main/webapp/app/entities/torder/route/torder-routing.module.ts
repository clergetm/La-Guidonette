import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TorderComponent } from '../list/torder.component';
import { TorderDetailComponent } from '../detail/torder-detail.component';
import { TorderUpdateComponent } from '../update/torder-update.component';
import { TorderRoutingResolveService } from './torder-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const torderRoute: Routes = [
  {
    path: '',
    component: TorderComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TorderDetailComponent,
    resolve: {
      torder: TorderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TorderUpdateComponent,
    resolve: {
      torder: TorderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TorderUpdateComponent,
    resolve: {
      torder: TorderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(torderRoute)],
  exports: [RouterModule],
})
export class TorderRoutingModule {}
