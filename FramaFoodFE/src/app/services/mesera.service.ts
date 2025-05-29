import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Mesa } from '../Models/mesa';
import { enviroment } from '../../env';

@Injectable({ providedIn: 'root' })
export class MeseraService {

  constructor(private http: HttpClient) { }

  obtenerTodasLasMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${enviroment.url}Mesas/ObtenerMesas`);
  }
}

