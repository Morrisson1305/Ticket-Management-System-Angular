import { Component, ViewChild } from '@angular/core';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-ticket',
  templateUrl: './manage-ticket.component.html',
  styleUrl: './manage-ticket.component.css'
})
export class ManageTicketComponent {
trashIcon = faTrash;
pencilIcon = faPencilAlt;
plusIcon = faPlus;

tickets = [
  // Example tickets data, replace with your actual data
  { title: 'Ticket 1', description: 'Description 1', user: 'User1', status: 'Pending', created: '2024-08-06' },
  { title: 'Ticket 2', description: 'Description 2', user: 'User2', status: 'Pending', created: '2024-08-06' }
];

constructor(private modalService: NgbModal) {}

  openCreateModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.mode = 'create';
    modalRef.componentInstance.ticket = {
      title: '',
      description: '',
      user: '',
      status: 'Pending',
      created: ''
    };
  }


  openUpdateModal(ticket: any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.mode = 'update';
    modalRef.componentInstance.ticket = { ...ticket };
  }

}
