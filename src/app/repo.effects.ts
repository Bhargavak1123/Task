import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as RepoActions from './repo.action';
import { ApiService } from './api.service';
import {Repo} from '../_model/repo';

@Injectable()
export class RepoEffects {
  constructor(private apiService: ApiService, private action$: Actions) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(RepoActions.BeginGetRepoAction),
      mergeMap(action =>
        this.apiService.getPublicRepos().pipe(
          map((data: Repo[]) => {
            return RepoActions.SuccessGetRepoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(RepoActions.ErrorRepoAction(error));
          })
        )
      )
    )
  );

}
