import { Component, OnInit } from '@angular/core';
import Ticket from '../../classes/ticket';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.scss']
})
export class PublicoComponent implements OnInit {

  private API_COLA = environment.APIS.API_COLAS;

  lstCuatroUltimosAtendidos: Ticket[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.obtenerCuatroUltimos();
  }

  obtenerCuatroUltimos(): void {
    this.http.get<Ticket[]>(`${ this.API_COLA }/cuatro-ultimos`)
          .subscribe( cu => this.lstCuatroUltimosAtendidos = cu );
  }
}
