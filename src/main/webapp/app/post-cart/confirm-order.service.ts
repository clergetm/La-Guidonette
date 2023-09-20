import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ConfirmOrder } from './confirm-order.model';
@Injectable({ providedIn: 'root' })
export class ConfirmOrderService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  confirmOrder(userMail: ConfirmOrder): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/confirm-order'), userMail);
  }
}
