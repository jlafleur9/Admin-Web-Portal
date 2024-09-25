# Overlay Layout Component README

## Overview

The `OverlayLayoutComponent` provides a consistent user interface for form submissions within a dialog, 
allowing for easy management of loading states, error handling, and event emissions. 
This component is designed to be reusable across different forms overlays in our Angular application.

## Usage
### Step 1: Create Your Form Component

Create a form component that implements the `DialogFormInterface`. 
This interface requires you to manage three key properties: `successfullySubmitted`, `formError`, and `loading`.

Here's an example of a form component:

```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogFormInterface } from './dialog-form.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-successful',
  templateUrl: './form-successful.component.html',
})
export class FormSuccessfulComponent implements DialogFormInterface {
  @Output() successfullySubmitted = new EventEmitter<void>();
  
  formError: Partial<HttpErrorResponse> | null = null;
  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    this.loading = true;
    this.formError = null;

    // Simulate form submission
    setTimeout(() => {
      this.successfullySubmitted.emit();
    }, 2000);
  }

  close(): void {
    console.log('Closed');
  }
}
```

### Step 2: Integrate the Overlay Layout Component

Use the `OverlayLayoutComponent` in your form component's template, passing in the necessary properties and handling the events:

```html
<app-overlay-layout
  [formGroup]="loginForm"
  [showLoading]="loading"
  [dialogError]="formError"
  (submit)="login()"
  (close)="close()">
  
  <mat-form-field>
    <mat-label>Username</mat-label>
    <input matInput required formControlName="username" />
    <mat-error>A valid username is required</mat-error>
  </mat-form-field>
  
  <mat-form-field>
    <mat-label>Password</mat-label>
    <input matInput type="password" required formControlName="password" />
    <mat-error>A valid password is required</mat-error>
  </mat-form-field>
</app-overlay-layout>
```

_Note: Do not include the `<form>` tag in your component. The `<form>` tag is managed by the `<app-overlay-layout>` component._

### Step 3: Open the Dialog

Utilize the `DialogService` to open your dialog form. 
Here’s an example that can open different dialogs depending on which method is called.
`DialogService` has an `open` method that can take in any component which implements the `DialogFormInterface`.

```typescript
import { Component } from '@angular/core';
import { DialogService } from './dialog.service';
import { FormSuccessfulComponent } from './form-successful.component';

@Component({
  selector: 'app-overlay-example',
  template: `
    <button mat-flat-button (click)="openSuccessfulDialog()">Open Successful Dialog</button>
    <button mat-flat-button (click)="openFailureDialog()">Open Failure Dialog</button>
  `
})
export class OverlayExampleComponent {
  constructor(private dialogService: DialogService) {}

  openSuccessfulDialog(): void {
    this.dialogService.open(FormSuccessfulComponent);
  }

  openFailureDialog(): void {
    this.dialogService.open(FormFailureComponent);
  }
}
```

### Input Properties

### `formGroup`

- **Type:** `FormGroup`
- **Description:** The Angular form group associated with your dialog.

### `dialogError`

- **Type:** `Partial<HttpErrorResponse> | null`
- **Description:** Holds error information related to the form submission.

### `showLoading`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Indicates whether to show a loading spinner while the form is being submitted.

### `largeOverlay`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Determines if the overlay should be displayed as wide.

## Output Events

### `submit`

- **Emitted when:** The form is submitted.
- **Usage:** Handle form submission logic in your component.

### `close`

- **Emitted when:** The dialog is closed.
- **Usage:** Implement any additional logic needed when closing the dialog.

## Error Handling

To manage errors, set the `dialogError` property with an instance of `HttpErrorResponse` or a partial response.
An `HttpErrorResponse` is the type of error returned by Angular's `HttpClient`. If you're not using Angular's `HttpClient`,
you can still pass in an error message by passing an object with a `message` property with a string value.

The overlay component will automatically display the error message if you give it a value 
(tip: set it to null a user resubmits the form to hide the error message from the last submission!)

## Loading State

Set the `showLoading` property to `true` during form submission to show a loading spinner. 
Ensure you reset it to `false` upon completion or error.

## Example Forms

For a complete implementation of forms using the `OverlayLayoutComponent`, 
see the accompanying `FormSuccessfulComponent` and `FormFailureComponent` implementations.
These forms are opened by `OverlayExampleComponent`.

## Additional Notes

- Ensure all form fields are properly validated using Angular's reactive forms.
- Customize styles as necessary to fit the design of your application.
- Need a bigger overlay size? Pass in `largeOverlay="true"` as an input to your `<app-overlay-layout>` component.


