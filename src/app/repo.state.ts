import {Repo} from '../_model/repo';

export default class RepoState {
  Repos: Array<Repo>;
  RepoError: Error;
}

export const initializeState = (): RepoState => {
  return { Repos: Array<Repo>(), RepoError: null };
};
