namespace FramaFoodBE.Models.ViewModels
{
    public class CreatePedidoDto
    {
        public int IDMESA { get; set; }
        public int IDMESERA { get; set; }
        public string? comentario { get; set; }
        public int cantidad { get; set; }
        public string usuario { get; set; }
        public List<ViewDetallePedidos>? Detalles { get; set; } = new List<ViewDetallePedidos>();
    }
}
