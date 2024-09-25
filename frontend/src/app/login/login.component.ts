import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    NgOptimizedImage,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });
  loggingIn = false;
  loginError: HttpErrorResponse | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/app/home']);
    }
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginError = null;
    this.loggingIn = true;

    this.userService.login(this.loginForm.value).subscribe({
      next: _ => this.router.navigate(['/app/home']),
      error: (err: HttpErrorResponse) => {
        this.loginError = err
        this.loggingIn = false;
      }
    })
  }
}
