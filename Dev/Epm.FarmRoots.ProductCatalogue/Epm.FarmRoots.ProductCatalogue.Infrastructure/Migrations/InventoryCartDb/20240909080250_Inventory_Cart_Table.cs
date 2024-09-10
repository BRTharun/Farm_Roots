using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.InventoryCartDb
{
    /// <inheritdoc />
    public partial class Inventory_Cart_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductStockQuantity = table.Column<int>(type: "int", nullable: false),
                    ProductMinCartQuantity = table.Column<int>(type: "int", nullable: false),
                    ProductMaxCartQuantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.ProductId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inventories");
        }
    }
}
