import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interface/user';
import { UserType } from '../../interface/user-type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
    type: FormControl<string | null>;
  }>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }

    this.registerForm = this.fb.group({
      name: this.fb.control<string | null>(null, Validators.required),
      email: this.fb.control<string | null>(null, Validators.required),
      password: this.fb.control<string | null>(null, Validators.required),
      confirmPassword: this.fb.control<string | null>(null, Validators.required),
      type: this.fb.control<string | null>(null, Validators.required),
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { mustMatch: true };
    } else {
      return null;
    }
  }

  validateNewUser(): void {
    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Please fill out the form correctly.', 'error');
      return;
    }

    const { email } = this.registerForm.value;

    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        const userExists = res.some((user: any) => user.email === email);
        if (userExists) {
          Swal.fire('Error', 'User already exists.', 'error');
        } else {
          this.registerUser();
        }
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire('Error', 'An error occurred while checking user existence.', 'error');
        console.error('Error checking user existence:', err);
      }
    });
  }

  private registerUser(): void {
    const formValues = this.registerForm.value;

    const newUser: User = {
      name: formValues.name!,
      email: formValues.email!,
      password: formValues.password!,
      type: UserType.USER,
    }
    this.userService.registerUser(newUser).subscribe({
      next: () => {
        Swal.fire('Success', 'User Registered Successfully', 'success');
        this.registerForm.reset();
        this.router.navigate(['/user-dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire('Error', 'User registration failed. Please try again.', 'error');
        console.error('Error registering user:', err);
      }
    });
  }

  onSubmit(): void {
    this.validateNewUser();
  }
}
