import { Announcement } from 'src/app/home/announcements/announcements.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { DialogFormInterface } from 'src/app/shared/overlay-layout/dialog-form.interface';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { OverlayLayoutComponent } from 'src/app/shared/overlay-layout/overlay-layout.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import { MatError } from '@angular/material/form-field';
import { UserService } from 'src/services/user.service';
import { RequestAnnouncementDto } from 'src/services/dtos/announcement.dto';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-create-announcment-overlay',
  standalone: true,
  imports: [OverlayLayoutComponent, MatFormField, MatLabel, MatError, MatInput, ReactiveFormsModule],
  templateUrl: './create-announcment-overlay.component.html',
  styleUrl: './create-announcment-overlay.component.css'
})
export class CreateAnnouncmentOverlayComponent implements DialogFormInterface {
  @Output() successfullySubmitted = new EventEmitter<void>();

  formError: Partial<HttpErrorResponse> | null = null;
  loading: boolean = false;

  constructor(private userService: UserService) {}
  announcementForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });



  post(): void {
    this.loading = true;
    this.formError = null;

    const requestAnnouncementDto: RequestAnnouncementDto = {
      id: null,
      date: new Date().toISOString(),
      title: this.announcementForm.value.title,
      message: this.announcementForm.value.message,
      author: {
        id: 1
      }
    };


    this.userService.postAnnouncement(requestAnnouncementDto).subscribe({
      next: _ => {
        this.successfullySubmitted.emit();
        // this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.formError = err;
        this.loading = false;
      }
    });
  }



  close(): void {
    console.log('Closed');
  }
}
