import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Author {
  id: number;
  profile: Profile;
  admin: boolean;
  active: boolean;
  status: string;
}

export interface Announcement {
  id: number;
  date: string;
  title: string;
  message: string;
  author: Author;
}

export interface SimplifiedAnnouncement {
  authorName: string;
  date: string;
  message: string;
}

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, MatCardModule, DatePipe, MatToolbarModule, MatDividerModule, MatButtonModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {
  companyId: number = 1;
  announcements: SimplifiedAnnouncement[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAnnouncements(this.companyId).subscribe({
      next: (data: Announcement[]) => {
        console.log('API Response:', data);
        this.announcements = data.map(announcement => ({
          authorName: announcement.author.profile.firstName,
          date: announcement.date,
          message: announcement.message
        }))
      },
      error: (error) => {
        console.error('Error fetching announcements:', error);
      }
    });
  }
}
