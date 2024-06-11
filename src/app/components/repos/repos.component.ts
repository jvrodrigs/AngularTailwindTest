import {Component, OnInit} from '@angular/core';
import {GithubService} from "../../core/services/github.service";
import {ActivatedRoute} from "@angular/router";
import {GitHubViewApi} from "../../core/models/GitHubViewApi.model";
import {GitHubRepositoryApi} from "../../core/models/GitHubRepos.model";

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit{
  activeUsername: string = this.route.snapshot.params['username'];

  user!: GitHubViewApi;
  repositorys!: GitHubRepositoryApi[];

  constructor(
    private route: ActivatedRoute,
    private gitHubService: GithubService
  ) {}

  ngOnInit() {
    this.gitHubService.getInfoByLogin(this.activeUsername).subscribe(res => {
      this.user = res;

      console.log(this.user);
    });

    this.gitHubService.getReposByLogin(this.activeUsername).subscribe(res => {
      this.repositorys = res;
      console.log(this.repositorys);
    })
  }

  handlerVisitGithub(url: string) {
    window.open(url, "_blank")
  }
}
