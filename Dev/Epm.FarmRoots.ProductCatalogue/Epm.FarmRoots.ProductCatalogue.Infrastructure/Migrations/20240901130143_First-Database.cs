using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FirstDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ProductDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ProductCategory = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ProductStock = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    ProductMrp = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    ProductSale_Price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    ProductImage = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
