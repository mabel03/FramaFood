import { NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { DetallePedidoService } from '../../services/detalle-pedido.service';
import { PedidoApi } from '../../Models/PedidoApi';
import { finalize } from 'rxjs';
import { DetallePedidoApi } from '../../Models/DetallePedidoApi';
import { ApiService } from '../../services/Api.service';
import { Plato } from '../../Models/plato';
import { Receta } from '../../Models/Receta';
import { NotificacionesService } from '../../services/notificaciones.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-panel-chef',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './panel-chef.component.html',
  styleUrl: './panel-chef.component.css',
})
export class PanelChefComponent {
  public numeros: number = 5;
  public pedidosPendientes: DetallePedidoApi[] = [];
  public pedidosListos: DetallePedidoApi[] = [];
  public PedidoCocinando: DetallePedidoApi[] = [];

  public selectedPedido: DetallePedidoApi[] = [];
  public pedidoSeleccionado: DetallePedidoApi | null = null;
  public objePedido: PedidoApi | null = null;

  //Parte del drag drop
  public dropItem: DetallePedidoApi[] = [];
  public dragItem: DetallePedidoApi;
  items = ['Elemento 1', 'Elemento 2', 'Elemento 3'];

  public idpedido: number;

  showDetallePedidoModal: boolean = false;
  showPedidoListoModal: boolean = false;
  isLoading: boolean = false;

  platosList: Plato[] = [];
  platosListFull: Plato[] = [];

  showIngredientsModal: boolean = false;
  selectedReceta: Receta | null = null;
  selectedPlatoNombre: string = '';
  //private _DetallePedidoService = Inject(DetallePedidoService)

  constructor(
    private _DetallePedidoService: DetallePedidoService,
    private apiService: ApiService,
    private _notificacionService: NotificacionesService,
    private _usuariosService: LoginService
  ) {}

  ngOnInit() {
    /*this._usuariosService.userName$.subscribe(a =>{
      this.pedidoSeleccionado.usuario = a;
      localStorage.setItem("userName", a)
      console.log(a)
    });*/
    this.ObtenerPerdidos();
  }

  toggle(task: any) {
    task.completed = !task.completed;
  }

  ObtenerPerdidos() {
    this._DetallePedidoService.ObtenerMesas().subscribe((a) => {
      this.pedidosPendientes = a.filter((x) => x.estado === 'ENVI');
      this.PedidoCocinando = a.filter((x) => x.estado === 'COCI');
      this.pedidosListos = a.filter((x) => x.estado === 'LIST');
    });
  }

  ActualizarEstado(pedido: DetallePedidoApi) {
    this.idpedido = pedido.idDetalle;
    //pedido.usuario = localStorage.getItem('User');
    //alert(`Pedido #${pedido?.idPedido} de la Mesa ${pedido?.mesa} ha sido entregado.`);

    this._DetallePedidoService
      .ActualizarPedido(this.idpedido, pedido)
      .subscribe((e) => {
        if (e) {
          this.closePedidoListoModal();
          this.ObtenerPerdidos();
          this._notificacionService.showSucces(
            `Pedido #${pedido?.idPedido} de la Mesa ${pedido?.mesa} ha sido entregado.`
          );
        } else {
          this._notificacionService.showError('Error al actualizar Pedido');
        }
      });
  }

  /*fetchPedidos(): void {
    this.isLoading = true; // Start loading

    let pendingLoaded = false;
    let readyLoaded = false;

    const checkAllLoaded = () => {
      if (pendingLoaded && readyLoaded) {
        this.isLoading = false;
      }
    };

    // Fetch pending orders
    this._DetallePedidoService
      .ObtenerMesas()
      .pipe(
        finalize(() => {
          pendingLoaded = true;
          checkAllLoaded();
        })
      )
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
        },
      });

    // Fetch ready orders
    this._DetallePedidoService
      .ObtenerMesas()
      .pipe(
        finalize(() => {
          readyLoaded = true;
          checkAllLoaded();
        })
      )
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
        },
      });
  }*/

  openDetallePedidoModal(pedido: any): void {
    //this.selectedPedido = pedido;
    this.pedidoSeleccionado = pedido;
    this.selectedPedido.push(pedido);
    this.showDetallePedidoModal = true;
  }

  closeDetallePedidoModal(): void {
    this.showDetallePedidoModal = false;
    this.selectedPedido = [];
  }

  openPedidoListoModal(pedido: any): void {
    this.pedidoSeleccionado = pedido;
    this.selectedPedido.push(pedido);
    this.showPedidoListoModal = true;
  }

  closePedidoListoModal(): void {
    this.showPedidoListoModal = false;
    this.selectedPedido = [];
  }

  markPedidoAsReady(pedido: any): void {
    if (pedido && pedido.idPedido) {
      this.isLoading = true;
      this.apiService
        .actualizarEstadoPedido(pedido.idPedido, 'LIST')
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: () => {
            alert(`Pedido #${pedido.idPedido} marcado como LISTO.`);
            this.closeDetallePedidoModal();
            //this.fetchPedidos();
          },
          error: (err) => {
            console.error('Error al marcar pedido como listo:', err);
            alert('Error al marcar el pedido como listo.');
          },
        });
    }
  }

  confirmarEntrega(pedido: any): void {
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

  viewIngredients(idPlato: number): void {
    const plato = this.platosListFull.find((p) => p.idPlato === idPlato); // Search in the full list
    console.log(plato, idPlato);
    if (plato) {
      this.selectedPlatoNombre = plato.nombre;
    }

    this.apiService.getRecetaByPlatoId(idPlato).subscribe({
      next: (data) => {
        this.selectedReceta = data;
        this.showIngredientsModal = true;
      },
      error: (err) => {
        console.error('Error al cargar ingredientes:', err);
        this.selectedReceta = {
          idreceta: 0,
          idplato: idPlato,
          instrucciones: 'No se encontraron instrucciones para este plato.',
        };
        this.showIngredientsModal = true;
      },
    });
  }

  closeIngredientsModal(): void {
    this.showIngredientsModal = false;
    this.selectedReceta = null;
    this.selectedPlatoNombre = '';
  }

  onDragStart(item: any){
    this.dragItem = item
  }

  onDrop(){
    if(this.dragItem){
      this.PedidoCocinando.push(this.dragItem);
      this.pedidosPendientes = this.pedidosPendientes.filter(i => i !== this.dragItem);
      console.log(this.dragItem, "Aqui")
      this.ActualizarEstado(this.dragItem)
    }

    this.dragItem = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault()
  }

  onDragStart2(item: any){
    this.dragItem = item
  }

  onDrop2(){
    if(this.dragItem){
      this.pedidosListos.push(this.dragItem);
      this.PedidoCocinando = this.PedidoCocinando.filter(i => i !== this.dragItem);
      console.log(this.dragItem, "Aqui")
      this.ActualizarEstado(this.dragItem)
    }

    this.dragItem = null;
  }

  onDragOver2(event: DragEvent) {
    event.preventDefault()
  }
}
