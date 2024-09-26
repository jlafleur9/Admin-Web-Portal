import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CompanyComponent} from "./company/company.component";
import {TeamsComponent} from "./teams/teams.component";
import {UsersComponent} from "./users/users.component";
import {IsNotAuthenticated} from "../routing-guards/is-not-authenticated.guard";
import {IsAuthenticated} from "../routing-guards/is-authenticated.guard";
import { ProjectsComponent } from "./projects/projects.component";
import {OverlayExampleComponent} from "./shared/overlay-layout/examples/overlay-example/overlay-example.component";
import {LayoutComponent} from "./shared/layout/layout.component";
import {CompanySelected} from "../routing-guards/company-selected";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [IsNotAuthenticated] },
  { path: "company", component: CompanyComponent, canActivate: [IsAuthenticated] },
  { path: "overlay-example", component: OverlayExampleComponent },
  {
    path: "app",
    component: LayoutComponent,
    canActivate: [IsAuthenticated, CompanySelected],
    children: [
      { path: "home", component: HomeComponent },
      { path: "teams", component: TeamsComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "users", component: UsersComponent },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  },
  { path: "**", redirectTo: "app/home", pathMatch: "full" }
];
