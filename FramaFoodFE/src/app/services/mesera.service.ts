import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeseraService {

  constructor(private http:HttpClient) { }

  ObtenerMesas():Observable<any>{
    return this.http.post("loscal/creacion", {});
  }
}