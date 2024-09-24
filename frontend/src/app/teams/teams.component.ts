import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamContainerComponent } from './team-container/team-container.component';
import { HttpClient } from '@angular/common/http';
import Team from './models/Team';
import Profile from './models/Profile';
import Teammate from './models/Teammate';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, TeamContainerComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent {
  company: any;
  teamData: Team[] = [];
  membersData: Teammate[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.getCompanyFromLocalStorage();
    this.loadTeams();
  }

  loadTeams(): void {
    // lastValueFrom converts the observed fetched data into a promise so I can chain them together
    // in order to first get the teams then the amount of projects per team
    // also every member of the specified company
    lastValueFrom(
      // get every team from the given company ID
      // this will return a list of teams for that given company
      this.http.get<Team[]>('http://localhost:8080/company/1/teams')
    )
      .then((data) => {
        this.teamData = data;
        return Promise.all(
          this.teamData.map((team) =>
            lastValueFrom(
              // for every team, query the number of projects that team is assigned to
              this.http.get<number>(
                `http://localhost:8080/team/${team.id}/projects`
              )
            )
          )
        ).then((projects) => {
          return lastValueFrom(
            // return a list of teammates for a given company
            this.http.get<Teammate[]>(`http://localhost:8080/company/1/users`)
          ).then((users) => {
            return { projects, users };
          });
        });
      })
      // projects contains a list of numbers associated with each team
      // this number indicates the amount of projects a team is assigned to
      .then(({ projects, users }) => {
        projects.forEach((project, index) => {
          // each teamData element (of type team) contains a property called "projects"
          // set equal this "projects" property to the respective number returned from the project get request /team/${team.id}/projects
          this.teamData[index].projects = project;
        });
        // this contains all the members/users of a given company
        this.membersData = users;
      })
      .catch((err) => {
        console.error('Error fetching data', err);
      });
  }

  onTeamCreated = () => {
    console.log('new team added');
    this.loadTeams();
  };

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
