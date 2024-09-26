import { Component } from '@angular/core';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AnnouncementsComponent, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
