﻿// <auto-generated />
using Epm.FarmRoots.ProductCatalogue.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.ImageDb
{
    [DbContext(typeof(ImageDbContext))]
    [Migration("20240909073048_AddingImageDb")]
    partial class AddingImageDb
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Epm.FarmRoots.ProductCatalogue.Core.Entities.Images", b =>
                {
                    b.Property<int>("ImagesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ImagesId"));

                    b.Property<byte[]>("ImageData")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("ImageUrl")
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.HasKey("ImagesId");

                    b.ToTable("Images");
                });
#pragma warning restore 612, 618
        }
    }
}