using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedNamingConventions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Stock",
                table: "InventoryItems",
                newName: "ProductStock");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "InventoryItems",
                newName: "ProductStatus");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "InventoryItems",
                newName: "ProductName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "InventoryItems",
                newName: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductStock",
                table: "InventoryItems",
                newName: "Stock");

            migrationBuilder.RenameColumn(
                name: "ProductStatus",
                table: "InventoryItems",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "ProductName",
                table: "InventoryItems",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "InventoryItems",
                newName: "Id");
        }
    }
}
