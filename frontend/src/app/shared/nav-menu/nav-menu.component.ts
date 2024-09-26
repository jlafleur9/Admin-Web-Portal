import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatActionList, MatListItem} from "@angular/material/list";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {ExtensionAnimation} from "./nav.animations";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  animations: [ExtensionAnimation],
  imports: [
    MatIcon,
    NgOptimizedImage,
    MatToolbar,
    MatActionList,
    MatListItem,
    RouterLinkActive,
    RouterLink,
    MatIconButton,
    MatAnchor,
    MatButton
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  showMenu = false;

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

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
      .catch((_) => {
        window.location.reload(); // last resort. Reload the page and let the guards handle navigation
      });
  }
}
