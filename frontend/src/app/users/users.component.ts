import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserOverlayComponent } from './add-user-overlay/add-user-overlay.component';
import { DialogService } from 'src/services/dialog.service';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { UsersTableComponent } from "./users-table/users-table.component";
import { MatButtonModule } from '@angular/material/button';
import {FullUserDto} from "../../services/dtos/full-user.dto";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AddUserOverlayComponent, NavBarComponent, UsersTableComponent, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  showAddUserOverlay = false;

  users: MatTableDataSource<FullUserDto> | null = null;

  constructor(private dialogService: DialogService) {}

  updateUsers(users: MatTableDataSource<FullUserDto>) {
    this.users = users;
  }

  toggleOverlay() {
    this.dialogService.open(AddUserOverlayComponent, this.users);
  }

}
