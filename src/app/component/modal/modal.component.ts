import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  @Input() mode: 'create' | 'update' = 'create';
  @Input() ticket: any = {
    title: '',
    description: '',
    user: '',
    status: 'Pending',
    created: ''
  };

  users = ['User1', 'User2', 'User3']; // Replace api payload.
  currentTimestamp = '';

  constructor(public activeModal: NgbActiveModal) {}


  ngOnInit(): void {
    if (this.mode === 'create') {
      this.currentTimestamp = new Date().toLocaleString();
    } else {
      this.currentTimestamp = this.ticket.created;
    }
  }


  saveTicket() {
    this.ticket.created = this.currentTimestamp;
    console.log(this.mode === 'create' ? 'Ticket created:' : 'Ticket updated:', this.ticket);
    // Add logic to save or update the ticket
    this.activeModal.close();
  }


}
