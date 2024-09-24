import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from "./company-form/company-form.component";



@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, CompanyFormComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

}


