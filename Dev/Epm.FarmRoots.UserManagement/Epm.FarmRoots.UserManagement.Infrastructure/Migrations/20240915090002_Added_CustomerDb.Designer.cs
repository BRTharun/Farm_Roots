﻿// <auto-generated />
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Epm.FarmRoots.UserManagement.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240915090002_Added_CustomerDb")]
    partial class Added_CustomerDb
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Epm.FarmRoots.UserManagement.Core.Entities.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CustomerId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasAnnotation("EmailAddress", "EmailAddress")
                        .HasAnnotation("ErrorMessage", "Email cannot be longer than 50 characters.");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasAnnotation("ErrorMessage", "Name cannot be longer than 20 characters.");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasAnnotation("DataType", "Password")
                        .HasAnnotation("ErrorMessage", "Password is required.");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)")
                        .HasAnnotation("ErrorMessage", "Phone number must be exactly 10 digits.");

                    b.HasKey("CustomerId");

                    b.ToTable("CustomerDb");
                });

            modelBuilder.Entity("Epm.FarmRoots.UserManagement.Core.Entities.CustomerAddress", b =>
                {
                    b.Property<int>("CustomerAddressId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CustomerAddressId"));

                    b.Property<string>("BuildingAndBlockNo")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("CustomerId")
                        .HasColumnType("int");

                    b.Property<string>("HouseNoAndFloor")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("LandmarkAndAreaName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Pincode")
                        .IsRequired()
                        .HasMaxLength(6)
                        .HasColumnType("nvarchar(6)");

                    b.HasKey("CustomerAddressId");

                    b.HasIndex("CustomerId");

                    b.ToTable("CustomerAddressDb");
                });

            modelBuilder.Entity("Epm.FarmRoots.UserManagement.Core.Entities.Vendor", b =>
                {
                    b.Property<int>("VendorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("VendorId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasAnnotation("EmailAddress", "EmailAddress")
                        .HasAnnotation("ErrorMessage", "Email cannot be longer than 50 characters.");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasAnnotation("ErrorMessage", "Name cannot be longer than 40 characters.");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasAnnotation("DataType", "Password")
                        .HasAnnotation("ErrorMessage", "Password is required.");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)")
                        .HasAnnotation("ErrorMessage", "Phone number must be exactly 10 digits.");

                    b.HasKey("VendorId");

                    b.ToTable("VendorDb");
                });

            modelBuilder.Entity("Epm.FarmRoots.UserManagement.Core.Entities.CustomerAddress", b =>
                {
                    b.HasOne("Epm.FarmRoots.UserManagement.Core.Entities.Customer", "Customer")
                        .WithMany("CustomerAddresses")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("Epm.FarmRoots.UserManagement.Core.Entities.Customer", b =>
                {
                    b.Navigation("CustomerAddresses");
                });
#pragma warning restore 612, 618
        }
    }
}