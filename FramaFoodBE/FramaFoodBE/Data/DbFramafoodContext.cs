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
        modelBuilder.Entity<Detallepedido>(entity =>
        {
            entity.HasKey(e => e.Iddetalle).HasName("PK__DETALLEP__A1AC0F6478C34C9E");

            entity.ToTable("DETALLEPEDIDO");

            entity.Property(e => e.Iddetalle).HasColumnName("IDDETALLE");
            entity.Property(e => e.Cantidad).HasColumnName("CANTIDAD");
            entity.Property(e => e.Estado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ESTADO");
            entity.Property(e => e.Idchef).HasColumnName("IDCHEF");
            entity.Property(e => e.Idpedido).HasColumnName("IDPEDIDO");
            entity.Property(e => e.Idplato).HasColumnName("IDPLATO");

            entity.HasOne(d => d.IdchefNavigation).WithMany(p => p.Detallepedidos)
                .HasForeignKey(d => d.Idchef)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CHEF_DET_PED");

            entity.HasOne(d => d.IdpedidoNavigation).WithMany(p => p.Detallepedidos)
                .HasForeignKey(d => d.Idpedido)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DETPED_DET_PED");

            entity.HasOne(d => d.IdplatoNavigation).WithMany(p => p.Detallepedidos)
                .HasForeignKey(d => d.Idplato)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MESERA_DET_PED");
        });

        modelBuilder.Entity<Factura>(entity =>
        {
            entity.HasKey(e => e.Idfactura).HasName("PK__FACTURAS__F7D4C9C73EADF83E");

            entity.ToTable("FACTURAS");

            entity.Property(e => e.Idfactura).HasColumnName("IDFACTURA");
            entity.Property(e => e.Fechahora)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("FECHAHORA");
            entity.Property(e => e.Idcajera).HasColumnName("IDCAJERA");
            entity.Property(e => e.Idpedido).HasColumnName("IDPEDIDO");
            entity.Property(e => e.Metodopago)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("METODOPAGO");
            entity.Property(e => e.Montototal)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("MONTOTOTAL");

            entity.HasOne(d => d.IdcajeraNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.Idcajera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FACT_CAJ");

            entity.HasOne(d => d.IdpedidoNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.Idpedido)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PED_FACT");
        });

        modelBuilder.Entity<Mesa>(entity =>
        {
            entity.HasKey(e => e.Idmesa).HasName("PK__MESAS__E01B9A4072CF4463");

            entity.ToTable("MESAS");

            entity.HasIndex(e => e.Numero, "INU_MES_NUM").IsUnique();

            entity.Property(e => e.Idmesa).HasColumnName("IDMESA");
            entity.Property(e => e.CantidadSilla).HasColumnName("CANTIDAD_SILLA");
            entity.Property(e => e.Estado)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ESTADO");
            entity.Property(e => e.Numero)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("NUMERO");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Idpedido).HasName("PK__PEDIDOS__769F9E4E98BD307D");

            entity.ToTable("PEDIDOS");

            entity.Property(e => e.Idpedido).HasColumnName("IDPEDIDO");
            entity.Property(e => e.Estado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ESTADO");
            entity.Property(e => e.Fechahora)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("FECHAHORA");
            entity.Property(e => e.Idmesa).HasColumnName("IDMESA");
            entity.Property(e => e.Idmesera).HasColumnName("IDMESERA");

            entity.HasOne(d => d.IdmesaNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.Idmesa)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MESA_PED");

            entity.HasOne(d => d.IdmeseraNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.Idmesera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MESERA_PED");
        });

        modelBuilder.Entity<Plato>(entity =>
        {
            entity.HasKey(e => e.Idplato).HasName("PK__PLATOS__73DE24698622C661");

            entity.ToTable("PLATOS");

            entity.Property(e => e.Idplato).HasColumnName("IDPLATO");
            entity.Property(e => e.Categoria)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("CATEGORIA");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("DESCRIPCION");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.Precio)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("PRECIO");
        });

        modelBuilder.Entity<Receta>(entity =>
        {
            entity.HasKey(e => e.Idreceta).HasName("PK__RECETAS__6C666F75DDE85BD6");

            entity.ToTable("RECETAS");

            entity.Property(e => e.Idreceta).HasColumnName("IDRECETA");
            entity.Property(e => e.Idplato).HasColumnName("IDPLATO");
            entity.Property(e => e.Instrucciones)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("INSTRUCCIONES");

            entity.HasOne(d => d.IdplatoNavigation).WithMany(p => p.Receta)
                .HasForeignKey(d => d.Idplato)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_REC_PLA");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Idrol).HasName("PK__ROLES__A686519EB2142B72");

            entity.ToTable("ROLES");

            entity.Property(e => e.Idrol).HasColumnName("IDROL");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Idusuario).HasName("PK__USUARIOS__98242AA910E55D33");

            entity.ToTable("USUARIOS");

            entity.HasIndex(e => e.Usuariologin, "INU_USU_USULOGIN").IsUnique();

            entity.Property(e => e.Idusuario).HasColumnName("IDUSUARIO");
            entity.Property(e => e.Contrasena)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONTRASENA");
            entity.Property(e => e.Estado)
                .HasDefaultValue(true)
                .HasColumnName("ESTADO");
            entity.Property(e => e.Idrol).HasColumnName("IDROL");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.Usuariologin)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("USUARIOLOGIN");

            entity.HasOne(d => d.IdrolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.Idrol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ROL_USU");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
