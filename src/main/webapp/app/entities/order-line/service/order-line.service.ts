import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOrderLine, NewOrderLine } from '../order-line.model';

export type PartialUpdateOrderLine = Partial<IOrderLine> & Pick<IOrderLine, 'id'>;

export type EntityResponseType = HttpResponse<IOrderLine>;
export type EntityArrayResponseType = HttpResponse<IOrderLine[]>;

@Injectable({ providedIn: 'root' })
export class OrderLineService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/order-lines');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(orderLine: NewOrderLine): Observable<EntityResponseType> {
    return this.http.post<IOrderLine>(this.resourceUrl, orderLine, { observe: 'response' });
  }

  update(orderLine: IOrderLine): Observable<EntityResponseType> {
    return this.http.put<IOrderLine>(`${this.resourceUrl}/${this.getOrderLineIdentifier(orderLine)}`, orderLine, { observe: 'response' });
  }

  partialUpdate(orderLine: PartialUpdateOrderLine): Observable<EntityResponseType> {
    return this.http.patch<IOrderLine>(`${this.resourceUrl}/${this.getOrderLineIdentifier(orderLine)}`, orderLine, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrderLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrderLine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOrderLineIdentifier(orderLine: Pick<IOrderLine, 'id'>): number {
    return orderLine.id;
  }

  compareOrderLine(o1: Pick<IOrderLine, 'id'> | null, o2: Pick<IOrderLine, 'id'> | null): boolean {
    return o1 && o2 ? this.getOrderLineIdentifier(o1) === this.getOrderLineIdentifier(o2) : o1 === o2;
  }

  addOrderLineToCollectionIfMissing<Type extends Pick<IOrderLine, 'id'>>(
    orderLineCollection: Type[],
    ...orderLinesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const orderLines: Type[] = orderLinesToCheck.filter(isPresent);
    if (orderLines.length > 0) {
      const orderLineCollectionIdentifiers = orderLineCollection.map(orderLineItem => this.getOrderLineIdentifier(orderLineItem)!);
      const orderLinesToAdd = orderLines.filter(orderLineItem => {
        const orderLineIdentifier = this.getOrderLineIdentifier(orderLineItem);
        if (orderLineCollectionIdentifiers.includes(orderLineIdentifier)) {
          return false;
        }
        orderLineCollectionIdentifiers.push(orderLineIdentifier);
        return true;
      });
      return [...orderLinesToAdd, ...orderLineCollection];
    }
    return orderLineCollection;
  }
}
