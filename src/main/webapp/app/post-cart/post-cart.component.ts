import { Component, OnInit } from '@angular/core';
import { AccountService } from '../core/auth/account.service';
import { Router } from '@angular/router';
import { TorderService } from '../entities/torder/service/torder.service';
import { IOrderLine, NewOrderLine } from '../entities/order-line/order-line.model';
import { ITorder } from '../entities/torder/torder.model';
import { CartContentService } from '../services/cart-content.service';

@Component({
  selector: 'jhi-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.scss'],
})
export class PostCartComponent implements OnInit {
  postOrder: NewOrderLine[] | null = null;
  itorder: ITorder | null = null;
  step: number = 1;
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

  nextStep(): void {
    this.step++;
  }

  previousStep(): void {
    this.step--;
  }

  validateOrder() {
    this.postOrder = this.createOrderlines();
    this.torderService.createOrderFromProducts(this.postOrder).subscribe(data => {
      this.itorder = data;
      this.nextStep();
    });
  }

  private createOrderlines(): NewOrderLine[] {
    return this.cartContentService.getNewOrderlines();
  }

  goToHome(): void {
    this.router.navigate(['']);
  }
}
