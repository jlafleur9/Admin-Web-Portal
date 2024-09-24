import {AppComponent} from "./app.component";
import {Routes} from "@angular/router";
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
      { path: "home", component: AppComponent },
      { path: "teams", component: AppComponent },
      { path: "users", component: AppComponent },
    ]
  },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];
