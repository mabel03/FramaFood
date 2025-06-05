using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FramaFoodBE.Models;

[Table("DETALLEPEDIDO")]
public class Detallepedido
{
    [Key]
    [Column("IDDETALLE")]
    public int IdDetalle { get; set; }

    [Required]
    [Column("IDPEDIDO")]
    public int IdPedido { get; set; }

    [Required]
    [Column("IDPLATO")]
    public int IdPlato { get; set; }

    [Required]
    [Column("IDCHEF")]
    public int IdChef { get; set; }

    [Column("COMENTARIO")]
    public string Comentario { get; set; }    
    
    [Column("CANTIDAD")]
    public int Cantidad { get; set; }

    [Required]
    [Column("ESTADO")]
    public string Estado { get; set; }

    [ForeignKey("IdPedido")]
    public virtual Pedido Pedido { get; set; }

    [ForeignKey("IdPlato")]
    public virtual Plato Plato { get; set; }

    [ForeignKey("IdChef")]
    public virtual Usuario Usuario { get; set; }

}
