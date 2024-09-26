import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CreateTeamOverlayComponent } from './create-team-overlay/create-team-overlay.component';
import { CommonModule } from '@angular/common';
import Team from '../models/Team';
import Teammate from '../models/Teammate';
import Project from '../models/Project';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from 'src/services/dialog.service';

interface assignedProjects {
  teamId: number;
  projects: number;
}

@Component({
  selector: 'app-team-container',
  standalone: true,
  imports: [CommonModule, CreateTeamOverlayComponent, MatButtonModule],
  templateUrl: './team-container.component.html',
  styleUrl: './team-container.component.css',
})
export class TeamContainerComponent {
  @Input() teamData: Team[] = [];
  @Input() membersData: Teammate[] = [];
  @Input() projectData: Project[] = [];
  @Output() teamCreated = new EventEmitter<void>();
  showOverlay: boolean = false;
  assignedProjectsList: assignedProjects[] = [];

  constructor(private dialogService: DialogService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectData']) {
      this.sortTeams();
      // process projectData when it gets passed into this component
      this.teamData.forEach((team) => {
        // gets the count of how many projects are assigned to a specific team
        const projectCount = this.projectData.filter(
          (project) => project.team.id === team.id
        ).length;
        this.assignedProjectsList.push({
          teamId: team.id,
          projects: projectCount,
        });
      });
    }

    // for each teamData, set their projects property equal to the assignedProjectsList based on their ID
    this.assignedProjectsList.forEach((project) => {
      this.teamData.forEach((team) => {
        if (team.id === project.teamId) {
          team.projects = project.projects;
        }
      });
    });
  }

  sortTeams = () => {
    this.teamData.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  };

  openOverlay = () => {
    this.dialogService.open(CreateTeamOverlayComponent, this.membersData);
  };

  logTeams = () => {
    // console.log(this.teamData);
    console.log(this.teamData);
    console.log(this.assignedProjectsList);
  };

  // revealOverlay = () => {
  //   this.showOverlay = true;
  // };

  onTeamCreated(): void {
    this.teamCreated.emit();
  }
}
