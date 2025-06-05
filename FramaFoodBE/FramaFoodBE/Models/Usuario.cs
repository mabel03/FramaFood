using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FramaFoodBE.Models;

public class Usuario
{
    [Key]
    [Column("IDUSUARIO")]
    public int Idusuario { get; set; }

    [Required]
    [Column("IDROL")]
    public int Idrol { get; set; }

    [ForeignKey("Idrol")]
    public virtual Role Role { get; set; }

    [Required]
    [Column("NOMBRE")]
    [StringLength(100)]
    public string Nombre { get; set; }

    [Required]
    [Column("USUARIOLOGIN")]
    [StringLength(50)]
    public string Usuariologin { get; set; }

    [Required]
    [Column("CONTRASENA")]
    [StringLength(255)]
    public string Contrasena { get; set; }

    [Required]
    [Column("ESTADO")]
    public bool Estado { get; set; } = true;
}
