import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITorder } from '../torder.model';

@Component({
  selector: 'jhi-torder-detail',
  templateUrl: './torder-detail.component.html',
})
export class TorderDetailComponent implements OnInit {
  torder: ITorder | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ torder }) => {
      this.torder = torder;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
