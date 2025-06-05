import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf, NgFor, DecimalPipe } from '@angular/common';
import { Plato } from '../../Models/plato';
import { Receta } from '../../Models/Receta';
import { ApiService } from '../../services/Api.service';
import { PedidoItem } from '../../Models/PedidoItem';

@Component({
  selector: 'app-platos',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DecimalPipe],
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {
  platosList: Plato[] = [];
  platosListFull: Plato[] = [];

  showIngredientsModal: boolean = false;
  selectedReceta: Receta | null = null;
  selectedPlatoNombre: string = '';

  @Output() addToOrder = new EventEmitter<Plato>();
  @Input() Buscador: string = '';

  constructor(private PlatosService: ApiService) { }

  ngOnInit(): void {
    this.loadPlatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Buscador']) {
      this.filterPlatos(); // Call filterPlatos whenever Buscador input changes
    }
  }

  loadPlatos(): void {
    this.PlatosService.getAllPlatos().subscribe({
      next: (data) => {
        this.platosListFull = data; // Assign to platosListFull
        this.platosList = data;     // Initially display all platos
      },
      error: (err) => {
        console.error('Error al cargar platos:', err);
      }
    });
  }

  filterPlatos(): void {
    if (!this.Buscador) {
      this.platosList = [...this.platosListFull]; // If search is empty, show all dishes
    } else {
      const searchTerm = this.Buscador.toLowerCase();
      this.platosList = this.platosListFull.filter(plato =>
        plato.nombre.toLowerCase().includes(searchTerm)
      );
    }
  }

  viewIngredients(idPlato: number): void {
    const plato = this.platosListFull.find(p => p.idPlato === idPlato); // Search in the full list
    if (plato) {
      this.selectedPlatoNombre = plato.nombre;
    }

    this.PlatosService.getRecetaByPlatoId(idPlato).subscribe({
      next: (data) => {
        this.selectedReceta = data;
        this.showIngredientsModal = true;
      },
      error: (err) => {
        console.error('Error al cargar ingredientes:', err);
        this.selectedReceta = { idreceta: 0, idplato: idPlato, instrucciones: 'No se encontraron instrucciones para este plato.' };
        this.showIngredientsModal = true;
      }
    });
  }

  closeIngredientsModal(): void {
    this.showIngredientsModal = false;
    this.selectedReceta = null;
    this.selectedPlatoNombre = '';
  }
}