import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOrderLine } from '../order-line.model';
import { OrderLineService } from '../service/order-line.service';

@Injectable({ providedIn: 'root' })
export class OrderLineRoutingResolveService implements Resolve<IOrderLine | null> {
  constructor(protected service: OrderLineService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderLine | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((orderLine: HttpResponse<IOrderLine>) => {
          if (orderLine.body) {
            return of(orderLine.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
