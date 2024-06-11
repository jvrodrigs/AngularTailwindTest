import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {GitHubApiModel, RootGitHubSearch} from "../models/GitHubApi.model";
import {GitHubViewApi} from "../models/GitHubViewApi.model";
import {GitHubRepositoryApi} from "../models/GitHubRepos.model";

let FIX_URL="https://api.github.com/";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getList(since: number = 1, page: number | null = 10): Observable<GitHubApiModel[]> {
    let params = new HttpParams();

    if (since) {
      params = params.append('since', since.toString());
    }
    if (page) {
      params = params.append('per_page', page.toString());
    }

    console.log(params);
    return this.http.get<GitHubApiModel[]>(`${FIX_URL}users`, { params });
  }

  getSearchUsers(filter: string | null = '', since: number = 1, page: number | null = 10): Observable<RootGitHubSearch> {
    let params = new HttpParams();

    if (filter) {
      params = params.append('q', filter);
    }

    if (since) {
      params = params.append('since', since.toString());
    }

    if (page) {
      params = params.append('per_page', page.toString());
    }

    return this.http.get<RootGitHubSearch>(`${FIX_URL}search/users`, { params });
  }

  getInfoByLogin(login: string): Observable<GitHubViewApi> {
    return this.http.get<GitHubViewApi>(`${FIX_URL}users/${login}`);
  }

  getReposByLogin(login: string): Observable<GitHubRepositoryApi[]> {
    return this.http.get<GitHubRepositoryApi[]>(`${FIX_URL}users/${login}/repos`);
  }
}
