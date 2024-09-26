import { Component, Injector } from '@angular/core';
import { ProjectSegmentComponent } from './project-segment/project-segment.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CreateProjectOverlayComponent } from './create-project-overlay/create-project-overlay.component';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { CompanyService } from 'src/services/CompanyService';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import {MatButton} from "@angular/material/button";
import { CreateProjectFormComponent } from './create-project-form/create-project-form.component';
import { DialogService } from 'src/services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects', 
  standalone: true,
  imports: [ProjectSegmentComponent, OverlayModule, CommonModule, NavBarComponent, MatButton],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  companyId!: number;
  teamId!: number;

  projects: ProjectDto[] | any

  constructor(private companyService: CompanyService, private dialogService: DialogService, private route: ActivatedRoute) {}

  ngOnInit(): void {


    this.companyService.getProjects(this.companyId, this.teamId).subscribe(
      (projects: ProjectDto[]) => {
        this.projects = projects;
        projects.sort((a, b) => a.id - b.id)
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );

    

    console.log(this.projects)
  }

  grabParams(){
    this.route.paramMap.subscribe(params => {
      this.companyId = parseInt(params.get('companyId') || '');
      this.teamId = parseInt(params.get('teamId') || '');
    })
  }

  openDialog(): void {
    this.dialogService.open(CreateProjectFormComponent);
  }
}
