import { Component, OnInit } from '@angular/core';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../interface/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { UserType } from '../../interface/user-type';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrl: './manager-user.component.css'
})
export class ManagerUserComponent implements OnInit{

trashIcon = faTrash;
pencilIcon = faPencilAlt;
plusIcon = faPlus;

users: User[] = [];
filteredUsers: User[] = [];

constructor(private userService: UserService, private modal: NgbModal) {}
  ngOnInit(): void {
    this.getUsers();
  }

public getUsers(): void {
  this.userService.getAllUsers().subscribe({
    next: (response: User[]) => {
      this.users = response;
      this.filteredUsers = this.users;
      console.log(this.users);
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
  },
  complete: () => {
      console.log('Ticket retrieval complete');
  }

  });
}

openUserModal(): void {
  const modalRef = this.modal.open(UserModalComponent);
  modalRef.componentInstance.user = {
    id: 0,
    name: '',
    email: '',
    password: '',
    type: UserType.USER,
    score: 0
  };

  modalRef.result.then((result) => {
    console.log('Modal closed with result:', result);
    if (result === 'ticket created' || result === 'ticket updated') {
      this.getUsers();
    }
  }, (reason) => {
    console.log('Modal dismissed with reason:', reason);
  });
}

}
