import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Repo } from '../_model/repo';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  favRepoList: { name: string, full_name: string }[] = [];

  private _favRepoList$ = new BehaviorSubject(this.favRepoList);
  
  favRepoList$= this._favRepoList$.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getPublicRepos(): Observable<any> {
    return this.http.get('https://api.github.com/repositories');
  }

  getRepoContributors(contributors_url: string): Observable<any> {
    console.log('In contributors_url..' + contributors_url)
    return this.http.get(contributors_url);
  }
}
