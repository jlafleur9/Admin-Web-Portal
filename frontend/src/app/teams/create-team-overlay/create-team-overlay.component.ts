import { Component } from '@angular/core';
import {OverlayLayoutComponent} from "../../shared/overlay-layout/overlay-layout.component";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-team-overlay',
  standalone: true,
  imports: [
    OverlayLayoutComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './create-team-overlay.component.html',
  styleUrl: './create-team-overlay.component.css'
})
export class CreateTeamOverlayComponent {
  createTeamForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  create() {
    console.log("Created")
  }

  close() {
    console.log("Closed")
  }
}
