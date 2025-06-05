using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FramaFoodBE.Models;

public class Receta
{
    [Key]
    [Column("IDRECETA")]
    public int IdReceta { get; set; }

    [Required]
    [Column("IDPLATO")]
    public int IdPlato { get; set; }

    [Required]
    [Column("INSTRUCCIONES")]
    public string Instrucciones { get; set; }

    [ForeignKey("IdPlato")]
    public virtual Plato Plato { get; set; }
}
