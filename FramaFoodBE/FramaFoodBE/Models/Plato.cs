using System;
using System.Collections.Generic;

namespace FramaFoodBE.Models;

public partial class Plato
{
    public int Idplato { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public decimal Precio { get; set; }

    public string Categoria { get; set; } = null!;

    public virtual ICollection<Detallepedido> Detallepedidos { get; set; } = new List<Detallepedido>();

    public virtual ICollection<Receta> Receta { get; set; } = new List<Receta>();
}
