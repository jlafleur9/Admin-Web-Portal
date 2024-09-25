import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogFormInterface} from "../app/shared/overlay-layout/dialog-form.interface";
import {Injectable} from "@angular/core";
import {ComponentType} from "@angular/cdk/overlay";

/**
 * @service DialogService
 *
 * This service provides functionality to manage dialog forms within the application.
 * It allows you to open a dialog and automatically close it when the form is successfully submitted.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  /**
   * @constructor
   * @param {MatDialog} dialog - The Angular Material dialog service used to create and manage dialogs.
   */
  constructor(private dialog: MatDialog) {}

  /**
   * Opens a dialog form.
   *
   * @param {ComponentType<DialogFormInterface>} dialogForm - The component type of the dialog to be opened,
   * @param {any} data - The data to pass to the dialog. Available in the MAT_DIALOG_DATA token.
   * implementing the DialogFormInterface.
   * @returns {void}
   */
  open(dialogForm: ComponentType<DialogFormInterface>, data?: any): void {
    const dialogRef = this.dialog.open(dialogForm, {
      autoFocus: 'dialog',
      maxWidth: '80vw',
      maxHeight: '90vh',
      data
    });

    this.closeDialogWhenSubmitted(dialogRef);
  }

  /**
   * Subscribes to the successfullySubmitted event of the dialog's component instance
   * and closes the dialog when the event is emitted.
   *
   * @param {MatDialogRef<DialogFormInterface>} dialogRef - The reference to the opened dialog.
   * @returns {void}
   */
  private closeDialogWhenSubmitted(dialogRef: MatDialogRef<DialogFormInterface>): void {
    dialogRef.componentInstance.successfullySubmitted.subscribe({
      next: () => dialogRef.close()
    });
  }
}
