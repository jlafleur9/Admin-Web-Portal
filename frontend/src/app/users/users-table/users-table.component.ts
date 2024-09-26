import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FullUserDto } from 'src/services/dtos/full-user.dto';
import { UserService } from 'src/services/user.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})

export class UsersTableComponent implements OnInit, AfterViewInit {
  allCompanyUsers: FullUserDto[] = [];
  private subscription: Subscription = new Subscription();
  displayedColumns = ['name', 'email', 'active', 'admin', 'status'];
  dataSource: MatTableDataSource<FullUserDto> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<FullUserDto>;



  constructor(private userService: UserService,) {}
  ngOnInit(): void {
    const usersSubscription = this.userService.getCompanyUsers(this.userService.selectedCompany).subscribe({
      next: (data: FullUserDto[]) => {
        this.allCompanyUsers = data
        this.dataSource.data = this.allCompanyUsers

      },
      error: (error) => {
        console.log('Error fetching all users from a company', error)
      }
    })
    this.subscription.add(usersSubscription)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    console.log('table data source', this.table.dataSource)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


