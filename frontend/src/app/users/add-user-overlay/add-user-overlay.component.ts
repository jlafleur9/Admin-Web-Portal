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
import { UserService } from 'src/services/user.service';

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
    password: new FormControl("", [Validators.required]),
    confirmPass: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    admin: new FormControl(false, [Validators.required]),
  });
  submitDisabled = this.newUserForm.get("password") !== this.newUserForm.get("confirmPass")
  @Output() closeOverlay = new EventEmitter<void>();

  constructor(private http: HttpClient, private userService: UserService) {}
  successfullySubmitted: EventEmitter<void> = new EventEmitter<void>;
  formError: Partial<HttpErrorResponse> | null = null;
  loading: boolean = false;

  close() {
    this.closeOverlay.emit();
  }

  submitForm() {
    if (this.newUserForm.invalid || this.newUserForm.get("password")?.value !== this.newUserForm.get("confirmPass")?.value) {
      this.formError = { message: 'Passwords do not match!' };
      return;
    }
    this.formError = null;
    this.loading = true;

    const companyId = 1; // Replace with actual company ID
    const url = `http://localhost:8080/company/${companyId}/users`;

    const userRequestDto = {
      credentials: {
        username: (this.newUserForm.get("firstName")?.value ??"") + (this.newUserForm.get("lastName")?.value ??""),
        password: this.newUserForm.get("password")?.value
      },
      profile: {
        firstName: this.newUserForm.get("firstName")?.value,
        lastName: this.newUserForm.get("lastName")?.value,
        email: this.newUserForm.get("email")?.value,
        phone: this.newUserForm.get("phone")?.value
      },
      admin: this.newUserForm.get("admin")?.value
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