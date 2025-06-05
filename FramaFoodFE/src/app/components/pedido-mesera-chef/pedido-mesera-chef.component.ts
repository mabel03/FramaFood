import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService} from '../../services/Api.service';
import { finalize } from 'rxjs/operators';
import { PedidoApi } from '../../Models/PedidoApi'; // Ensure PedidoApi is defined in this file or imported correctly
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-mesera-chef',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-mesera-chef.component.html',
  styleUrl: './pedido-mesera-chef.component.css'
})
export class PedidoMeseraChefComponent implements OnInit {
  pedidosPendientes: PedidoApi[] = [];
  pedidosListos: PedidoApi[] = [];
  selectedPedido: PedidoApi | null = null;

  showDetallePedidoModal: boolean = false;
  showPedidoListoModal: boolean = false;
  isLoading: boolean = false; // This is the only loading flag defined here

  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit(): void {
    this.fetchPedidos();
  }

  fetchPedidos(): void {
    this.isLoading = true; // Start loading

    let pendingLoaded = false;
    let readyLoaded = false;

    const checkAllLoaded = () => {
      if (pendingLoaded && readyLoaded) {
        this.isLoading = false;
      }
    };

    // Fetch pending orders
    this.apiService.obtenerPedidosPendientes()
      .pipe(finalize(() => {
        pendingLoaded = true;
        checkAllLoaded();
      }))
      .subscribe({
        next: (data) => {
          this.pedidosPendientes = data;
          console.log('Pedidos Pendientes:', this.pedidosPendientes);
        },
        error: (err) => {
          console.error('Error fetching pending orders:', err);
          alert('Error al cargar pedidos pendientes.');
          pendingLoaded = true;
          checkAllLoaded();
        }
      });

    // Fetch ready orders
    this.apiService.obtenerPedidosListos()
      .pipe(finalize(() => {
        readyLoaded = true;
        checkAllLoaded();
      }))
      .subscribe({
        next: (data) => {
          this.pedidosListos = data;
          console.log('Pedidos Listos:', this.pedidosListos);
        },
        error: (err) => {
          console.error('Error fetching ready orders:', err);
          alert('Error al cargar pedidos listos.');
          readyLoaded = true;
          checkAllLoaded();
        }
      });
  }

  openDetallePedidoModal(pedido: PedidoApi): void {
    this.selectedPedido = pedido;
    this.showDetallePedidoModal = true;
  }

  closeDetallePedidoModal(): void {
    this.showDetallePedidoModal = false;
    this.selectedPedido = null;
  }

  openPedidoListoModal(pedido: PedidoApi): void {
    this.selectedPedido = pedido;
    this.showPedidoListoModal = true;
  }

  closePedidoListoModal(): void {
    this.showPedidoListoModal = false;
    this.selectedPedido = null;
  }

  markPedidoAsReady(pedido: PedidoApi | null): void {
    if (pedido && pedido.idPedido) {
      this.isLoading = true;
      this.apiService.actualizarEstadoPedido(pedido.idPedido, 'LIST')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => {
            alert(`Pedido #${pedido.idPedido} marcado como LISTO.`);
            this.closeDetallePedidoModal();
            this.fetchPedidos();
          },
          error: (err) => {
            console.error('Error al marcar pedido como listo:', err);
            alert('Error al marcar el pedido como listo.');
          }
        });
    }
  }

  confirmarEntrega(pedido: PedidoApi | null): void {
    if (pedido && pedido.idPedido) {
      this.isLoading = true;
      this.apiService.actualizarEstadoPedido(pedido.idPedido, 'ENVI')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => {
            alert(`Pedido #${pedido.idPedido} de la Mesa ${pedido.numeroMesa} ha sido entregado.`);
            this.closePedidoListoModal();
            this.fetchPedidos(); // Re-fetch all orders to update lists
          },
          error: (err) => {
            console.error('Error al confirmar entrega:', err);
            alert('Error al confirmar la entrega del pedido.');
          }
        });
    }
  }

  irMenu() {
   this.router.navigate(['/Mesas']);
  }
  
  irPedidoMeseraChef(){
   this.router.navigate(['/Pedidos/chef']);
  }
}