import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OrderLineComponent } from './list/order-line.component';
import { OrderLineDetailComponent } from './detail/order-line-detail.component';
import { OrderLineUpdateComponent } from './update/order-line-update.component';
import { OrderLineDeleteDialogComponent } from './delete/order-line-delete-dialog.component';
import { OrderLineRoutingModule } from './route/order-line-routing.module';

@NgModule({
  imports: [SharedModule, OrderLineRoutingModule],
  declarations: [OrderLineComponent, OrderLineDetailComponent, OrderLineUpdateComponent, OrderLineDeleteDialogComponent],
})
export class OrderLineModule {}
