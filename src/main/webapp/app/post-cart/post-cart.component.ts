import { Component, OnInit } from '@angular/core';
import { AccountService } from '../core/auth/account.service';
import { Router } from '@angular/router';
import { TorderService } from '../entities/torder/service/torder.service';
import { NewOrderLine } from '../entities/order-line/order-line.model';
import { ITorder } from '../entities/torder/torder.model';
import { CartContentService } from '../services/cart-content.service';

@Component({
  selector: 'jhi-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['../styles.scss'],
})
export class PostCartComponent implements OnInit {
  postOrder: NewOrderLine[] | null = null;
  itorder: ITorder | null = null;
  failedToCommand: boolean = false;
  step = 1;
  canValidate = false;
  canOrder = true;
  constructor(
    public torderService: TorderService,
    public accountService: AccountService,
    public cartContentService: CartContentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.accountService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }

  handlePaymentValidation(status: boolean): void {
    this.canValidate = status;
  }

  handleCanOrder(status: boolean): void {
    this.canOrder = status;
  }

  nextStep(hasBeenValidated = false): void {
    if (hasBeenValidated || this.step != 2) {
      this.step++;
    } else if (this.step === 2) {
      if (this.canValidate) {
        this.failedToCommand = false;
        this.validateOrder();
      } else {
        this.failedToCommand = true;
      }
    }
    if (this.step === 4) {
      this.router.navigate(['/']);
    }
  }

  previousStep(): void {
    if (this.step === 2) {
      this.failedToCommand = false;
    }
    this.step--;
    if (this.step === 0) {
      this.router.navigate(['/cart']);
    }
  }

  validateOrder(): void {
    this.postOrder = this.createOrderlines();
    this.torderService.createOrderFromProducts(this.postOrder).subscribe(data => {
      this.itorder = data;
      this.nextStep(true);
      this.cartContentService.removeAll();
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
