import {Component, OnInit} from '@angular/core';
import {GithubService} from "./core/services/github.service";
import {GitHubApiModel} from "./core/models/GitHubApi.model";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TailwindCSS + Angular 15';

  searchControl = new FormControl("");
  itemsPerPageControl = new FormControl(10);
  data!: GitHubApiModel[];

  constructor(private gitHubService: GithubService) {}

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      if (this.searchControl.value != "") {
        this.loadData();
      }

      this.data = [];
    });

    this.itemsPerPageControl.valueChanges.pipe(
      // Emite apenas se o valor for diferente do anterior
      distinctUntilChanged()
    ).subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    const filter = this.searchControl.value;
    const itemsPerPage = this.itemsPerPageControl.value;

    this.gitHubService.getSearchUsers(filter, 1, itemsPerPage).subscribe(res => {
      this.data = res.items;
    })
  }

  handlerClickBurguerBtn() {
    console.log("Tap Brother!");
  }

  handlerClickCard(user: string) {
    console.log(`Get Info User: ${user}..`);
    this.gitHubService.getInfoByLogin(user).subscribe(res => {
      console.log(res);
    });

    this.gitHubService.getReposByLogin(user).subscribe(res => {
      console.log(res);
    })
  }
}
