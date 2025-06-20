namespace FramaFoodBE.Models.ViewModels
{
    public class DetallePedidoDto
    {
        public int IdDetalle { get; set; }
        public int IdPlato { get; set; }
        public int IdPedido { get; set; }
        public string NombrePlato { get; set; }
        public int Cantidad { get; set; }
        public string Estado { get; set; }
        public string Comentario { get; set; }
        public int IdChef { get; set; }
        public string Mesa { get; set; }
    }
}
