import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { UserType } from '../../interface/user-type';
import { UserService } from '../../services/user.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {


  @Input() user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    type: UserType.USER,
    score: 0,
    createdTime: new Date().toISOString(),
  }
  public UserType = UserType;

  constructor(private userService: UserService,  public activeModal: NgbActiveModal) {}
  // ngOnInit(): void {
  // }

  saveUser(): void {
    this.userService.registerUser(this.user).subscribe({
      next: (newUser) => {
        console.log('User created:', newUser);
        this.activeModal.close('User created');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creating user:', error);
        alert('Error creating user: ' + error.message);
      }
    });
  }

  }


