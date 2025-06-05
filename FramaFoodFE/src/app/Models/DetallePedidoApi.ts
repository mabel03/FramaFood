export interface DetallePedidoApi {
  idDetalle: number;
  idPlato: number;
  nombrePlato: string;
  cantidad: number;
  estadoDetalle: string;
  comentario: string | null;
  idChef: number;
}