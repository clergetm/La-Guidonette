import {Component} from '@angular/core';
import {AccountService} from "../../core/auth/account.service";
import {CartContentService} from "../../services/cart-content.service";

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent{
  step:number = 1;


  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  constructor(
    public accountService: AccountService,
    public cartContentService: CartContentService
  ) {}

  formatCardNumber(): void {
    let formatted = this.cardNumber.replace(/\D/g, '').match(/.{1,4}/g);
    this.cardNumber = formatted ? formatted.join(' ') : '';
  }

  formatExpiryDate(): void {
    let formatted = this.expiryDate.replace(/\D/g, '').match(/.{1,2}/g);
    this.expiryDate = formatted ? formatted.join('/') : '';
    if (this.expiryDate.length > 5) {
      this.expiryDate = this.expiryDate.substr(0, 5);
    }
  }

  formatCVV():void {
    this.cvv = this.cvv.replace(/\D/g, '');
  }

}
