import { TicketPriority } from "./ticket-priority";
import { TicketStatus } from "./ticket-status";
import { User } from "./user";

export interface Ticket {

  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  assignedTo: User;
  priority: TicketPriority;
  createdTime: string;
  closedTime?: string;

}
