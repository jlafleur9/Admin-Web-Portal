import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { ProjectDto } from "./dtos/project.dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8080'
  
  constructor(private http: HttpClient) {}

  public editProjects(projectId: number, project: ProjectDto){
    return this.http.patch<ProjectDto>(this.baseUrl + '/projects/' + projectId, project)
  }
}
