using System;
using System.Collections.Generic;
using FramaFoodBE.Models;
using Microsoft.EntityFrameworkCore;


namespace FramaFoodBE.Data;

public partial class DbFramafoodContext : DbContext
{
    public DbFramafoodContext()
    {
    }

    public DbFramafoodContext(DbContextOptions<DbFramafoodContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Detallepedido> Detallepedidos { get; set; }

    public virtual DbSet<Factura> Facturas { get; set; }

    public virtual DbSet<Mesa> Mesas { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Plato> Platos { get; set; }

    public virtual DbSet<Receta> Recetas { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DbFramafoodContext).Assembly);
    }

}
