import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { POCKETLOGIN_ROUTE } from './pocket-login.route';
import { PocketLoginComponent } from './pocket-login.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([POCKETLOGIN_ROUTE])],
  declarations: [PocketLoginComponent],
  exports: [PocketLoginComponent],
})
export class PocketLoginModule {}
