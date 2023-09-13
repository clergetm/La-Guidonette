import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { IProduct } from '../entities/product/product.model';
import { ProductService } from '../entities/product/service/product.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  products: IProduct[] | null = null;
  totalProducts: number = 0;
  size: number[] = [6, 9, 12];
  currentPageSize: number = 6;
  page: number = 0;
  private readonly destroy$ = new Subject<void>();
  constructor(private accountService: AccountService, private router: Router, public productService: ProductService) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
    this.fetchProducts(this.page, this.currentPageSize);
  }
  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  fetchProducts(page: number, size: number) {
    this.productService.findProductsPage(page, size).subscribe(data => {
      this.products = data.products;
      this.totalProducts = data.totalProducts;
      this.currentPageSize = data.size;
      this.page = data.page;
      console.log(this.products);
    });
  }
  onPageChange(event: PageEvent) {
    this.fetchProducts(event.pageIndex, event.pageSize);
  }
}
