using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FramaFoodBE.Models;

public class Mesa
{
    [Key]
    [Column("IDMESA")]
    public int IdMesa { get; set; }

    [Required]
    [Column("NUMERO")]
    public string Numero { get; set; }

    [Required]
    [Column("CANTIDAD_SILLA")]
    public int CantidadSilla { get; set; }

    [Required]
    [Column("ESTADO")]
    public string Estado { get; set; }
}
