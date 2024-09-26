import { Component } from '@angular/core';
import { FullUserDto } from 'src/services/dtos/full-user.dto';
import { UserService } from 'src/services/user.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  allCompanyUsers: FullUserDto[] = [];
  private subscription: Subscription = new Subscription();
  displayedColumns = ['name', 'email', 'active', 'admin', 'status'];
  dataSource: FullUserDto[] = [];
  constructor(private userService: UserService,) {}
  ngOnInit(): void {
    const usersSubscription = this.userService.getCompanyUsers(this.userService.selectedCompany).subscribe({
      next: (data: FullUserDto[]) => {
        this.allCompanyUsers = data
        this.dataSource = this.allCompanyUsers

      },
      error: (error) => {
        console.log('Error fetching all users from a company', error)
      }
    })
    this.subscription.add(usersSubscription)
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}


