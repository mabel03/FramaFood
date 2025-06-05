import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlatosComponent } from '../platos/platos.component';

@Component({
  selector: 'app-pedidos',
  imports: [PlatosComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  constructor(private router: Router) {} 

  ngOnInit(): void {
    
  }
}
