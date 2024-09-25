import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserOverlayComponent } from './add-user-overlay/add-user-overlay.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AddUserOverlayComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  showAddUserOverlay = false;

  toggleOverlay() {
    this.showAddUserOverlay = !this.showAddUserOverlay;
  }

}
