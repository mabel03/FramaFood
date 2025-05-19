using System;
using System.Collections.Generic;

namespace FramaFoodBE.Models;

public partial class Factura
{
    public int Idfactura { get; set; }

    public int Idpedido { get; set; }

    public int Idcajera { get; set; }

    public decimal Montototal { get; set; }

    public DateTime Fechahora { get; set; }

    public string Metodopago { get; set; } = null!;

    public virtual Usuario IdcajeraNavigation { get; set; } = null!;

    public virtual Pedido IdpedidoNavigation { get; set; } = null!;
}
