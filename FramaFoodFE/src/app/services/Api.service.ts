import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Mesa } from '../Models/mesa';
import { enviroment } from '../../env';
import { Plato } from '../Models/plato';
import { Receta } from '../Models/Receta';
import { PedidoApi } from '../Models/PedidoApi';
import { DetallePedidoApi } from '../Models/DetallePedidoApi';

@Injectable({ providedIn: 'root' })
export class ApiService  {

  constructor(private http: HttpClient) { }

  obtenerTodasLasMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${enviroment.url}Mesas/ObtenerMesas`);
  }
  
  getAllPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${enviroment.url}Platos/GetAllPlatos`);
  }

  getRecetaByPlatoId(idPlato: number): Observable<Receta> {
    return this.http.get<Receta>(`${enviroment.url}Platos/GetRecetaByPlatoId/${idPlato}`);
  }

  placeOrder(orderData: { idmesa: number, idmesera: number, Detalles: any[] }): Observable<any> {
    return this.http.post(`${enviroment.url}Platos/CreateOrder`, orderData);
  }

  obtenerPedidosPendientes(): Observable<PedidoApi[]> {
    return this.http.get<PedidoApi[]>(`${enviroment.url}Pedidos/ObtenerPedidosPendientes`)
      .pipe(
        map(pedidos => pedidos.map(p => ({
          ...p,
          cantidadPlatos: p.detallePlatos.reduce((sum: number, det: DetallePedidoApi) => sum + det.cantidad, 0)
        })))
      );
  }

  obtenerPedidosListos(): Observable<PedidoApi[]> {
    return this.http.get<PedidoApi[]>(`${enviroment.url}Pedidos/ObtenerPedidosListos`)
      .pipe(
        map(pedidos => pedidos.map(p => ({
          ...p,
          cantidadPlatos: p.detallePlatos.reduce((sum: number, det: DetallePedidoApi) => sum + det.cantidad, 0)
        })))
      );
  }

  actualizarEstadoPedido(idPedido: number, nuevoEstado: 'PREP' | 'LIST' | 'ENVI'): Observable<any> {
    return this.http.put(`${enviroment.url}Pedidos/ActualizarEstadoPedido/${idPedido}`, { estado: nuevoEstado });
  }
  
}

