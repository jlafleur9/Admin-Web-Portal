import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { CompanyService } from 'src/services/CompanyService';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { TeamDto } from 'src/services/dtos/team.dto';

@Component({
  selector: 'app-create-project-overlay',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent {

  companyId = 1
  teamId = 1

  constructor(private companyService: CompanyService){}

  createProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });


  onSubmit(){ 
    this.companyService.createProject(this.companyId, this.teamId, this.createProjectForm.value).subscribe( 
      () => console.log(this.createProjectForm.value)
    )
  }
}
