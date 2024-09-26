import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { OverlayLayoutComponent } from 'src/app/shared/overlay-layout/overlay-layout.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogFormInterface } from 'src/app/shared/overlay-layout/dialog-form.interface';
import { CompanyService } from 'src/services/CompanyService';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Inject } from '@angular/core';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-project-overlay',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    OverlayLayoutComponent,
    ReactiveFormsModule,
    CreateProjectOverlayComponent
  ],
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent implements DialogFormInterface{
  @Output() successfullySubmitted = new EventEmitter<void>();

  formError: Partial<HttpErrorResponse> | null = null;
  loading: boolean = false;

  //companyId!: number
  //teamId!: number

  companyId= 1
  teamId = 1

  createProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    active: new FormControl("")
  });

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private userService: UserService,  @Inject(MAT_DIALOG_DATA) private projects: ProjectDto[]){}

  createProject(){
    this.loading = true;
    this.formError = null;

    //this.companyId = this.userService.selectedCompany

    this.companyService.createProject(this.companyId, this.teamId, this.createProjectForm.value).subscribe({
      next: result => {
        this.projects.push(result)
        this.projects.sort((a, b) => b.id - a.id)
        this.successfullySubmitted.emit()
      },
      error: error => {
        this.formError = error
        this.loading = false
      }
    }
  )}

  close(): void {
    console.log('Closed');
  }
}
