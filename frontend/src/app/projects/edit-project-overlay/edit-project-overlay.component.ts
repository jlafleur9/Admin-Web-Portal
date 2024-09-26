import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { OverlayLayoutComponent } from 'src/app/shared/overlay-layout/overlay-layout.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogFormInterface } from 'src/app/shared/overlay-layout/dialog-form.interface';
import { ProjectService } from 'src/services/project.service';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CompanyService } from 'src/services/CompanyService';
import { Inject } from '@angular/core';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ProjectWrapper} from "../project-segment/project-segment.component";


@Component({
  selector: 'app-edit-project-overlay',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    OverlayLayoutComponent,
    ReactiveFormsModule, MatOption, MatSelect
  ],
  templateUrl: './edit-project-overlay.component.html',
  styleUrl: './edit-project-overlay.component.css'
})
export class EditProjectOverlayComponent implements DialogFormInterface, OnInit{
  @Output() successfullySubmitted = new EventEmitter<void>();

  formError: Partial<HttpErrorResponse> | null = null;
  loading: boolean = false;

  editProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    active: new FormControl()
  });

  constructor(private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) private projectWrapper: ProjectWrapper){}

  ngOnInit(): void{
    this.editProjectForm.patchValue({
      name: this.projectWrapper.project.name,
      description: this.projectWrapper.project.description,
    });
  }

  editProject(): void{
    this.loading = true;
    this.formError = null;

    this.projectService.editProjects(this.projectWrapper.project.id!, this.editProjectForm.value).subscribe({
      next: result => {
        this.projectWrapper.project = result;
        this.successfullySubmitted.emit()
      },
      error: error => {
        this.formError = {message: 'There was a server error. Try again later.'};
        this.loading = false;
      }
    })}

  close(): void {
    console.log('Closed');
  }
}
