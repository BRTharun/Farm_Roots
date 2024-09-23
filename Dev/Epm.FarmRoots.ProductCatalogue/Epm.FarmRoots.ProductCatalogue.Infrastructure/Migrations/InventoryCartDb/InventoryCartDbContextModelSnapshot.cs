﻿// <auto-generated />
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.InventoryCartDb
{
    [DbContext(typeof(InventoryCartDbContext))]
    partial class InventoryCartDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Epm.FarmRoots.ProductCatalogue.Core.Entities.Inventory", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProductId"));

                    b.Property<int>("ProductMaxCartQuantity")
                        .HasColumnType("int");

                    b.Property<int>("ProductMinCartQuantity")
                        .HasColumnType("int");

                    b.Property<int>("ProductStockQuantity")
                        .HasColumnType("int");

                    b.HasKey("ProductId");

                    b.ToTable("Inventories", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}