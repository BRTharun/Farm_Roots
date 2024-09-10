using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.ManufacturerDb
{
    /// <inheritdoc />
    public partial class UpdatedtheManufacturerNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 20);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 1,
                column: "ManufactureName",
                value: "Dole Food Company");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 2,
                column: "ManufactureName",
                value: "Driscoll’s");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 3,
                column: "ManufactureName",
                value: "Chiquita Brands International");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 4,
                column: "ManufactureName",
                value: "Green Giant");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 5,
                column: "ManufactureName",
                value: "The Little Potato Company");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 6,
                column: "ManufactureName",
                value: "Tyson Foods");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 7,
                column: "ManufactureName",
                value: "Danone");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 8,
                column: "ManufactureName",
                value: "Coca-Cola");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 9,
                column: "ManufactureName",
                value: "PepsiCo");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 10,
                column: "ManufactureName",
                value: "General Mills");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 11,
                column: "ManufactureName",
                value: "Lay's");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 12,
                column: "ManufactureName",
                value: "Haldiram's");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 13,
                column: "ManufactureName",
                value: "Dettol");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 14,
                column: "ManufactureName",
                value: "Nestlé");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 15,
                column: "ManufactureName",
                value: "Dove");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 1,
                column: "ManufactureName",
                value: "Acer");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 2,
                column: "ManufactureName",
                value: "Adidas");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 3,
                column: "ManufactureName",
                value: "Apple");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 4,
                column: "ManufactureName",
                value: "BOSS");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 5,
                column: "ManufactureName",
                value: "BlackBerry");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 6,
                column: "ManufactureName",
                value: "Casio");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 7,
                column: "ManufactureName",
                value: "Converse");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 8,
                column: "ManufactureName",
                value: "Daiber");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 9,
                column: "ManufactureName",
                value: "Dell");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 10,
                column: "ManufactureName",
                value: "EA Sports");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 11,
                column: "ManufactureName",
                value: "HP");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 12,
                column: "ManufactureName",
                value: "HTC");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 13,
                column: "ManufactureName",
                value: "LG");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 14,
                column: "ManufactureName",
                value: "MSI");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 15,
                column: "ManufactureName",
                value: "Nike");

            migrationBuilder.InsertData(
                table: "Manufacturers",
                columns: new[] { "ManufactureId", "ManufactureDisplayOrder", "ManufactureFeaturedStatus", "ManufactureName" },
                values: new object[,]
                {
                    { 16, 0, false, "Panasonic" },
                    { 17, 0, false, "Puma" },
                    { 18, 0, false, "Samsung" },
                    { 19, 0, false, "Sony" },
                    { 20, 0, false, "Wilson" }
                });
        }
    }
}
