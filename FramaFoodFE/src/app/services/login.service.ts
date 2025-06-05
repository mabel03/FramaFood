import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private url = 'http://localhost:5164/api/Usuarios/Login'
  private _user = new BehaviorSubject<boolean | null>(null);
  currentUser$ = this._user.asObservable();
  constructor(private http: HttpClient) {}

  Login(usuario: string, pass: string): Observable<any> {
    const body = { Nombre: usuario, Contrasena: pass }
    return this.http.post(this.url, body);
  }

  obtenerUsuarios(){
    return this.http.get('http://localhost:5164/api/Usuarios/ObtenerUsuarios')
  }
}
