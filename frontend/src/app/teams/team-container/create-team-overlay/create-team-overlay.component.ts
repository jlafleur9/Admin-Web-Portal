import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Team from '../../models/Team';

@Component({
  selector: 'app-create-team-overlay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-team-overlay.component.html',
  styleUrl: './create-team-overlay.component.css',
})
export class CreateTeamOverlayComponent {
  @Input() showOverlay: boolean | undefined;
  @Output() showOverlayChange = new EventEmitter<boolean>();
  createTeamForm: FormGroup;
  team: Team | undefined

  constructor(private fb: FormBuilder) {
    this.createTeamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  hideOverlay = () => {
    this.showOverlay = false;
    this.showOverlayChange.emit(this.showOverlay);
  };

  saveNewTeam = () => {
    this.createTeamForm.markAllAsTouched();
    if (this.createTeamForm.valid) {
      console.log('valid')
    } else{
      console.log('invalid')
    }
  };
}
