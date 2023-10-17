import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { FormControlValidationDirective } from '../form-control-validation.directive';
import { FormLabelDirective } from '../form-label.directive';
import { FormLabelValidationDirective } from '../form-label-validation.directive';

@Component({
  selector: 'pr-login',
  standalone: true,
  imports: [NgIf, FormsModule, AlertComponent, FormControlValidationDirective, FormLabelDirective, FormLabelValidationDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { login: '', password: '' };
  authenticationFailed = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  authenticate(): void {
    this.authenticationFailed = false;
    this.userService.authenticate(this.credentials).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => (this.authenticationFailed = true)
    });
  }
}
