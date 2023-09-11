import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OrderLineService } from '../service/order-line.service';

import { OrderLineComponent } from './order-line.component';

describe('OrderLine Management Component', () => {
  let comp: OrderLineComponent;
  let fixture: ComponentFixture<OrderLineComponent>;
  let service: OrderLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'order-line', component: OrderLineComponent }]), HttpClientTestingModule],
      declarations: [OrderLineComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(OrderLineComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OrderLineComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OrderLineService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.orderLines?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to orderLineService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOrderLineIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOrderLineIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
