import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../../core/auth/account.service';
import { CartContentService } from '../../services/cart-content.service';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', '../../styles.scss'],
})
export class PaymentComponent {
  @Output() canGoNext = new EventEmitter<boolean>();

  cardNumber = '';
  expiryDate = '';
  cvv = '';
  name = '';
  validInputs: boolean[] = [false, false, false, false]; // cc, date, cvv, name
  error_name = false;
  error_card_short = false;
  error_card_long = false;
  error_cvv = false;
  error_date_incorrect = false;
  error_date_expired = false;
  error_date_format = false;

  constructor(public accountService: AccountService, public cartContentService: CartContentService) {}

  formatCardNumber(): void {
    const formatted = this.cardNumber.replace(/\D/g, '').match(/.{1,4}/g);
    this.cardNumber = formatted ? formatted.join(' ') : '';
    this.isValidCCNumber();
    this.checkCanGoNext();
  }

  formatExpiryDate(): void {
    const formatted = this.expiryDate.replace(/\D/g, '').match(/.{1,2}/g);
    this.expiryDate = formatted ? formatted.join('/') : '';
    if (this.expiryDate.length > 5) {
      this.expiryDate = this.expiryDate.substr(0, 5);
    }
    this.isValidDate();
    this.checkCanGoNext();
  }

  formatCVV(): void {
    this.cvv = this.cvv.replace(/\D/g, '');
    this.error_cvv = !(this.cvv.length === 3);
    this.validInputs[2] = !this.error_cvv;
    this.checkCanGoNext();
  }

  formatName(): void {
    this.name = this.name.replace(/[0-9]/g, '');
    this.error_name = !(this.name.length > 0);
    this.validInputs[3] = !this.error_name;
    this.checkCanGoNext();
  }

  checkCanGoNext(): void {
    const isValid = this.validInputs[0] && this.validInputs[1] && this.validInputs[2] && this.validInputs[3];
    this.canGoNext.emit(isValid);
  }

  /**
   * Use Luhn algorithm to find if the credit card number is valid
   * Algo from https://decipher.dev/30-seconds-of-typescript/docs/luhnCheck/
   */
  isValidCCNumber(): boolean {
    const noSpace = this.cardNumber.replace(/\s/g, '');
    this.error_card_short = noSpace.length < 13;
    this.error_card_long = noSpace.length > 19;
    const retour = !this.error_card_long && !this.error_card_short;
    this.validInputs[0] = retour;
    return retour;
  }

  isValidDate(): boolean {
    this.error_date_format = this.expiryDate.length !== 5;
    if (this.error_date_format) {
      return false;
    } else {
      const month = Number(this.expiryDate.split('/')[0]);
      const year = Number(this.expiryDate.split('/')[1]);

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the year
      const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JS

      this.error_date_incorrect = month < 1 || month > 12;
      this.error_date_expired = currentYear * 12 + currentMonth > year * 12 + month;

      const retour = !this.error_date_expired && !this.error_date_incorrect;
      this.validInputs[1] = retour;
      return retour;
    }
  }
}
