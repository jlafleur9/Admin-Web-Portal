import {AppComponent} from "./app.component";
import {Routes} from "@angular/router";
import {LayoutComponent} from "./shared/layout/layout.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: "", component: AppComponent },
  {
    path: "app",
    component: LayoutComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "company", component: AppComponent },
      { path: "home", component: AppComponent },
      { path: "teams", component: AppComponent },
      { path: "users", component: AppComponent },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  }
];
