import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamContainerComponent } from './team-container/team-container.component';
import { HttpClient } from '@angular/common/http';
import Team from './models/Team';
import Teammate from './models/Teammate';
import { lastValueFrom } from 'rxjs';
import Project from './models/Project';
import { NavMenuComponent } from '../shared/nav-menu/nav-menu.component';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, TeamContainerComponent, NavMenuComponent, NavBarComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent {
  company: any;
  teamData: Team[] = [];
  membersData: Teammate[] = [];
  projectData: Project[] = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.getCompanyFromLocalStorage();
    this.loadTeams();
  }

  loadTeams(): void {


    lastValueFrom(
      // return a list of teams for that given company
      this.http.get<Team[]>('http://localhost:8080/company/1/teams')
    ).then((teams) => {
      this.teamData = teams
      // return a list of projects a company has (includes the team thats working on it)
      return lastValueFrom(this.http.get<Project[]>('http://localhost:8080/projects/company/1'))
    }).then((projects) => {
      this.projectData = projects
      // return a list of all memebrs from the company
      return lastValueFrom(this.http.get<Teammate[]>(`http://localhost:8080/company/1/users`))
    }).then((members) => {
      this.membersData = members
    }).catch((error) => {
      console.error('Error fetching data: ', error)
    })
  }

  // onTeamCreated = () => {
  //   console.log('new team added');
  //   this.loadTeams();
  // };

  // uncomment this when the previous page is done handling their stuff
  // getCompanyFromLocalStorage(): void {
  //   const objFromLocalStorage = localStorage.getItem('company');
  //   if (objFromLocalStorage) {
  //     this.company = JSON.parse(objFromLocalStorage);
  //   } else {
  //     console.log('No object found in local storage.');
  //   }
  // }
}
