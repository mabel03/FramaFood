import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Mesa } from '../Models/mesa';
import { enviroment } from '../../env';
import { Plato } from '../Models/plato';
import { Receta } from '../Models/Receta';

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
}

