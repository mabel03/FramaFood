using System;
using System.Collections.Generic;

namespace FramaFoodBE.Models;

public partial class Detallepedido
{
    public int Iddetalle { get; set; }

    public int Idpedido { get; set; }

    public int Idplato { get; set; }

    public int Idchef { get; set; }

    public int Cantidad { get; set; }

    public string Estado { get; set; } = null!;

    public virtual Usuario IdchefNavigation { get; set; } = null!;

    public virtual Pedido IdpedidoNavigation { get; set; } = null!;

    public virtual Plato IdplatoNavigation { get; set; } = null!;
}
