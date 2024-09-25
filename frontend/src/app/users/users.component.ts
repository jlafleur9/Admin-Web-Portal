import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserOverlayComponent } from './add-user-overlay/add-user-overlay.component';
import { DialogService } from 'src/services/dialog.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AddUserOverlayComponent],
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
