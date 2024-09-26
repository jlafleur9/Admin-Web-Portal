import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MatToolbar,
    MatAnchor,
    RouterLink,
    MatButton,
    NgOptimizedImage
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isAdmin() {
    return this.userService.user?.admin;
  }

  get hasActorText() {
    return this.userService.user?.admin || this.userService.user?.profile.firstName;
  }

  get actorText() {
    if (this.isAdmin) {
      return 'ACTING AS ADMIN';
    }

    const firstName = this.userService.user?.profile.firstName;
    const lastName = this.userService.user?.profile.lastName;

    if (!firstName) return;
    else if (!lastName) return firstName;
    else {
      const lastNamePrefix = this.userService.user?.profile.lastName[0];
      return `${firstName} ${lastNamePrefix}.`;
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
      .catch((_) => {
        window.location.reload(); // last resort. Reload the page and let the guards handle navigation
      });
  }
}
