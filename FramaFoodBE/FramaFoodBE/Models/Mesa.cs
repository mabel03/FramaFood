using System;
using System.Collections.Generic;

namespace FramaFoodBE.Models;

public partial class Mesa
{
    public int Idmesa { get; set; }

    public string Numero { get; set; } = null!;

    public int CantidadSilla { get; set; }

    public string Estado { get; set; } = null!;

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
