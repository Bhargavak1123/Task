import { createAction, props } from '@ngrx/store';
import {Repo} from '../_model/repo';

export const GetRepoAction = createAction('[Repo] - Get Repo');

export const BeginGetRepoAction = createAction('[Repo] - Begin Get Repo');

export const SuccessGetRepoAction = createAction(
  '[Repo] - Sucess Get Repo',
  props<{ payload: Repo[] }>()
);



export const ErrorRepoAction = createAction('[Repo] - Error', props<Error>());
