import { Component, Inject, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-login',
  imports: [NgIf, DatePipe, RouterLink],
  templateUrl: './header-login.component.html',
  styleUrl: './header-login.component.css'
})
export class HeaderLoginComponent {

  private _usuariosService = inject(LoginService)
  public router = Inject(Router)
  userName: string | null;
  fecha: Date = new Date();
  Rol: string | null;
  private rolSubscript!: Subscription

  ngOnInit(){
    this._usuariosService.userName$.subscribe(a =>{
      this.userName = a;
    });

    this.rolSubscript = this._usuariosService.RolName$.subscribe(x => {
      this.Rol = x
    })

    this.userName = localStorage.getItem('userName')
    this.Rol = localStorage.getItem('userRol')

    console.log(this.Rol)
  }

  irPedidoMeseraChef() {
   //this.router.navigate(['/Pedidos/chef']);
   this.router.navigate(['/Pedidos/chef'])
  }

  irMenu() {
   this.router.navigate(['/Menu']);
  }

  logout(){
    this._usuariosService.clearUserName()
    this.router.navigate(['/login'])
  }
}
