import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CompanyComponent} from "./company/company.component";
import {TeamsComponent} from "./teams/teams.component";
import {UsersComponent} from "./users/users.component";
import {LayoutComponent} from "./shared/layout/layout.component";
import {IsNotAuthenticated} from "../routing-guards/is-not-authenticated.guard";
import {IsAuthenticated} from "../routing-guards/is-authenticated.guard";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [IsNotAuthenticated] },
  { path: "company", component: CompanyComponent },
  {
    path: "app",
    component: LayoutComponent,
    canActivate: [IsAuthenticated],
    children: [
      { path: "home", component: HomeComponent },
      { path: "teams", component: TeamsComponent },
      { path: "users", component: UsersComponent },
    ]
  },
  { path: "**", redirectTo: "app/home", pathMatch: "full" }
];
