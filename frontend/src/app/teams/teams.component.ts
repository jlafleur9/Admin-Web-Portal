import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamContainerComponent } from './team-container/team-container.component';
import { HttpClient } from '@angular/common/http';
import Team from './models/Team';
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
  fetchedData: Team[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.getCompanyFromLocalStorage();

    // lastValueFrom converts the observed fetched data into a promise so I can chain them together
    // in order to first get the teams then the amount of projects per team
    lastValueFrom(
      this.http.get<Team[]>('http://localhost:8080/company/1/teams')
    )
      .then((data) => {
        this.fetchedData = data;
        return Promise.all(
          this.fetchedData.map((team) =>
            lastValueFrom(
              this.http.get<number>(
                `http://localhost:8080/team/${team.id}/projects`
              )
            )
          )
        );
      })
      .then((projects) => {
        projects.forEach((project, index) => {
          this.fetchedData[index].projects = project
        });
      })
      .catch((err) => {
        console.error('Error fetching data', err);
      });

    // this.http.get<Team[]>('http://localhost:8080/company/1/teams').subscribe({
    //   next: (data) => {
    //     this.fetchedData = data;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching data', err);
    //   },
    // });

    // this.fetchedData.forEach((element, index) => {
    //   this.http
    //     .get<number>(`localhost:8080/team/${element.id}/projects`)
    //     .subscribe({
    //       next: (data) => {
    //         // console.log(data)
    //         this.fetchedData[index].projects = data
    //         console.log(this.fetchedData)
    //         // element.projects = data
    //       },
    //       error: (err) => {
    //         console.error('Error fetching data', err);
    //       },
    //     });
    // });
  }

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
