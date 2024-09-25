import {Component, EventEmitter, Output} from '@angular/core';
import {DialogFormInterface} from "../../dialog-form.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {OverlayLayoutComponent} from "../../overlay-layout.component";

/**
 * @component FormFailureComponent
 *
 * This component represents a form dialog that simulates a failed login attempt
 * using the OverlayLayoutComponent. It manages form errors, loading states, and
 * handles form submission.
 *
 * The component listens for the `submit` event from the OverlayLayoutComponent,
 * triggering the `login` method to handle form submissions.
 *
 * @see OverlayLayoutComponent - For details on how the overlay layout component operates.
 */
@Component({
  selector: 'app-form-failure',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    OverlayLayoutComponent,
    ReactiveFormsModule
  ],
  templateUrl: './form-failure.component.html',
  styleUrls: ['./form-failure.component.css']
})
export class FormFailureComponent implements DialogFormInterface {
  formError: Partial<HttpErrorResponse> | null = null; // Stores form error information
  loading: boolean = false; // Indicates loading state

  /**
   * Event emitted when the form is successfully submitted.
   */
  @Output() successfullySubmitted = new EventEmitter<void>();

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * Handles the form submission process.
   * Sets loading state, clears previous errors, and simulates a failed login attempt.
   *
   * @returns {void}
   */
  login(): void {
    this.loading = true; // Set loading state
    this.formError = null; // Clear previous errors

    // Simulate a failed login attempt (replace with actual API call as needed)
    setTimeout(() => {
      this.formError = { message: 'Username or password is incorrect' }; // Set error message
      this.loading = false; // Reset loading state
    }, 1000);

    // Uncomment and implement actual API call as needed:
    /*
    this.apiService.getAnnouncements(1).subscribe({
      next: result => {
        // Handle successful result
        this.successfullySubmitted.emit(); // Trigger dialog to close
      },
      error: err => {
        this.formError = err; // Display error in dialog
        this.loading = false; // Reset loading state for retry
      }
    });
    */
  }

  /**
   * Closes the dialog.
   * This method can be customized for additional logic upon closing.
   *
   * @returns {void}
   */
  close(): void {
    console.log('Closed');
    // Additional close logic can be implemented here if needed
  }
}
