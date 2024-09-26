import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot, UrlTree
} from "@angular/router";
import {UserService} from "../services/user.service";
import {Injectable} from "@angular/core";
import {CompanySelectedGuard} from "./company-selected.guard";

@Injectable({
  providedIn: "root"
})
export class IsNotAuthenticatedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private companySelected: CompanySelectedGuard) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return !this.userService.isLoggedIn() ?
      true
      : this.redirect();
  }

  private redirect(): UrlTree {
    return this.companySelected.companySelected() ?
      this.router.createUrlTree(['/app/home'])
      : this.router.createUrlTree(['/company']);
  }
}
