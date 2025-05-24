import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Mesa } from '../Models/mesa';
import { enviroment } from '../../env';

@Injectable({ providedIn: 'root' })
export class MeseraService {

  constructor(private http: HttpClient) { }

   obtenerMesas(): Observable<any> {
     return this.http.get(`${enviroment.url}Mesas/ObtenerMesas`)
   }
}