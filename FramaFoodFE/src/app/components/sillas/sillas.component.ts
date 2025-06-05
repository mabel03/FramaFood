
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/Api.service';
import { Mesa } from '../../Models/mesa';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-sillas',
  templateUrl: './sillas.component.html',
  styleUrls: ['./sillas.component.css'],
  imports: [CommonModule]
})

export class SillasComponent implements OnChanges {
@Input() cantidadSillas!: number;
  mesasFiltradas: Mesa[] = [];
  mesasnumero: string = "";
  todasLasMesas: Mesa[] = []; 
  isDanger: boolean = true;

  constructor(private meseraService: ApiService,private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cantidadSillas'] && this.cantidadSillas) {
      this.cargarYFiltrarMesas();
    }
  }

  cargarYFiltrarMesas() {
    if (this.todasLasMesas.length === 0) {
      this.meseraService.obtenerTodasLasMesas().subscribe(
        (data: Mesa[]) => {
          this.todasLasMesas = data; 
          this.aplicarFiltro();
        },
        error => {
          console.error('Error al cargar todas las mesas:', error);
          this.mesasFiltradas = [];
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

    const estatus = this.todasLasMesas.filter(mesa => mesa.estado === 'OCU');
      if(estatus){
        this.isDanger = false;
      }

    if (this.cantidadSillas === 2) {
      this.mesasFiltradas = this.todasLasMesas.filter(mesa => mesa.cantidadSilla <= 2);
    } else if (this.cantidadSillas === 4) {
      this.mesasFiltradas = this.todasLasMesas.filter(mesa => mesa.cantidadSilla >= 3 && mesa.cantidadSilla <=4);
    } else if (this.cantidadSillas === 6) { 
      this.mesasFiltradas = this.todasLasMesas.filter(mesa => mesa.cantidadSilla == 5 || mesa.cantidadSilla >= 6);
    } else {
      this.mesasFiltradas = [];
    }
  }

  irPedidosPlatos(item : any) {
  this.router.navigate(['/Mesas/pedidos'],{  state:{Silla: item.numero, idMesa:item.idMesa}});
  }
}