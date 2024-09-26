import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import { MatIcon } from '@angular/material/icon';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-project-overlay',
  standalone: true,
  imports: [
    MatError,
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
    NgClass,
    CommonModule
  ],
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent {

  

  @Output() submit = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Input() formGroup!: FormGroup;
  @Input() dialogError: Partial<HttpErrorResponse> | null = null;
  @Input() showLoading: boolean = false;
  @Input({ transform: booleanAttribute }) largeOverlay: boolean = false;
  @Input({ transform: booleanAttribute }) submitDisabled: boolean = false;

  constructor(){}

  onSubmit(){ 
    if (this.formGroup.invalid) {
      return;
    }
    console.log("submission")
    this.showLoading = true;
    this.submit.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  isFormValid(): boolean {
    return !this.isFormInvalid();
  }

  isFormInvalid(): boolean {
    return this.formGroup.invalid || this.submitDisabled
  }
}
