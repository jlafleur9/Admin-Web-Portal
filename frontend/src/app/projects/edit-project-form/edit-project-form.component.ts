import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { OverlayLayoutComponent } from 'src/app/shared/overlay-layout/overlay-layout.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogFormInterface } from 'src/app/shared/overlay-layout/dialog-form.interface';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-edit-project-form',
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
  templateUrl: './edit-project-form.component.html',
  styleUrl: './edit-project-form.component.css'
})
export class EditProjectFormComponent implements DialogFormInterface{
  @Output() successfullySubmitted = new EventEmitter<void>();

  formError: Partial<HttpErrorResponse> | null = null;
  loading: boolean = false;

  projectId = 1

  createProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    active: new FormControl("")
  });

  constructor(private projectService: ProjectService){}

  editProject(): void{
    this.loading = true;
    this.formError = null;

    this.projectService.editProjects(this.projectId, this.createProjectForm.value).subscribe({
      next: result => {
        this.successfullySubmitted.emit()
      },
      error: error => {
        this.formError = {};
        this.loading = false; 
      }
    })}

  close(): void {
    console.log('Closed');
  }
}
