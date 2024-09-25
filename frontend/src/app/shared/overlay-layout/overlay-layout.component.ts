import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {HttpErrorResponse} from "@angular/common/http";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgClass} from "@angular/common";

/**
 * @component OverlayLayoutComponent
 *
 * This component serves as a layout for dialogs, providing a consistent UI for form submissions
 * and error handling. It emits events for submission and closure, and manages loading states.
 */
@Component({
  selector: 'app-overlay-layout',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgClass
  ],
  templateUrl: './overlay-layout.component.html',
  styleUrls: ['./overlay-layout.component.css']
})
export class OverlayLayoutComponent {
  /**
   * Event emitted when the form is submitted.
   */
  @Output() submit = new EventEmitter<void>();

  /**
   * Event emitted when the dialog is closed.
   */
  @Output() close = new EventEmitter<void>();

  /**
   * The form group associated with the dialog.
   */
  @Input() formGroup!: FormGroup;

  /**
   * Stores error information related to the dialog.
   * It can be null or contain a partial HttpErrorResponse.
   */
  @Input() dialogError: Partial<HttpErrorResponse> | null = null;

  /**
   * Indicates whether to show a loading spinner.
   */
  @Input() showLoading: boolean = false;

  /**
   * Determines whether the overlay should be displayed as wide.
   * This input uses a transform function for boolean values.
   */
  @Input({ transform: booleanAttribute }) largeOverlay: boolean = false;

  /**
   * Determines whether the submit button is disabled
   */
  @Input({ transform: booleanAttribute }) submitDisabled: boolean = false;

  /**
   * Handles the form submission process.
   * Emits the submit event if the form is valid and shows a loading state.
   *
   * @returns {void}
   */
  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.showLoading = true;
    this.submit.emit();
  }

  /**
   * Closes the dialog and emits the close event.
   *
   * @returns {void}
   */
  onClose(): void {
    this.close.emit();
  }
}
