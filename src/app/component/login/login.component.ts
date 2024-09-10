import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interface/login-request';
import { LoginResponse } from '../../interface/login-response';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserType } from '../../interface/user-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.error = 'Email and password are required!';
      Swal.fire({
        title: 'Validation Error',
        text: this.error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.isLoading = true;
    const request: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        this.isLoading = false;

        Swal.fire({
          title: 'Success!',
          text: 'You have signed in successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        const redirectRoute = response.role === UserType.TICKET_MANAGER ? '/admin/user' : '/user-dashboard';
        this.router.navigate([redirectRoute]);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error', err); // Log the actual error
        this.error = err.error?.message || 'Login failed. Please try again.';
        Swal.fire({
          title: 'Login Failed',
          text: this.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
