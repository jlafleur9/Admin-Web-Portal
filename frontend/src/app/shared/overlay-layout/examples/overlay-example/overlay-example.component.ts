import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormSuccessfulComponent} from "../form-successful/form-successful.component";
import {FormFailureComponent} from "../form-failure/form-failure.component";
import {DialogService} from "../../../../../services/dialog.service";

/**
 * @component OverlayExampleComponent
 *
 * This component demonstrates how to use the dialog service to open dialogs.
 * It provides two examples:
 * 1. A dialog that successfully submits a form and closes upon completion.
 * 2. A dialog that simulates a submission failure, displaying an error message while remaining open.
 *
 * Both examples also show a loading state during the form submission process.
 *
 * @see FormSuccessfulComponent - For the dialog that shows a successful form submission.
 * @see FormFailureComponent - For the dialog that simulates a form submission failure.
 */
@Component({
  selector: 'app-overlay-example',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './overlay-example.component.html',
  styleUrls: ['./overlay-example.component.css']
})
export class OverlayExampleComponent {
  /**
   * @constructor
   * @param {DialogService} dialogService - The dialog service used to manage dialog instances.
   */
  constructor(private dialogService: DialogService) {}

  /**
   * Opens a dialog that demonstrates a successful form submission.
   * @returns {void}
   */
  openSuccessfulDialog(): void {
    this.dialogService.open(FormSuccessfulComponent);
  }

  /**
   * Opens a dialog that simulates a form submission failure.
   * @returns {void}
   */
  openFailureDialog(): void {
    this.dialogService.open(FormFailureComponent);
  }
}
