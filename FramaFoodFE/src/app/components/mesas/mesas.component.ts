import { Component, Inject, OnInit } from '@angular/core';
import { Mesa } from '../../Models/mesa';
import {ApiService } from '../../services/Api.service';
import { SillasComponent } from '../sillas/sillas.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
  imports: [SillasComponent, NgIf]
})
export class MesasComponent implements OnInit {
  
  constructor(private router: Router) {} 
  ngOnInit(): void {}

  cantidadSillasSeleccionada: number | null = null;

  filtrarMesas(cantidad: number) {
    this.cantidadSillasSeleccionada = cantidad;
  }

  irPedidoMeseraChef() {
   this.router.navigate(['/Pedidos/chef']);
  }
}
