import {AppComponent} from "./app.component";
import {Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: "", component: AppComponent },
  {
    path: "app",
    component: AppComponent,
    children: [
      { path: "login", component: AppComponent },
      { path: "company", component: AppComponent },
      { path: "home", component: HomeComponent },
      { path: "teams", component: AppComponent },
      { path: "users", component: AppComponent },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  }
];
