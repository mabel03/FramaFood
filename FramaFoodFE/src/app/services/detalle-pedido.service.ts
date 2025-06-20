import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { enviroment } from '../../env';
import { DetallePedidoApi } from '../Models/DetallePedidoApi';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  constructor(private http: HttpClient) { }

  ObtenerMesas(): Observable<DetallePedidoApi[]> {
    return this.http.get<DetallePedidoApi[]>(enviroment.url + 'PedidoDetalle/VerPedidos')
    .pipe(
      map(pedido => pedido.map(p =>({
        ...p
      })) 

      )
    );
  }

  ActualizarPedido(id: number, body:any): Observable<any>{
    return this.http.put(`${enviroment.url}PedidoDetalle/ActualizarDetalle/${id}`, body)
  }
}
