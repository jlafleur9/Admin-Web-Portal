import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { OverlayLayoutComponent } from 'src/app/shared/overlay-layout/overlay-layout.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogFormInterface } from 'src/app/shared/overlay-layout/dialog-form.interface';
import { CompanyService } from 'src/services/CompanyService';
import { CreateProjectOverlayComponent } from "../create-project-overlay/create-project-overlay.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-project-form',
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
  templateUrl: './create-project-form.component.html',
  styleUrl: './create-project-form.component.css'
})
export class CreateProjectFormComponent implements DialogFormInterface{

  @Output() successfullySubmitted = new EventEmitter<void>();

  formError: Partial<HttpErrorResponse> | null = null;
  loading: boolean = false;

  //companyId!: number
  //teamId!: number

  companyId = 1
  teamId = 1

  createProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    active: new FormControl("")
  });

  constructor(private companyService: CompanyService, private route: ActivatedRoute){}

  createProject(event: Event){
    event.preventDefault();
    this.loading = true;
    this.formError = null;

    //this.grabParams()

    this.companyService.createProject(this.companyId, this.teamId, this.createProjectForm.value).subscribe({
      next: result => {
        this.successfullySubmitted.emit()
      },
      error: error => {
        this.formError = error
        this.loading = false
      }
    }
  )}

  /*grabParams(){
    this.route.paramMap.subscribe(params => {
      this.companyId = parseInt(params.get('companyId') || '');
      this.teamId = parseInt(params.get('teamId') || '');
    })
  }*/

  close(): void {
    console.log('Closed');
  }
}
