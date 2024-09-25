import {EventEmitter} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";

/**
 * @interface DialogFormInterface
 *
 * This interface defines the required structure for every dialog form.
 * Implementing components must manage the following fields and pass them
 * to the OverlayLayoutComponent. The overlay component will automatically
 * update its state based on these fields.
 */
export interface DialogFormInterface {
  /**
   * Event emitted when the form is successfully submitted.
   */
  successfullySubmitted: EventEmitter<void>;

  /**
   * Stores error information related to the form submission.
   * It can be null or contain a partial HttpErrorResponse.
   */
  formError: Partial<HttpErrorResponse> | null;

  /**
   * Indicates whether the form is currently in a loading state.
   */
  loading: boolean;

  /**
   * Flag to disable the form's submit button
   */
  submitDisabled?: boolean;
}
