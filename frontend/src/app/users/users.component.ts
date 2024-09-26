import { Component } from '@angular/core';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { UsersTableComponent } from "./users-table/users-table.component";
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavBarComponent, UsersTableComponent, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
