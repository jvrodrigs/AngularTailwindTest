import {Component, OnInit} from '@angular/core';
import {GithubService} from "../../core/services/github.service";
import {ActivatedRoute} from "@angular/router";
import {GitHubViewApi} from "../../core/models/GitHubViewApi.model";
import {GitHubRepositoryApi} from "../../core/models/GitHubRepos.model";
import {delay, Observable, of} from "rxjs";

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit{
  activeUsername: string = this.route.snapshot.params['username'];

  user!: GitHubViewApi;
  repositorys!: GitHubRepositoryApi[];

  user$: Observable<GitHubViewApi> = new Observable<GitHubViewApi>();
  repositorys$: Observable<GitHubRepositoryApi[]> = new Observable<GitHubRepositoryApi[]>();

  userObservableDealy$ = of(1).pipe(delay(2000));

  constructor(
    private route: ActivatedRoute,
    private gitHubService: GithubService
  ) {}

  ngOnInit() {
    this.user$ = this.gitHubService.getInfoByLogin(this.activeUsername);

    this.repositorys$ = this.gitHubService.getReposByLogin(this.activeUsername);
  }

  handlerVisitGithub(url: string) {
    window.open(url, "_blank")
  }
}
