import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TorderComponent } from './list/torder.component';
import { TorderDetailComponent } from './detail/torder-detail.component';
import { TorderUpdateComponent } from './update/torder-update.component';
import { TorderDeleteDialogComponent } from './delete/torder-delete-dialog.component';
import { TorderRoutingModule } from './route/torder-routing.module';

@NgModule({
  imports: [SharedModule, TorderRoutingModule],
  declarations: [TorderComponent, TorderDetailComponent, TorderUpdateComponent, TorderDeleteDialogComponent],
})
export class TorderModule {}
