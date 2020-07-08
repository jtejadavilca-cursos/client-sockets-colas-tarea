import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import Ticket from '../../classes/ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  styleUrls: ['./nuevo-ticket.component.scss']
})
export class NuevoTicketComponent implements OnInit {

  public nuevoTicket: Ticket = null;

  constructor(
    private router: Router,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  crearNuevoTicket(): void {
    this.wsService.emit('nuevo-ticket', {}, (nuevoTicket: Ticket) => this.nuevoTicket = nuevoTicket);
  }

  verPantallaPublica(): void {
    this.router.navigateByUrl('/publico');
  }
}
