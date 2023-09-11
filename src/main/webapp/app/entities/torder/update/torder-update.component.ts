import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TorderFormService, TorderFormGroup } from './torder-form.service';
import { ITorder } from '../torder.model';
import { TorderService } from '../service/torder.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { Status } from 'app/entities/enumerations/status.model';

@Component({
  selector: 'jhi-torder-update',
  templateUrl: './torder-update.component.html',
})
export class TorderUpdateComponent implements OnInit {
  isSaving = false;
  torder: ITorder | null = null;
  statusValues = Object.keys(Status);

  usersSharedCollection: IUser[] = [];

  editForm: TorderFormGroup = this.torderFormService.createTorderFormGroup();

  constructor(
    protected torderService: TorderService,
    protected torderFormService: TorderFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ torder }) => {
      this.torder = torder;
      if (torder) {
        this.updateForm(torder);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const torder = this.torderFormService.getTorder(this.editForm);
    if (torder.id !== null) {
      this.subscribeToSaveResponse(this.torderService.update(torder));
    } else {
      this.subscribeToSaveResponse(this.torderService.create(torder));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITorder>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(torder: ITorder): void {
    this.torder = torder;
    this.torderFormService.resetForm(this.editForm, torder);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, torder.userID);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.torder?.userID)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
