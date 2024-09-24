import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateTeamOverlayComponent } from './create-team-overlay/create-team-overlay.component';
import { CommonModule } from '@angular/common';
import Team from '../models/Team';
import Teammate from '../models/Teammate';

@Component({
  selector: 'app-team-container',
  standalone: true,
  imports: [CommonModule, CreateTeamOverlayComponent],
  templateUrl: './team-container.component.html',
  styleUrl: './team-container.component.css',
})
export class TeamContainerComponent {
  @Input() teams: Team[] = [];
  @Input() membersData: Teammate[] = [];
  @Output() teamCreated = new EventEmitter<void>();
  showOverlay: boolean = false;

  logTeams = () => {
    console.log(this.teams);
  };

  revealOverlay = () => {
    this.showOverlay = true;
  };

  onTeamCreated(): void {
    this.teamCreated.emit();
  }
}
