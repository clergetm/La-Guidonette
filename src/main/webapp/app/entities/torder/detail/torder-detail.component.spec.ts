import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorderDetailComponent } from './torder-detail.component';

describe('Torder Management Detail Component', () => {
  let comp: TorderDetailComponent;
  let fixture: ComponentFixture<TorderDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TorderDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ torder: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TorderDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TorderDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load torder on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.torder).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
