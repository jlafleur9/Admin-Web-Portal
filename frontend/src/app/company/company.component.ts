import { Component } from '@angular/core';
import { CompanyDto } from 'src/services/dtos/company.dto';
import { UserService } from 'src/services/UserService';
import { MatSelectModule } from '@angular/material/select'
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
    ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  companies: CompanyDto[] = [];
  selectedCompanyId: number | null = null;

  companyForm: FormGroup = new FormGroup({
    company: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private userService: UserService) {}

    ngOnInit(): void {
      this.companies = this.userService.usersCompanies;
      console.log("companies", this.companies)
    }

    onCompanySelected(companyId: number) {
      this.selectedCompanyId = companyId;
      console.log('Selected company ID:', this.selectedCompanyId);
    }
}


