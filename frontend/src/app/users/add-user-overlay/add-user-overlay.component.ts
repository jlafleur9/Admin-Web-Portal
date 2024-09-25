import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-overlay',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-user-overlay.component.html',
  styleUrl: './add-user-overlay.component.css', 
})
export class AddUserOverlayComponent {
  @Output() closeOverlay = new EventEmitter<void>();

  user: any = {
    credentials: {
      username: '',
      password: ''
    },
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    admin: false
  };

  constructor(private http: HttpClient) {}

  close() {
    this.closeOverlay.emit();
  }

  submitForm(form: any) {
    if (form.invalid || this.user.credentials.password !== this.user.confirmPassword) {
      return;  // Exit if the form is invalid or passwords don't match
    }

    const companyId = 1; // Replace with actual company ID
    const url = `http://localhost:8080/company/${companyId}/users`;

    // Prepare the data in the required structure
    const userRequestDto = {
      credentials: {
        username: this.user.profile.email,  // Use email as username
        password: this.user.credentials.password
      },
      profile: {
        firstName: this.user.profile.firstName,
        lastName: this.user.profile.lastName,
        email: this.user.profile.email,
        phone: this.user.profile.phone
      },
      admin: this.user.admin === 'yes'  // Convert string to boolean
    };

    // Make the HTTP POST request
    this.http.post(url, userRequestDto).subscribe({
      next: (response) => {
        console.log('User added successfully:', response);
        this.close(); // Close the overlay on success
      },
      error: (err) => {
        console.error('Error adding user:', err);
      },
    });
  }
}