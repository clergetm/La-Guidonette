import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../../core/auth/account.service';
import { CartContentService } from '../../services/cart-content.service';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', '../post-cart.component.scss'],
})
export class PaymentComponent {
  @Input() hasTriedToGoNext?: boolean = false;
  @Output() canGoNext = new EventEmitter<boolean>();

  cardNumber = '';
  expiryDate = '';
  cvv: string = '';
  name: string = '';

  validInputs: boolean[] = [false, false, false, false]; // cc, date, cvv, name
  constructor(public accountService: AccountService, public cartContentService: CartContentService) {}

  formatCardNumber(): void {
    const formatted = this.cardNumber.replace(/\D/g, '').match(/.{1,4}/g);
    this.cardNumber = formatted ? formatted.join(' ') : '';
    this.checkContains();
  }

  formatExpiryDate(): void {
    const formatted = this.expiryDate.replace(/\D/g, '').match(/.{1,2}/g);
    this.expiryDate = formatted ? formatted.join('/') : '';
    if (this.expiryDate.length > 5) {
      this.expiryDate = this.expiryDate.substr(0, 5);
    }
    this.checkContains();
  }

  formatCVV(): void {
    this.cvv = this.cvv.replace(/\D/g, '');
    this.checkContains();
  }

  formatName(): void {
    this.checkContains();
  }

  checkContains() {
    this.isValidCCNumber();
    this.isValidDate();
    this.validInputs[2] = this.cvv.length === 3;
    this.validInputs[3] = this.name.length > 0;
    const isValid = this.validInputs[0] && this.validInputs[1] && this.validInputs[2];
    this.canGoNext.emit(isValid);
  }

  /**
   * Use Luhn algorithm to find if the credit card number is valid
   * Algo from https://decipher.dev/30-seconds-of-typescript/docs/luhnCheck/
   */
  isValidCCNumber(): boolean {
    let noSpace = this.cardNumber.replace(/\s/g, '');
    let retour = noSpace.length >= 13 && noSpace.length <= 19;
    this.validInputs[0] = retour;
    return retour;
  }

  isValidDate(): boolean {
    let correctSize = this.expiryDate.length === 5;
    let month = parseInt(this.expiryDate.split('/')[0]);
    let year = parseInt(this.expiryDate.split('/')[1]);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JS

    let retour = correctSize && month > 0 && month <= 12 && currentYear * 12 + currentMonth <= year * 12 + month;
    this.validInputs[1] = retour;
    return retour;
  }
}
