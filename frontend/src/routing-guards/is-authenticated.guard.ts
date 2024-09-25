import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class IsAuthenticated implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.userService.isLoggedIn() ?
      true
      : this.router.createUrlTree(['/login'])
  }
}
