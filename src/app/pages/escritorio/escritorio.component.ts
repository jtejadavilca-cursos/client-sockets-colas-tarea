import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ActivatedRoute } from '@angular/router';
import Ticket from '../../classes/ticket';

@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.scss']
})
export class EscritorioComponent implements OnInit {

  private escritorio: number;
  private siguienteTicket: Ticket = null;

  constructor(
    private actRouter: ActivatedRoute,
    private wsService: WebsocketService
  ) { }


  ngOnInit(): void {
    this.escritorio = Number(this.actRouter.snapshot.paramMap.get('id'));
  }

  atenderSiguienteTicket(): void {
    this.wsService.emit('atender-ticket', this.escritorio, ( siguienteTicket: Ticket ) => this.siguienteTicket = siguienteTicket);
  }

}
