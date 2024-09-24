import { Component, Input } from '@angular/core';
import { CreateTeamOverlayComponent } from './create-team-overlay/create-team-overlay.component';
import { CommonModule } from '@angular/common';
import Team from '../models/Team';

@Component({
  selector: 'app-team-container',
  standalone: true,
  imports: [CommonModule, CreateTeamOverlayComponent],
  templateUrl: './team-container.component.html',
  styleUrl: './team-container.component.css',
})
export class TeamContainerComponent {
  @Input() teams: Team[] = [];
  showOverlay: boolean = false;

  logTeams = () => {
    console.log(this.teams)
  }


  revealOverlay = () => {
    this.showOverlay = true;
  }


}
