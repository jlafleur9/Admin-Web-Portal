import { Component } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/services/UserService';
import { ProfileDto } from 'src/services/dtos/profile.dto';


export interface Author {
  id: number;
  profile: ProfileDto;
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
  imports: [
    CommonModule,
    MatCardModule,
    DatePipe,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule
    ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})

export class AnnouncementsComponent {
  companyIds = this.userService.user?.companies?.map(company => company.id) || [];

  announcements: SimplifiedAnnouncement[] = [];

  constructor(private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    const apiCalls: Observable<Announcement[]>[] = this.companyIds.map(companyId =>
      this.apiService.getAnnouncements(companyId)
    );
    forkJoin(apiCalls).subscribe({
      next: (results: Announcement[][]) => {
        console.log('API Responses:', results);

        this.announcements = results.flat().map(announcement => {
          return {
            authorName: announcement.author.profile.firstName,
            date: announcement.date,
            message: announcement.message
          }
        });
      },
      error: (error) => {
        console.error('Error fetching announcements:', error);
      }
    });

  }
}
