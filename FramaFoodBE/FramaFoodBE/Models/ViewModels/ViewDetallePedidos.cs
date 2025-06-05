namespace FramaFoodBE.Models.ViewModels
{
    public class ViewDetallePedidos
    {

        public int Idpedido { get; set; }

        public int Idplato { get; set; }

        public int? Idchef { get; set; }

        public int Cantidad { get; set; }
        public string? Comentario { get; set; }

        public string Estado { get; set; } = null!;
    }
}
