import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITorder } from '../torder.model';
import { TorderService } from '../service/torder.service';

@Injectable({ providedIn: 'root' })
export class TorderRoutingResolveService implements Resolve<ITorder | null> {
  constructor(protected service: TorderService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITorder | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((torder: HttpResponse<ITorder>) => {
          if (torder.body) {
            return of(torder.body);
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
