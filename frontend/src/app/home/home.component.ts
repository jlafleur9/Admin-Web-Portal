import { Component } from '@angular/core';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CommonModule } from '@angular/common';
import {OverlayLayoutComponent} from "../shared/overlay-layout/overlay-layout.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OverlayLayoutComponent, AnnouncementsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
