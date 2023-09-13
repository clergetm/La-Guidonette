import {Component, OnInit} from '@angular/core';
import {AccountService} from "../core/auth/account.service";
import {accountState} from "../account/account.route";

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit{
  step:number = 1;
  constructor(public accountService: AccountService) {

  }

  ngOnInit(): void {
    if (this.accountService.isAuthenticated()){
      this.step = 2;
    }
  }


}
