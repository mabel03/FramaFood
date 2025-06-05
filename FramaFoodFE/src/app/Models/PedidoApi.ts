import { DetallePedidoApi } from "./DetallePedidoApi";

export interface PedidoApi {
  idPedido: number;
  idMesa: number;
  numeroMesa: string;
  idMesera: number;
  nombreMesera: string;
  fechaHora: string;
  estado: string;
  cantidadPlatos: number;
  detallePlatos: DetallePedidoApi[];
}