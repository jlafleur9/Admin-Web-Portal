import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {OverlayLayoutComponent} from "../../overlay-layout.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../../../services/api.service";
import {DialogFormInterface} from "../../dialog-form.interface";

/**
 * @component FormSuccessfulComponent
 *
 * This component represents a form dialog that utilizes the OverlayLayoutComponent.
 *
 * It manages the fields `successfullySubmitted`, `formError`, and `loading`, which are passed to
 * the `<app-overlay-layout>` component. This is highly recommended, as the overlay component will
 * automatically react to these changes.
 *
 * The component listens for outputs from the OverlayLayoutComponent, specifically the `submit`
 * event, which is linked to the `login` method for handling form submissions. You can also
 * listen for the `close` event, which is triggered when the dialog is closed.
 *
 * @see OverlayLayoutComponent - For details on how the overlay layout component operates.
 */
@Component({
  selector: 'app-form-successful',
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
  templateUrl: './form-successful.component.html',
  styleUrls: ['./form-successful.component.css']
})
export class FormSuccessfulComponent implements DialogFormInterface {
  /**
   * Event emitted when the form is successfully submitted.
   */
  @Output() successfullySubmitted = new EventEmitter<void>();

  formError: Partial<HttpErrorResponse> | null = null; // Pass to overlay layout
  loading: boolean = false; // Pass to overlay layout

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * @constructor
   * @param {ApiService} apiService - The service used to handle API requests.
   */
  constructor(private apiService: ApiService) {}

  /**
   * Handles the form submission process.
   * Sets loading state and manages form error handling.
   * Emits the `successfullySubmitted` event upon successful submission.
   *
   * @returns {void}
   */
  login(): void {
    this.loading = true; // Set loading state
    this.formError = null; // Clear previous errors

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      this.successfullySubmitted.emit(); // Trigger dialog to close
    }, 2000);

    // Uncomment and implement an actual API call as needed:
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
