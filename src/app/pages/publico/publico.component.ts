import { Component, OnInit } from '@angular/core';
import Ticket from '../../classes/ticket';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.scss']
})
export class PublicoComponent implements OnInit {

  private API_COLA = environment.APIS.API_COLAS;

  lstUltimosCuatroAtendidos: Ticket[];

  constructor(
    private wsService: WebsocketService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.obtenerUltimosCuatro();
    this.escucharSockets();
  }

  obtenerUltimosCuatro(): void {
    this.http.get<Ticket[]>(`${ this.API_COLA }/colas/cuatro-ultimos`)
          .subscribe( ultimosCuatro => this.llenarUltimosCuatro( ultimosCuatro ));
  }

  llenarUltimosCuatro( ultimosCuatro: Ticket[] ): void {
    this.lstUltimosCuatroAtendidos = ultimosCuatro;
    for ( let i = 0; i < 4; i++ ) {
      const codigo = i < this.lstUltimosCuatroAtendidos.length ? this.lstUltimosCuatroAtendidos[ i ].codigo : '-';
      const escritorio = i < this.lstUltimosCuatroAtendidos.length ? this.lstUltimosCuatroAtendidos[ i ].escritorio : '-';
      document.getElementById(`lblTicket${ i + 1 }`).innerText = `Ticket ${ codigo }`;
      document.getElementById(`lblEscritorio${ i + 1 }`).innerText = `Escritorio ${ escritorio }`;
    }
  }

  escucharSockets(): void {
    this.wsService.listen('cuatro-ultimos')
          .subscribe( (ultimosCuatro: Ticket[]) => this.llenarUltimosCuatro( ultimosCuatro ) );
  }
}
