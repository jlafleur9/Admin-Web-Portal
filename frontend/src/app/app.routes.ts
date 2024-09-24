import {AppComponent} from "./app.component";
import {Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {IsNotAuthenticated} from "../routingGuards/is-not-authenticated.guard";
import {IsAuthenticated} from "../routingGuards/is-authenticated.guard";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [IsNotAuthenticated] },
  {
    path: "app",
    component: AppComponent,
    canActivate: [IsAuthenticated],
    children: [
      { path: "company", component: AppComponent },
      { path: "home", component: HomeComponent },
      { path: "teams", component: AppComponent },
      { path: "users", component: AppComponent },
    ]
  },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];
