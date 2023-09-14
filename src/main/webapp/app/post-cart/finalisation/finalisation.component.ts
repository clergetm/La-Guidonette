import { Component, Input, OnInit } from '@angular/core';
import { ITorder } from '../../entities/torder/torder.model';

@Component({
  selector: 'jhi-finalisation',
  templateUrl: './finalisation.component.html',
  styleUrls: ['./finalisation.component.scss'],
})
export class FinalisationComponent implements OnInit {
  @Input() order: ITorder | null | undefined;

  constructor() {}

  ngOnInit(): void {}
}
