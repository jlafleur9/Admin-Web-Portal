import { Component } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/services/user.service';
import { ProfileDto } from 'src/services/dtos/profile.dto';
import { DialogService } from 'src/services/dialog.service';
import { CreateAnnouncmentOverlayComponent } from '../create-announcment-overlay/create-announcment-overlay.component';
import { Subscription } from 'rxjs';

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
    MatButtonModule,
    CreateAnnouncmentOverlayComponent
    ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})

export class AnnouncementsComponent {
  companyId: number  | null = null;
  private subscription: Subscription = new Subscription();

  announcements: SimplifiedAnnouncement[] = [];
  showCreateAnnouncmentOverlay = false;


  constructor(
    private userService: UserService,
    private dialogService: DialogService
  ) {}

  get isAdmin() {
    return this.userService.user?.admin;
  }


  toggleOverlay() {
    this.dialogService.open(CreateAnnouncmentOverlayComponent, this.announcements);
  }

  ngOnInit(): void {

      if (this.userService.selectedCompany) {
        this.companyId = this.userService.selectedCompany;
        this.fetchAnnouncements(this.companyId);
      } else {
        console.error('No selected company found');
      }
  }

  private fetchAnnouncements(companyId: number) {

      this.userService.getAnnouncements(companyId).subscribe({
        next: (data: Announcement[]) => {
          this.announcements = data.map(announcement => ({
            authorName: announcement.author.profile.firstName,
            date: announcement.date,
            message: announcement.message
          }))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        },
        error: (error) => {
          console.error('Error fetching announcements:', error);
        }
      });
  }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }

