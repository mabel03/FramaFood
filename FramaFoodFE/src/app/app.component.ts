import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { NgIf } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLoginComponent } from './components/header-login/header-login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, FooterComponent, HeaderLoginComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FramaFoodFE';
  show = true;

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const excluir = ['/login', '/chef', '/Mesas', '/Mesas/pedidos'];
        this.show = !excluir.includes(event.urlAfterRedirects)
      }
    });
  }
}
