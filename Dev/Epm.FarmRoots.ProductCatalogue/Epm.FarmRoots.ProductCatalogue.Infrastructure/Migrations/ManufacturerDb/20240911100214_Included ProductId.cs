using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.ManufacturerDb
{
    /// <inheritdoc />
    public partial class IncludedProductId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Manufacturers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 1,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 2,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 3,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 4,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 5,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 6,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 7,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 8,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 9,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 10,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 11,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 12,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 13,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 14,
                column: "ProductId",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 15,
                column: "ProductId",
                value: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Manufacturers");
        }
    }
}
