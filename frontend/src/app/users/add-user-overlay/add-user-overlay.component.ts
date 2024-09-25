import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogFormInterface } from 'src/app/shared/overlay-layout/dialog-form.interface';
import { OverlayLayoutComponent } from "../../shared/overlay-layout/overlay-layout.component";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { MatOptgroup, MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-user-overlay',
  standalone: true,
  imports: [FormsModule, 
    CommonModule, 
    OverlayLayoutComponent, 
    MatFormField, 
    MatInput,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './add-user-overlay.component.html',
  styleUrl: './add-user-overlay.component.css', 
})
export class AddUserOverlayComponent implements DialogFormInterface{
  newUserForm: FormGroup = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirmPass: new FormControl("", [Validators.required]),
    fistName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    admin: new FormControl(false, [Validators.required]),
  });
  submitDisabled = this.newUserForm.get("password") !== this.newUserForm.get("confirmPass")
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
  successfullySubmitted: EventEmitter<void> = new EventEmitter<void>;
  formError: Partial<HttpErrorResponse> | null = null;
  loading: boolean = false;

  close() {
    this.closeOverlay.emit();
  }

  submitForm() {
    if (this.newUserForm.invalid || this.user.credentials.password !== this.user.confirmPassword) {
      return;  // Exit if the form is invalid or passwords don't match
    }
    this.formError = null;
    this.loading = true;

    const companyId = 1; // Replace with actual company ID
    const url = `http://localhost:8080/company/${companyId}/users`;

    const userRequestDto = {
      credentials: {
        username: this.newUserForm.get("userName"),
        password: this.newUserForm.get("password")
      },
      profile: {
        firstName: this.newUserForm.get("firstName"),
        lastName: this.newUserForm.get("lastName"),
        email: this.newUserForm.get("email"),
        phone: this.newUserForm.get("phone")
      },
      admin: this.newUserForm.get("admin")  
    };

    // Make the HTTP POST request
    this.http.post(url, userRequestDto).subscribe({
      next: (response) => {
        console.log('User added successfully:', response);
        this.successfullySubmitted.emit();
      },
      error: (err) => {
        this.formError = err;
        this.loading = false;
        console.error('Error adding user:', err);
      },
    });
  }
}