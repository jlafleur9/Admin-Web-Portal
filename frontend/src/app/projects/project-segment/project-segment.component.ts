import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { DialogService } from 'src/services/dialog.service';
import { EditProjectOverlayComponent } from '../edit-project-overlay/edit-project-overlay.component';

export type ProjectWrapper = {
  project: Partial<ProjectDto>
}

@Component({
  selector: 'app-project-segment',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './project-segment.component.html',
  styleUrl: './project-segment.component.css'
})
export class ProjectSegmentComponent {

  @Output()
  newProject = new EventEmitter<ProjectDto>();

  @Input() projectId = 0
  @Input() projectName = ''
  @Input() description = ''
  @Input() active = false

  projectWrapper: ProjectWrapper | null = { project: {} };

  constructor(private dialogService: DialogService) {}

  openDialog(): void {
    this.projectWrapper!.project = {
      id: this.projectId,
      name: this.projectName,
      description: this.description,
      active: this.active
    }
    const dialogRef = this.dialogService.open(EditProjectOverlayComponent, this.projectWrapper);

    dialogRef.afterClosed().subscribe(() => {
      this.newProject.emit(this.projectWrapper?.project as ProjectDto);
    })
  }
}
