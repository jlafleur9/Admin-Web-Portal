import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-segment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-segment.component.html',
  styleUrl: './project-segment.component.css'
})
export class ProjectSegmentComponent {
  active = true;
}
