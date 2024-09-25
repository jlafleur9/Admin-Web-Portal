import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateTeamOverlayComponent} from "./create-team-overlay/create-team-overlay.component";
import {MatButton} from "@angular/material/button";
import {OverlayExampleComponent} from "../shared/overlay-layout/examples/overlay-example/overlay-example.component";

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    MatButton,
    OverlayExampleComponent
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {

  private dialogRef: MatDialogRef<CreateTeamOverlayComponent> | undefined;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CreateTeamOverlayComponent, {
      autoFocus: "dialog"
    })

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed. Result: ${result}`);

    })
  }
}
