import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class CompanySelected implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.companySelected() ?
      true
      : this.router.createUrlTree(['/company']);
  }

  public companySelected(): boolean {
    try {
      this.userService.selectedCompany;
    } catch (error) {
      return false;
    }

    return true;
  }
}
