﻿// <auto-generated />
using System;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.PriceDb
{
    [DbContext(typeof(PriceDbContext))]
    partial class PriceDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Epm.FarmRoots.ProductCatalogue.Core.Entities.Price", b =>
                {
                    b.Property<int>("PriceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PriceId"));

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<bool>("IsBuyButtonDisabled")
                        .HasColumnType("bit");

                    b.Property<decimal>("Mrp")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<decimal>("ProductCost")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("SalePrice")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<decimal>("SpecialPrice")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("SpecialPriceFromDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("SpecialPriceToDate")
                        .HasColumnType("datetime2");

                    b.HasKey("PriceId");

                    b.ToTable("Prices");
                });
#pragma warning restore 612, 618
        }
    }
}
