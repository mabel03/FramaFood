using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FramaFoodBE.Models;

public class Plato
{
    [Key]
    [Column("IDPLATO")]
    public int IdPlato { get; set; }

    [Required]
    [Column("NOMBRE")]
    public string Nombre { get; set; }

    [Required]
    [Column("DESCRIPCION")]
    public string Descripcion { get; set; }

    [Required]
    [Column("PRECIO")]
    public decimal Precio { get; set; }

    [Required]
    [Column("CATEGORIA")]
    public string Categoria { get; set; }
}
