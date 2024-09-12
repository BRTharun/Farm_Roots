﻿// <auto-generated />
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.ManufacturerDb
{
    [DbContext(typeof(ManufacturerDbContext))]
    partial class ManufacturerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Epm.FarmRoots.ProductCatalogue.Core.Entities.Manufacturer", b =>
                {
                    b.Property<int>("ManufactureId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ManufactureId"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int>("ManufactureDisplayOrder")
                        .HasColumnType("int");

                    b.Property<bool>("ManufactureFeaturedStatus")
                        .HasColumnType("bit");

                    b.Property<string>("ManufactureName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.HasKey("ManufactureId");

                    b.ToTable("Manufacturers", (string)null);

                    b.HasData(
                        new
                        {
                            ManufactureId = 1,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Dole Food Company",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 2,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Driscoll’s",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 3,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Chiquita Brands International",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 4,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Green Giant",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 5,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "The Little Potato Company",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 6,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Tyson Foods",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 7,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Danone",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 8,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Coca-Cola",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 9,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "PepsiCo",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 10,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "General Mills",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 11,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Lay's",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 12,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Haldiram's",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 13,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Dettol",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 14,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Nestlé",
                            ProductId = 0
                        },
                        new
                        {
                            ManufactureId = 15,
                            IsActive = true,
                            ManufactureDisplayOrder = 0,
                            ManufactureFeaturedStatus = false,
                            ManufactureName = "Dove",
                            ProductId = 0
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
