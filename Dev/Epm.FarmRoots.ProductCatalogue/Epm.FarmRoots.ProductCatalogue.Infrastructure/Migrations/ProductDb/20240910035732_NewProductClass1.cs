using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Migrations.ProductDb
{
    /// <inheritdoc />
    public partial class NewProductClass1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
