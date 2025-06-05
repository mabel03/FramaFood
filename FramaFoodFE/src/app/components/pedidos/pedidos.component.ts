import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatosComponent } from '../platos/platos.component';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/Api.service';
import { PedidoItem } from '../../Models/PedidoItem'; // Make sure this interface/class exists
import { Plato } from '../../Models/plato'; // Import Plato as well to correctly type the incoming event

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [PlatosComponent, CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  numeromesas: string = " ";
  currentOrderItems: PedidoItem[] = [];

  mesaId: number = 1;
  meseraId: number = 1;
  chefId: number = 0;
  cantidad: number = 0;
  comentario: string = "";

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.numeromesas = history.state.Silla || 'No asignada';
  }


  onAddToOrder(platoSeleccionado: Plato): void {
    const existingItem = this.currentOrderItems.find(item => item.idplato === platoSeleccionado.idPlato);

    if (existingItem) {
      existingItem.cantidad++;
      this.cantidad = existingItem.cantidad;
      this.comentario = existingItem.comentario;
    } else {
      const newItem: PedidoItem = {
        idplato: platoSeleccionado.idPlato,
        nombre: platoSeleccionado.nombre,
        cantidad: 1, 
        comentario: '',
        usuario: "Mcabrera"
      };
      this.currentOrderItems.push(newItem);
    }
    console.log('Pedido Actual:', this.currentOrderItems);
  }

  updateQuantity(item: PedidoItem): void {
    if (item.cantidad < 1) {
      item.cantidad = 1;
    }
    console.log(`Cantidad de ${item.nombre} actualizada a: ${item.cantidad}`);
  }

  removeItem(idPlato: number): void {
    this.currentOrderItems = this.currentOrderItems.filter(item => item.idplato !== idPlato);
    console.log('Pedido Actual después de eliminar:', this.currentOrderItems);
  }

  submitOrder(): void {
    if (this.currentOrderItems.length === 0) {
      alert('Por favor, agrega al menos un plato al pedido.');
      return;
    }

    const orderDetailsForApi = this.currentOrderItems.map(item => ({
      Idplato: item.idplato,
      cantidad: item.cantidad,
      Comentario: item.comentario,
      Idchef: this.chefId,
      Estado: "ENVI",
      usuario: "Mcabrera",

    }));

    const orderPayload = {
      idmesa: this.mesaId,
      idmesera: this.meseraId,
      cantidad: this.cantidad,
      Comentario: this.comentario,
      usuario: "Mcabrera",
      Detalles: orderDetailsForApi
    };

    this.apiService.placeOrder(orderPayload).subscribe({
      next: (response) => {
        alert('Pedido realizado exitosamente!');
        this.currentOrderItems = [];
      },
      error: (error) => {
        console.error('Error al realizar el pedido:', error);
        alert(`Hubo un error al realizar el pedido. Detalles: ${error.message || error.statusText}`);
      }
    });
  }
}