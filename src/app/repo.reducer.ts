import { Action, createReducer, on } from '@ngrx/store';
import * as RepoActions from './repo.action';
import { Repo } from '../_model/repo';
import RepoState, { initializeState } from './repo.state';

const initialState = initializeState();

const reducer = createReducer(
    initialState,
    on(RepoActions.GetRepoAction, state => state),

    on(RepoActions.SuccessGetRepoAction, (state: RepoState, { payload }) => {
        return { ...state, Repos: payload, RepoError: null };
    }),

    on(RepoActions.ErrorRepoAction, (state: RepoState, error: Error) => {
        // remove below line and use different telemetry logging
        console.error(error);
        return { ...state, RepoError: error };
    })
);

export function RepoReducer(
    state: RepoState | undefined,
    action: Action
): RepoState {
    return reducer(state, action);
}
