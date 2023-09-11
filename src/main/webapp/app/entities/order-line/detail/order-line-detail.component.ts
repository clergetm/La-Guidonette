import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderLine } from '../order-line.model';

@Component({
  selector: 'jhi-order-line-detail',
  templateUrl: './order-line-detail.component.html',
})
export class OrderLineDetailComponent implements OnInit {
  orderLine: IOrderLine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderLine }) => {
      this.orderLine = orderLine;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
