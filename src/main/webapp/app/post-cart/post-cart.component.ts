import { Component, OnInit } from '@angular/core';
import { AccountService } from '../core/auth/account.service';
import { Router } from '@angular/router';
import { TorderService } from '../entities/torder/service/torder.service';
import { NewOrderLine } from '../entities/order-line/order-line.model';
import { ITorder } from '../entities/torder/torder.model';
import { CartContentService } from '../services/cart-content.service';
import { StateStorageService } from '../core/auth/state-storage.service';
import { ConfirmOrderService } from './confirm-order.service';

@Component({
  selector: 'jhi-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['../styles.scss'],
})
export class PostCartComponent implements OnInit {
  postOrder: NewOrderLine[] | null = null;
  itorder: ITorder | null = null;
  step = 1;
  canValidate = false;
  canOrder = true;
  onCardName = 'Non-specifié';
  constructor(
    public torderService: TorderService,
    public accountService: AccountService,
    public cartContentService: CartContentService,
    public router: Router,
    private stateStorageService: StateStorageService,
    private confirmOrderService: ConfirmOrderService
  ) {}

  ngOnInit(): void {
    if (!this.accountService.isAuthenticated()) {
      this.stateStorageService.storeUrl('order');
      this.router.navigate(['login']);
    }
  }

  handlePaymentValidation(status: boolean): void {
    this.canValidate = status;
  }

  setName(onCardName: string): void {
    this.onCardName = onCardName;
  }

  handleCanOrder(status: boolean): void {
    this.canOrder = status;
  }

  nextStep(): void {
    if (this.step === 1) {
      this.step++;
    } else if (this.step === 2) {
      if (this.canValidate) {
        this.validateOrder();
      }
    }
  }

  previousStep(): void {
    this.step--;
    if (this.step === 0) {
      this.router.navigate(['/cart']);
    }
  }

  validateOrder(): void {
    this.postOrder = this.createOrderlines();
    this.torderService.createOrderFromProducts(this.postOrder).subscribe(data => {
      this.itorder = data;
      this.step = 3;
      this.cartContentService.removeAll();
      // besoiin d'etre a l'interieur, car besoin de itorder +
      // n'a pas lieu si l'order n'est pas validée.
      this.accountService.identity().forEach(account => {
        const acc_idOrder = this.itorder?.id ?? -1;
        const acc_username = account?.login ?? 'Utilisateur';
        const acc_mail = account?.email ?? 'rimshoy@gmail.com'; // keep track of mail if no mail found
        const acc_local = account?.langKey ?? 'fr';
        this.confirmOrderService
          .confirmOrder({
            username: acc_username,
            mail: acc_mail,
            commandId: acc_idOrder.toString(),
            name: this.onCardName,
            local: acc_local,
          })
          .subscribe();
      });
    });
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  private createOrderlines(): NewOrderLine[] {
    return this.cartContentService.getNewOrderlines();
  }
}
