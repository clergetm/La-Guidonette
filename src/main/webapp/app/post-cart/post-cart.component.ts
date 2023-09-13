import { Component, OnInit } from '@angular/core';
import {AccountService} from "../core/auth/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'jhi-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.scss']
})
export class PostCartComponent implements OnInit {

  step:number = 1;
  constructor(
    public accountService: AccountService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    if (!this.accountService.isAuthenticated()){
      this.router.navigate(['login'])
    }
  }
}
