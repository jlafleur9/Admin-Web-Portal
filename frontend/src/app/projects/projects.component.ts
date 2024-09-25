import { Component, Injector } from '@angular/core';
import { ProjectSegmentComponent } from './project-segment/project-segment.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CreateProjectOverlayComponent } from './create-project-overlay/create-project-overlay.component';
import { ProjectDto } from 'src/services/dtos/project.dto';
import { CompanyService } from 'src/services/CompanyService';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { NavMenuComponent } from "../shared/nav-menu/nav-menu.component";


@Component({
  selector: 'app-projects', 
  standalone: true,
  imports: [ProjectSegmentComponent, OverlayModule, CommonModule, NavBarComponent, NavMenuComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  companyId = 1
  teamId = 1
  active = true;
  projects: ProjectDto[] | any

  constructor(private overlay: Overlay, private injector: Injector, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getProjects(this.companyId, this.teamId).subscribe(
      (projects: ProjectDto[]) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );

    console.log(this.projects)
  }

  openOverlay() {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: true,
      width: 488,
    });
    const overlayRef = this.overlay.create(overlayConfig);

    const portal = new ComponentPortal(CreateProjectOverlayComponent, null, this.injector);
    overlayRef.attach(portal);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
    });
  }
}
