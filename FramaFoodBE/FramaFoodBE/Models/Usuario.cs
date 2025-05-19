using System;
using System.Collections.Generic;

namespace FramaFoodBE.Models;

public partial class Usuario
{
    public int Idusuario { get; set; }

    public int Idrol { get; set; }

    public string Nombre { get; set; } = null!;

    public string Usuariologin { get; set; } = null!;

    public string Contrasena { get; set; } = null!;

    public bool Estado { get; set; }

    public virtual ICollection<Detallepedido> Detallepedidos { get; set; } = new List<Detallepedido>();

    public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();

    public virtual Role IdrolNavigation { get; set; } = null!;

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
