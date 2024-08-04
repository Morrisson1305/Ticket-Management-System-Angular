import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interface/login-request';
import { LoginResponse } from '../../interface/login-response';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  error: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const request: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(request).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login successful', response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.authService.currentUserValue;

        Swal.fire({
          title: 'Success!',
          text: 'You have signed in successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        if (response.role === 'ROLE_TICKET_MANAGER'){
          this.router.navigate(['/admin/user']);
        }else {
          this.router.navigate(['/user-dashboard']);
        }
      },
      error: (err) => {
        this.error = 'Try again or contact your system admin.';
        Swal.fire({
          title: 'Login Failed',
          text: this.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })

  }


}
