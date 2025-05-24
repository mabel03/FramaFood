import { Component } from '@angular/core';
import { Mesa } from '../../Models/mesa';
import { MeseraService } from '../../services/mesera.service';

@Component({
  selector: 'app-mesas',
  imports: [],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {
  mesasOriginal: Mesa[] = [];
  mesasFiltradas: Mesa[] = [];

  constructor(private meseraService: MeseraService) {}  

  ngOnInit(): void {
    this.meseraService.obtenerMesas().subscribe(data => {
      this.mesasOriginal = data;
      this.mesasFiltradas = data;
    });
  }

  filtrarMesas(cantidadSillas: number): void {
    this.mesasFiltradas = this.mesasOriginal.filter(mesa => mesa.cantidadSilla === cantidadSillas);
  }
}
