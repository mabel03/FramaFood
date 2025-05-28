
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MeseraService } from '../../services/mesera.service';
import { Mesa } from '../../Models/mesa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sillas',
  templateUrl: './sillas.component.html',
  styleUrls: ['./sillas.component.css'],
  imports: [CommonModule]
})

export class SillasComponent implements OnChanges {
@Input() cantidadSillas!: number;
  mesasFiltradas: Mesa[] = [];
  todasLasMesas: Mesa[] = []; 

  constructor(private meseraService: MeseraService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cantidadSillas'] && this.cantidadSillas) {
      this.cargarYFiltrarMesas();
    }
  }

  cargarYFiltrarMesas() {
    if (this.todasLasMesas.length === 0) {
      this.meseraService.obtenerTodasLasMesas().subscribe(
        (data: Mesa[]) => {
          this.todasLasMesas = data; // Guardamos todas las mesas en nuestro array local
          this.aplicarFiltro(); // Luego aplicamos el filtro con la cantidad seleccionada
        },
        error => {
          console.error('Error al cargar todas las mesas:', error);
          this.mesasFiltradas = []; // En caso de error, limpiamos las mesas mostradas
        }
      );
    } else {
      // Si ya tenemos todas las mesas cargadas, simplemente volvemos a aplicar el filtro
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    if (!this.cantidadSillas || !this.todasLasMesas) {
      this.mesasFiltradas = [];
      return;
    }

    // Aquí está la lógica de filtrado en el frontend
    if (this.cantidadSillas === 2) {
      this.mesasFiltradas = this.todasLasMesas.filter(mesa => mesa.cantidadSilla <= 2);
    } else if (this.cantidadSillas === 4) {
      this.mesasFiltradas = this.todasLasMesas.filter(mesa => mesa.cantidadSilla >= 3 && mesa.cantidadSilla <=4);
    } else if (this.cantidadSillas === 6) { // Para "Salon 3 - 6 Sillas"
      // Salon 3 - 6 Sillas: Mesas con 6 sillas o más
      this.mesasFiltradas = this.todasLasMesas.filter(mesa => mesa.cantidadSilla == 5 || mesa.cantidadSilla >= 6);
    } else {
      this.mesasFiltradas = []; // Si la cantidad no es 2, 4 o 6, no se muestra nada
    }
  }
}