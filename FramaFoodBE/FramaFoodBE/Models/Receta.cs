using System;
using System.Collections.Generic;

namespace FramaFoodBE.Models;

public partial class Receta
{
    public int Idreceta { get; set; }

    public int Idplato { get; set; }

    public string Instrucciones { get; set; } = null!;

    public virtual Plato IdplatoNavigation { get; set; } = null!;
}
