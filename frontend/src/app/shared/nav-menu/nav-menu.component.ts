import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatActionList, MatListItem} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {ExtensionAnimation} from "./nav.animations";

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

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
