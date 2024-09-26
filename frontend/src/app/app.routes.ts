import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CompanyComponent} from "./company/company.component";
import {TeamsComponent} from "./teams/teams.component";
import {UsersComponent} from "./users/users.component";
import {IsNotAuthenticatedGuard} from "../routing-guards/is-not-authenticated.guard";
import {IsAuthenticatedGuard} from "../routing-guards/is-authenticated.guard";
import { ProjectsComponent } from "./projects/projects.component";
import {OverlayExampleComponent} from "./shared/overlay-layout/examples/overlay-example/overlay-example.component";
import {LayoutComponent} from "./shared/layout/layout.component";
import {CompanySelectedGuard} from "../routing-guards/company-selected.guard";
import {IsAdminGuard} from "../routing-guards/is-admin.guard";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [IsNotAuthenticatedGuard] },
  { path: "company", component: CompanyComponent, canActivate: [IsAuthenticatedGuard, IsAdminGuard] },
  { path: "overlay-example", component: OverlayExampleComponent },
  {
    path: "app",
    component: LayoutComponent,
    canActivate: [IsAuthenticatedGuard, CompanySelectedGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "teams", component: TeamsComponent },
      { path: "projects/:id", component: ProjectsComponent },
      { path: "users", component: UsersComponent, canActivate: [IsAdminGuard] },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  },
  { path: "**", redirectTo: "app/home", pathMatch: "full" }
];
