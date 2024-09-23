import {AppComponent} from "./app.component";
import {Routes} from "@angular/router";

export const routes: Routes = [
  { path: "", component: AppComponent },
  {
    path: "app",
    component: AppComponent,
    children: [
      { path: "login", component: AppComponent },
      { path: "company", component: AppComponent },
      { path: "home", component: AppComponent },
      { path: "teams", component: AppComponent },
      { path: "users", component: AppComponent },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  }
];
