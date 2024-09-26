import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserOverlayComponent } from './add-user-overlay/add-user-overlay.component';
import { DialogService } from 'src/services/dialog.service';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { UsersTableComponent } from "./users-table/users-table.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AddUserOverlayComponent, NavBarComponent, UsersTableComponent, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  showAddUserOverlay = false;

  constructor(private dialogService: DialogService) {}

  toggleOverlay() {
    this.dialogService.open(AddUserOverlayComponent);
  }

}
