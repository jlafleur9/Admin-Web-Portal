import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { CompanyService } from 'src/services/CompanyService';
import { DialogService } from 'src/services/dialog.service';
import { EditProjectOverlayComponent } from '../edit-project-overlay/edit-project-overlay.component';

@Component({
  selector: 'app-project-segment',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './project-segment.component.html',
  styleUrl: './project-segment.component.css'
})
export class ProjectSegmentComponent {

  @Input() projectId = ''
  @Input() projectName = ''
  @Input() description = ''
  @Input() active = 'false'

  project: ProjectDto | any

  constructor(private dialogService: DialogService) {}

  openDialog(): void {
    this.project = {
      id: this.projectId,
      name: this.projectName,
      description: this.description,
      active: this.active
    }
    this.dialogService.open(EditProjectOverlayComponent, this.project);
  }
}
