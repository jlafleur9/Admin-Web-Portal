import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CompanyComponent} from "./company/company.component";
import {TeamsComponent} from "./teams/teams.component";
import {UsersComponent} from "./users/users.component";
// import {LayoutComponent} from "./shared/layout/layout.component";
import {IsNotAuthenticated} from "../routing-guards/is-not-authenticated.guard";
import {IsAuthenticated} from "../routing-guards/is-authenticated.guard";
import {OverlayExampleComponent} from "./shared/overlay-layout/examples/overlay-example/overlay-example.component";
import { AppComponent } from "./app.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [IsNotAuthenticated] },
  { path: "company", component: CompanyComponent },
  { path: "overlay-example", component: OverlayExampleComponent },
  {
    path: "app",
    canActivate: [IsAuthenticated],
    children: [
      { path: "login", component: AppComponent },
      { path: "company", component: AppComponent },
      { path: "home", component: HomeComponent },
      { path: "teams", component: TeamsComponent },
      { path: "users", component: UsersComponent },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  },
  { path: "**", redirectTo: "app/home", pathMatch: "full" }
];
