import { Component, Injector } from '@angular/core';
import { ProjectSegmentComponent } from './project-segment/project-segment.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CreateProjectOverlayComponent } from './create-project-overlay/create-project-overlay.component';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { CompanyService } from 'src/services/CompanyService';
import { CommonModule, Location } from '@angular/common';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import {MatButton} from "@angular/material/button";
import { DialogService } from 'src/services/dialog.service';
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-projects', 
  standalone: true,
  imports: [ProjectSegmentComponent, OverlayModule, CommonModule, NavBarComponent, MatButton],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  //--TO-DO: 
  //---get companyId and teamId
  //---create dynamic projects title for each team
  //---auto-refresh projects after editing a project

  //companyId!: number
  companyId = 1
  teamId = 1

  team!: string

  projects: ProjectDto[] | any

  constructor(private companyService: CompanyService, private dialogService: DialogService, private route: ActivatedRoute, private location: Location, private userService: UserService) {}

  ngOnInit(): void {
    //this.team = ...
    this.displayProjects();
  }

  displayProjects(){
    
  this.companyService.getProjects(this.companyId, this.teamId).subscribe(
      (projects: ProjectDto[]) => {
        this.projects = projects;
        projects.sort((a, b) => b.id - a.id)
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  back(): void{
    this.location.back()
  }

  openDialog(): void {
    this.dialogService.open(CreateProjectOverlayComponent, this.projects);
  }
}
