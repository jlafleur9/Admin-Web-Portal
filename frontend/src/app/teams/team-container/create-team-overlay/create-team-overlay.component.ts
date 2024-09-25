import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Team from '../../models/Team';
import Teammate from '../../models/Teammate';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-create-team-overlay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './create-team-overlay.component.html',
  styleUrl: './create-team-overlay.component.css',
})
export class CreateTeamOverlayComponent {
  @Input() showOverlay: boolean | undefined;
  @Input() membersData: Teammate[] = [];
  @Output() showOverlayChange = new EventEmitter<boolean>();
  // team created is being emitted from here to team-container to team-component to tell team-component to refetch everything
  // when the user creates a new team so it can display the newly created team
  @Output() teamCreated = new EventEmitter<void>();
  createTeamForm: FormGroup;
  team: Team | undefined;
  availableMembers: Teammate[] = [];
  selectedMembers: Teammate[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createTeamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      members: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['membersData']) {
      // when the number of members for a company is fetched, ensure it's passed to here and updated for the dropdown
      this.availableMembers = [...this.membersData];
    }
  }

  onMemberChange = () => {
    // basically, if a member is selected from the dropdown, remove that member from the dropdown (availableMembers) and add it to selectedMembers
    const selectedMemberId = parseInt(
      this.createTeamForm.get('members')?.value
    );
    const selectedMember = this.availableMembers.find(
      (member) => member.id === selectedMemberId
    );
    if (selectedMember) {
      this.selectedMembers.push(selectedMember);
      this.availableMembers = this.availableMembers.filter(
        (member) => member.id !== selectedMemberId
      );
      this.createTeamForm.get('members')?.setValue('');
    }
  };

  removeMember = (member: Teammate) => {
    // when the remove button is clicked, remove that member from selectedMembers and add it back into availableMembers (the dropdown)
    this.selectedMembers = this.selectedMembers.filter(
      (m) => m.id !== member.id
    );
    this.availableMembers.push(member);
  };

  hideOverlay = () => {
    this.showOverlay = false;
    this.showOverlayChange.emit(this.showOverlay);
  };

  saveNewTeam = () => {
    if (this.createTeamForm.valid) {
      const formValues = this.createTeamForm.value;
      // the API expected the request body to go in the order name, description, teammates
      // formValues' name for teammates is members. Here I'm renaming it to teammates.
      const updatedFormValues = {
        ...formValues,
        teammates: [...this.selectedMembers],
      };
      // delete to prevent memory leaks
      delete updatedFormValues.members;
      // convert to json to be sent as the request body to the api
      const jsonFormValues = JSON.stringify(updatedFormValues);

      // send the post request passing in the json
      this.http
        .post('http://localhost:8080/company/1/teams', jsonFormValues, {
          headers: { 'Content-Type': 'application/json' },
        })
        .pipe(
          catchError((error) => {
            console.error('Error occurred:', error);
            return throwError(() => new Error(error));
          })
        )
        .subscribe({
          next: (response) => {
            // when i recieve a response back from the api, clear all inputs from the form, 
            // hide the overlay, and refetch everything in team-container
            console.log('API Response:', response);
            this.createTeamForm.reset();
            this.selectedMembers = [];
            this.hideOverlay();
            this.teamCreated.emit();
          },
          error: (error) => {
            console.error('error:', error);
          },
          complete: () => {
            console.log('Completed sucessfully');
          },
        });
    }
  };
}
