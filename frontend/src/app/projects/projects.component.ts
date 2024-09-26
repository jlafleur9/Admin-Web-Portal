import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ProjectSegmentComponent } from './project-segment/project-segment.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CreateProjectOverlayComponent } from './create-project-overlay/create-project-overlay.component';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { CompanyService } from 'src/services/CompanyService';
import { CommonModule, Location } from '@angular/common';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import {MatButton} from "@angular/material/button";
import { DialogService } from 'src/services/dialog.service';
import { ActivatedRoute } from '@angular/router'
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectSegmentComponent, OverlayModule, CommonModule, NavBarComponent, MatButton],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  // TODO create dynamic projects title for each team

  //companyId!: number;
  //teamId!: number;

  companyId = 1
  teamId = 1

  projects: ProjectDto[] = [];
  team!: string

  constructor(
      private companyService: CompanyService,
      private dialogService: DialogService,
      private route: ActivatedRoute,
      private location: Location,
      private userService: UserService,
  ) {}

  ngOnInit(): void {
    //this.grabParams()
    this.companyId = this.userService.selectedCompany;
    this.route.params.subscribe(params => {
      console.log("Displaying projects")
      this.teamId = params['id'];
      console.log("Team id is", this.teamId);
      this.displayProjects();
    });
  }

  get isAdmin() {
    return this.userService.user?.admin;
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

  updateProjects(project: ProjectDto) {
    const index = this.projects.findIndex(p => p.id === project.id);
    this.projects[index] = project;
  }

  back(): void{
    this.location.back()
  }

  openDialog(): void {
    this.dialogService.open(CreateProjectOverlayComponent, this.projects);
  }
}
