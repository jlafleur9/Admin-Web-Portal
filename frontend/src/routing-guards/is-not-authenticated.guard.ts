import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {UserService} from "../services/user.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class IsNotAuthenticated implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return !this.userService.isLoggedIn() ?
      true
      : this.router.createUrlTree(['/app/home']);
  }
}
