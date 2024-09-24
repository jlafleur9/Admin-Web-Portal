import { Component } from '@angular/core';
import { ProjectSegmentComponent } from './project-segment/project-segment.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectSegmentComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
