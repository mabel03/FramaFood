import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  constructor(private http: HttpClient) { }

  ObtenerMesas() {
    return this.http.get(enviroment.url + 'PedidoDetalle/VerPedidos')
  }
}
