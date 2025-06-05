using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FramaFoodBE.Models;

public class Pedido
{
    [Key]
    [Column("IDPEDIDO")]
    public int IdPedido { get; set; }

    [Required]
    [Column("IDMESA")]
    public int IdMesa { get; set; }

    [Required]
    [Column("IDMESERA")]
    public int IdMesera { get; set; }

    [Required]
    [Column("FECHAHORA")]
    public DateTime FechaHora { get; set; }

    [Column("COMENTARIO")]
    public string Comentario { get; set; }

    [Required]
    [Column("CANTIDAD")]
    public int Cantidad { get; set; }

    [Required]
    [Column("ESTADO")]
    public string Estado { get; set; }

    [ForeignKey("IdMesa")]
    public virtual Mesa Mesa { get; set; }

    [ForeignKey("IdMesera")]
    public virtual Usuario Mesera { get; set; }
}
