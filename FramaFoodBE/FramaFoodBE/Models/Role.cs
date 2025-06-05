using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FramaFoodBE.Models;

public class Role
{
    [Key]
    [Column("IDROL")]
    public int Idrol { get; set; }

    [Required]
    [Column("NOMBRE")]
    [StringLength(50)]
    public string Nombre { get; set; }
}
