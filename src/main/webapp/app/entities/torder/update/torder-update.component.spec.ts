import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TorderFormService } from './torder-form.service';
import { TorderService } from '../service/torder.service';
import { ITorder } from '../torder.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { TorderUpdateComponent } from './torder-update.component';

describe('Torder Management Update Component', () => {
  let comp: TorderUpdateComponent;
  let fixture: ComponentFixture<TorderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let torderFormService: TorderFormService;
  let torderService: TorderService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TorderUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TorderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TorderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    torderFormService = TestBed.inject(TorderFormService);
    torderService = TestBed.inject(TorderService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const torder: ITorder = { id: 456 };
      const userID: IUser = { id: 48769 };
      torder.userID = userID;

      const userCollection: IUser[] = [{ id: 36259 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [userID];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ torder });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const torder: ITorder = { id: 456 };
      const userID: IUser = { id: 55421 };
      torder.userID = userID;

      activatedRoute.data = of({ torder });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(userID);
      expect(comp.torder).toEqual(torder);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITorder>>();
      const torder = { id: 123 };
      jest.spyOn(torderFormService, 'getTorder').mockReturnValue(torder);
      jest.spyOn(torderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ torder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: torder }));
      saveSubject.complete();

      // THEN
      expect(torderFormService.getTorder).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(torderService.update).toHaveBeenCalledWith(expect.objectContaining(torder));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITorder>>();
      const torder = { id: 123 };
      jest.spyOn(torderFormService, 'getTorder').mockReturnValue({ id: null });
      jest.spyOn(torderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ torder: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: torder }));
      saveSubject.complete();

      // THEN
      expect(torderFormService.getTorder).toHaveBeenCalled();
      expect(torderService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITorder>>();
      const torder = { id: 123 };
      jest.spyOn(torderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ torder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(torderService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
