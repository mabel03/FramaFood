using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FramaFoodBE.Models;

public class Factura
{
    [Key]
    [Column("IDFACTURA")]
    public int IdFactura { get; set; }

    [Required]
    [Column("IDPEDIDO")]
    public int IdPedido { get; set; }

    [Required]
    [Column("IDCAJERA")]
    public int IdCajera { get; set; }

    [Required]
    [Column("MONTOTOTAL")]
    public decimal MontoTotal { get; set; }

    [Required]
    [Column("FECHAHORA")]
    public DateTime FechaHora { get; set; }

    [Required]
    [Column("METODOPAGO")]
    public string MetodoPago { get; set; }

    [ForeignKey("IdPedido")]
    public virtual Pedido Pedido { get; set; }

    [ForeignKey("IdCajera")]
    public virtual Usuario Cajera { get; set; }
}
