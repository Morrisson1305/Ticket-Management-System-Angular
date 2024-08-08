import { Component, OnInit } from '@angular/core';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrl: './manager-user.component.css'
})
export class ManagerUserComponent {

trashIcon = faTrash;
pencilIcon = faPencilAlt;
plusIcon = faPlus;

}
