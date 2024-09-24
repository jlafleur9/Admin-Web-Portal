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

@Component({
  selector: 'app-create-team-overlay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-team-overlay.component.html',
  styleUrl: './create-team-overlay.component.css',
})
export class CreateTeamOverlayComponent {
  @Input() showOverlay: boolean | undefined;
  @Input() membersData: Teammate[] = [];
  @Output() showOverlayChange = new EventEmitter<boolean>();
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
      this.availableMembers = [...this.membersData];
    }
  }

  onMemberChange = () => {
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
    // this.createTeamForm.markAllAsTouched();
    if (this.createTeamForm.valid) {
      const formValues = this.createTeamForm.value;
      // console.log('Selected Members:', this.selectedMembers);
      const updatedFormValues = {
        ...formValues,
        teammates: [...this.selectedMembers],
      };
      delete updatedFormValues.members;
      const jsonFormValues = JSON.stringify(updatedFormValues);

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
