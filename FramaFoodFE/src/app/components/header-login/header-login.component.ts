import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from 'express';

@Component({
  selector: 'app-header-login',
  imports: [],
  templateUrl: './header-login.component.html',
  styleUrl: './header-login.component.css'
})
export class HeaderLoginComponent {

  private _usuariosService = inject(LoginService)
  private router = inject(Router)

  ngOnInit(){
    //this._usuariosService.obtenerUsuarios()
  }


  irPedidoMeseraChef() {
   this.router.navigate(['/Pedidos/chef']);
  }

  irMenu() {
   this.router.navigate(['/Menu']);
  }
}
