using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.PriceDb
{
    /// <inheritdoc />
    public partial class PriceDbadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Prices",
                columns: table => new
                {
                    PriceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SalePrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Mrp = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SpecialPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SpecialPriceFromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SpecialPriceToDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProductCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsBuyButtonDisabled = table.Column<bool>(type: "bit", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prices", x => x.PriceId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Prices");
        }
    }
}
