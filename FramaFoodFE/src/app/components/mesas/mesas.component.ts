import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../Models/mesa';
import { MeseraService } from '../../services/mesera.service';
import { SillasComponent } from '../sillas/sillas.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
  imports: [SillasComponent, NgIf]
})
export class MesasComponent implements OnInit {
  // mesasOriginal: Mesa[] = [];
  // mesasFiltradas: Mesa[] = [];
  // existeMesas: boolean = false;

  // constructor(private meseraService: MeseraService) {}
  ngOnInit(): void {}

  // ngOnInit(): void {
  //   this.meseraService.obtenerMesas().subscribe(data => {
  //     this.mesasOriginal = data;
  //     this.mesasFiltradas = data; // Muestra todas al principio
  //   });
  // }

  cantidadSillasSeleccionada: number | null = null;

  filtrarMesas(cantidad: number) {
    this.cantidadSillasSeleccionada = cantidad;
  }
}
