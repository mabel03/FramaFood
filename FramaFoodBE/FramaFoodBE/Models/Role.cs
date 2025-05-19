using System;
using System.Collections.Generic;

namespace FramaFoodBE.Models;

public partial class Role
{
    public int Idrol { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
