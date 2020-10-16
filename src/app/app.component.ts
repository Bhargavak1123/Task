import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { first } from 'rxjs/operators';
import { Repo } from '../_model/repo';
import { Contributor } from '../_model/contributor';
import { MatAccordion } from '@angular/material/expansion';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as RepoActions from './repo.action';
import RepoState from './repo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  title = 'demo';
  respoList: Repo[] = [];
  contributorList: Contributor[] = [];
  rowData: any;
  loading: boolean;
  x = [];
  columnDefs = [
    { headerName: "Contributors", field: 'login', sortable: true, width:'200px'},
  ];
  favRepoList: {id:number,full_name: string , url:string}[] = [];
  repo$: Observable<RepoState>;
  RepoSubscription: Subscription;
  repoError: Error = null;


  constructor(
    private api: ApiService,
    private store: Store<{ repos: RepoState }>
  ) {
    this.repo$ = store.pipe(select('repos'));
  }

  ngOnInit() {
    this.getRepositerios();
  }
  getRepositerios() {
    this.loading = true;
    this.RepoSubscription = this.repo$
      .pipe(
        map(x => {
          this.respoList = x.Repos;
          this.repoError = x.RepoError;
        })
      )
      .subscribe();
      this.loading = false;
    this.store.dispatch(RepoActions.BeginGetRepoAction());
  }

  getContributors(contributors_url: string) {
    this.rowData = [];
    this.api.getRepoContributors(contributors_url).pipe(first())
      .subscribe(
        resp => {
          if (resp) {
            this.rowData = resp;
            console.log(this.rowData);
          }
        },
        );
  }

  addToFav(repo: Repo) {
  this.favRepoList.push({id:repo.id,full_name: repo.full_name , url:repo.url});
    console.log(this.favRepoList)
    alert('Added Successfull to Fav List')
  }



  ngOnDestroy() {
    if (this.RepoSubscription) {
      this.RepoSubscription.unsubscribe();
      
    }
  }



}
