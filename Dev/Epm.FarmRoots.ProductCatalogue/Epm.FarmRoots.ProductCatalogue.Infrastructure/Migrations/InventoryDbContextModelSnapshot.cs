﻿// <auto-generated />
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations
{
    [DbContext(typeof(InventoryDbContext))]
    partial class InventoryDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Epm.FarmRoots.ProductCatalogue.Core.Entities.InventoryItem", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProductId"));

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("ProductName")
                        .HasComment("Name must be between 3 and 100 characters long.");

                    b.Property<bool>("ProductStatus")
                        .HasColumnType("bit")
                        .HasColumnName("ProductStatus");

                    b.Property<int>("ProductStock")
                        .HasColumnType("int")
                        .HasColumnName("ProductStock")
                        .HasComment("Stock must be a non-negative number.")
                        .HasAnnotation("Range", new[] { 0, 2147483647 });

                    b.HasKey("ProductId");

                    b.ToTable("InventoryItems");
                });
#pragma warning restore 612, 618
        }
    }
}
