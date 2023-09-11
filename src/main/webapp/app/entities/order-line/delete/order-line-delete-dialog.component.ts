import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderLine } from '../order-line.model';
import { OrderLineService } from '../service/order-line.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './order-line-delete-dialog.component.html',
})
export class OrderLineDeleteDialogComponent {
  orderLine?: IOrderLine;

  constructor(protected orderLineService: OrderLineService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.orderLineService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
