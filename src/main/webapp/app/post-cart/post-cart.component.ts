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
  step = 1;
  canValidate = false;
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

  handlePaymentValidation(status: boolean) {
    this.canValidate = status;
  }

  nextStep(): void {
    if (this.step + 1 === 3) {
      if (this.canValidate) {
        this.validateOrder();
      } else {
        return;
      }
    }
    this.step++;
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
      this.cartContentService.removeAll();
      this.nextStep();
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
