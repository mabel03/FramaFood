import { Plato } from "./plato";

export interface DetallePedidoApi {
  idDetalle: number;
  idPedido: number;
  idPlato: number;
  idChef: number;
  comentario: string | null;
  cantidad: number;
  pedido: number
  plato: number
  usuario:string
  nombrePlato: string;
  mesa: string;
  estado: string
  Plato: Plato
}