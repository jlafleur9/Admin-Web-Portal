import { Component } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {RouterOutlet} from "@angular/router";
import {NavMenuComponent} from "../nav-menu/nav-menu.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet,
    NavMenuComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
