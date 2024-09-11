using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.ManufacturerDb
{
    /// <inheritdoc />
    public partial class AddedIsActivecolumninManufacturer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Manufacturers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 1,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 2,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 3,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 4,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 5,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 6,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 7,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 8,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 9,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 10,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 11,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 12,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 13,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 14,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufactureId",
                keyValue: 15,
                column: "IsActive",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Manufacturers");
        }
    }
}
