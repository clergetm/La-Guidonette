import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITorder, NewTorder } from '../torder.model';

export type PartialUpdateTorder = Partial<ITorder> & Pick<ITorder, 'id'>;

type RestOf<T extends ITorder | NewTorder> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestTorder = RestOf<ITorder>;

export type NewRestTorder = RestOf<NewTorder>;

export type PartialUpdateRestTorder = RestOf<PartialUpdateTorder>;

export type EntityResponseType = HttpResponse<ITorder>;
export type EntityArrayResponseType = HttpResponse<ITorder[]>;

@Injectable({ providedIn: 'root' })
export class TorderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/torders');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(torder: NewTorder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(torder);
    return this.http
      .post<RestTorder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(torder: ITorder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(torder);
    return this.http
      .put<RestTorder>(`${this.resourceUrl}/${this.getTorderIdentifier(torder)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(torder: PartialUpdateTorder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(torder);
    return this.http
      .patch<RestTorder>(`${this.resourceUrl}/${this.getTorderIdentifier(torder)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTorder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTorder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTorderIdentifier(torder: Pick<ITorder, 'id'>): number {
    return torder.id;
  }

  compareTorder(o1: Pick<ITorder, 'id'> | null, o2: Pick<ITorder, 'id'> | null): boolean {
    return o1 && o2 ? this.getTorderIdentifier(o1) === this.getTorderIdentifier(o2) : o1 === o2;
  }

  addTorderToCollectionIfMissing<Type extends Pick<ITorder, 'id'>>(
    torderCollection: Type[],
    ...tordersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const torders: Type[] = tordersToCheck.filter(isPresent);
    if (torders.length > 0) {
      const torderCollectionIdentifiers = torderCollection.map(torderItem => this.getTorderIdentifier(torderItem)!);
      const tordersToAdd = torders.filter(torderItem => {
        const torderIdentifier = this.getTorderIdentifier(torderItem);
        if (torderCollectionIdentifiers.includes(torderIdentifier)) {
          return false;
        }
        torderCollectionIdentifiers.push(torderIdentifier);
        return true;
      });
      return [...tordersToAdd, ...torderCollection];
    }
    return torderCollection;
  }

  protected convertDateFromClient<T extends ITorder | NewTorder | PartialUpdateTorder>(torder: T): RestOf<T> {
    return {
      ...torder,
      date: torder.date?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTorder: RestTorder): ITorder {
    return {
      ...restTorder,
      date: restTorder.date ? dayjs(restTorder.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTorder>): HttpResponse<ITorder> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTorder[]>): HttpResponse<ITorder[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
