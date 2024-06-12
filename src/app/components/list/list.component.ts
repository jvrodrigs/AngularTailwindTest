import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {GitHubApiModel} from "../../core/models/GitHubApi.model";
import {GithubService} from "../../core/services/github.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  searchControl = new FormControl("");
  itemsPerPageControl = new FormControl(10);
  data!: GitHubApiModel[];

  constructor(
    private gitHubService: GithubService,
    private router: Router
  ) {}

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
    this.router.navigate([`/repo/${user}`]);
  }
}
