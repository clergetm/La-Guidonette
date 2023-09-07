import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICategory } from '../category.model';
import { CategoryService } from '../service/category.service';

@Injectable({ providedIn: 'root' })
export class CategoryRoutingResolveService implements Resolve<ICategory | null> {
  constructor(protected service: CategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((category: HttpResponse<ICategory>) => {
          if (category.body) {
            return of(category.body);
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
