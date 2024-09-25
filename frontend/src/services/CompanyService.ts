import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { ProjectDto } from "./dtos/project.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:8080'
  
  constructor(private http: HttpClient) {}

  public createProject(companyID: number, teamID: number, project: ProjectDto){
    return this.http.post(this.baseUrl + '/company/' + companyID + '/teams/' + teamID + '/projects', project)
  }

  public getProjects(companyId: number, teamId: number){
    return this.http.get<ProjectDto[]>(this.baseUrl + '/company/' + companyId + '/teams/' + teamId + '/projects')
  }
}
