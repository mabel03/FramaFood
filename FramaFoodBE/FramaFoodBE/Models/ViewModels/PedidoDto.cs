namespace FramaFoodBE.Models.ViewModels
{
    public class PedidoDto
    {
        public int IdPedido { get; set; }
        public int IdMesa { get; set; }
        public string NumeroMesa { get; set; } 
        public int IdMesera { get; set; }
        public string NombreMesera { get; set; } 
        public DateTime FechaHora { get; set; }
        public string Estado { get; set; }
        public int CantidadPlatos { get; set; }
        public List<DetallePedidoDto> DetallePlatos { get; set; }
    }
}
