import { TestBed } from '@angular/core/testing';

import { CartContentService } from './cart-content.service';

describe('CartContentService', () => {
  let service: CartContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
