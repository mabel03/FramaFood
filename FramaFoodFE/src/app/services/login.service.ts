import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userName$: Observable<string | null> = this.userNameSubject.asObservable(); 

  private RolNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public RolName$: Observable<string | null> = this.RolNameSubject.asObservable(); 

  private userSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public user$: Observable<string | null> = this.userSubject.asObservable(); 

  private url = 'http://localhost:5164/api/Usuarios/Login'
  private _user = new BehaviorSubject<boolean | null>(null);
  currentUser$ = this._user.asObservable();
  constructor(private http: HttpClient) {}

  Login(usuario: string, pass: string): Observable<any> {
    const body = { usuario: usuario, pass: pass }
    return this.http.post(this.url, body);
  }

  obtenerUsuarios(){
    return this.http.get('http://localhost:5164/api/Usuarios/ObtenerUsuarios')
  }

  setUserName(name: string): void {
    this.userNameSubject.next(name);
    localStorage.setItem('userName', name)
  }

  getUserName(): string | null {
    return this.userNameSubject.getValue();
  }

  setRolName(rol: string): void {
    this.RolNameSubject.next(rol);
    localStorage.setItem('userRol', rol)
  }

  getRolName(): string | null {
    return this.RolNameSubject.getValue();
  }

  setUser(user: string): void {
    this.RolNameSubject.next(user);
    localStorage.setItem('User', user)
  }

  getUser(): string | null {
    return this.RolNameSubject.getValue();
  }

  clearUserName(){
    this.userNameSubject.next(null);
    this.RolNameSubject.next(null);
    localStorage.removeItem('userRol');
    localStorage.removeItem('userName');
  }
}
