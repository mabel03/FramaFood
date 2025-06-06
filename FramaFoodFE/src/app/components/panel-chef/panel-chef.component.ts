import { NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { DetallePedidoService } from '../../services/detalle-pedido.service';
import { PedidoApi } from '../../Models/PedidoApi';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-panel-chef',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './panel-chef.component.html',
  styleUrl: './panel-chef.component.css'
})
export class PanelChefComponent {
  public numeros: number = 5;
  public pedidosPendientes: any;
  pedidosListos: any;
  selectedPedido: PedidoApi | null = null;
  
  showDetallePedidoModal: boolean = false;
  showPedidoListoModal: boolean = false;
  isLoading: boolean = false;
  //private _DetallePedidoService = Inject(DetallePedidoService)

  constructor(private _DetallePedidoService: DetallePedidoService){}

  ngOnInit(){
    this._DetallePedidoService.ObtenerMesas().subscribe(a => {
      this.pedidosListos = a
    })
  }
  items = [
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
  ];

  tasks = [
    { name: 'Tarea 1', completed: false },
    { name: 'Tarea 2', completed: false },
    { name: 'Tarea 3', completed: false },
    { name: 'Tarea 4', completed: false },
    { name: 'Tarea 1', completed: false },
    { name: 'Tarea 2', completed: false },
    { name: 'Tarea 3', completed: false },
    { name: 'Tarea 4', completed: false },
  ];

  toggle(task: any) {
    task.completed = !task.completed;
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
      this._DetallePedidoService.ObtenerMesas()
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
      this._DetallePedidoService.ObtenerMesas()
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
      /*if (pedido && pedido.idPedido) {
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
      }*/
    }
  
    confirmarEntrega(pedido: PedidoApi | null): void {
      /*if (pedido && pedido.idPedido) {
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
      }*/
    }

}
