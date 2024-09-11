using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.ManufacturerDb
{
    /// <inheritdoc />
    public partial class ManufacturerTableSetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Manufacturers",
                columns: table => new
                {
                    ManufactureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ManufactureName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManufactureFeaturedStatus = table.Column<bool>(type: "bit", nullable: false),
                    ManufactureDisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manufacturers", x => x.ManufactureId);
                });

            migrationBuilder.InsertData(
                table: "Manufacturers",
                columns: new[] { "ManufactureId", "ManufactureDisplayOrder", "ManufactureFeaturedStatus", "ManufactureName" },
                values: new object[,]
                {
                    { 1, 0, false, "Acer" },
                    { 2, 0, false, "Adidas" },
                    { 3, 0, false, "Apple" },
                    { 4, 0, false, "BOSS" },
                    { 5, 0, false, "BlackBerry" },
                    { 6, 0, false, "Casio" },
                    { 7, 0, false, "Converse" },
                    { 8, 0, false, "Daiber" },
                    { 9, 0, false, "Dell" },
                    { 10, 0, false, "EA Sports" },
                    { 11, 0, false, "HP" },
                    { 12, 0, false, "HTC" },
                    { 13, 0, false, "LG" },
                    { 14, 0, false, "MSI" },
                    { 15, 0, false, "Nike" },
                    { 16, 0, false, "Panasonic" },
                    { 17, 0, false, "Puma" },
                    { 18, 0, false, "Samsung" },
                    { 19, 0, false, "Sony" },
                    { 20, 0, false, "Wilson" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Manufacturers");
        }
    }
}
