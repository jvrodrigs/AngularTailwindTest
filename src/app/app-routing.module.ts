import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {ReposComponent} from "./components/repos/repos.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "repo/:username",
    component: ReposComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
