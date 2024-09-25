import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from 'src/services/CompanyService';
import { ProjectDto } from 'src/services/dtos/project.dto';

@Component({
  selector: 'app-project-segment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-segment.component.html',
  styleUrl: './project-segment.component.css'
})
export class ProjectSegmentComponent {

  active = false

  @Input() projectName = ''
  @Input() description = ''
}
