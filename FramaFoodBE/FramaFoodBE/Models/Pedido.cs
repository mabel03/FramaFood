using System;
using System.Collections.Generic;

namespace FramaFoodBE.Models;

public partial class Pedido
{
    public int Idpedido { get; set; }

    public int Idmesa { get; set; }

    public int Idmesera { get; set; }

    public DateTime Fechahora { get; set; }

    public string Estado { get; set; } = null!;

    public virtual ICollection<Detallepedido> Detallepedidos { get; set; } = new List<Detallepedido>();

    public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();

    public virtual Mesa IdmesaNavigation { get; set; } = null!;

    public virtual Usuario IdmeseraNavigation { get; set; } = null!;
}
