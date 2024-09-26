import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CompanyDto } from 'src/services/dtos/company.dto';
import { UserService } from 'src/services/user.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatLabel,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent {
  companies: CompanyDto[] = [];


  companyForm: FormGroup = new FormGroup({
    company: new FormControl('', [
      Validators.required
    ])
  })
  error: HttpErrorResponse | null = null;
  constructor(private userService: UserService,
    private router: Router
  ) {}

    ngOnInit(): void {
      this.companies = this.userService.usersCompanies;
    }

    onCompanySelected() {
      if (this.companyForm.controls['company'].value) {
        const companyId = this.companyForm.controls['company'].value;
        this.userService.setSelectedCompany(companyId)
        this.router.navigate(['/app/home'])
      } else {
        console.error('No Company Selected')
      }
    }
}
