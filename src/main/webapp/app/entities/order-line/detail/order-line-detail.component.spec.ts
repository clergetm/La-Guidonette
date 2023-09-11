import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderLineDetailComponent } from './order-line-detail.component';

describe('OrderLine Management Detail Component', () => {
  let comp: OrderLineDetailComponent;
  let fixture: ComponentFixture<OrderLineDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderLineDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ orderLine: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OrderLineDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OrderLineDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load orderLine on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.orderLine).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
