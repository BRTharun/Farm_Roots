using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.UserManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Added_CustomerDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "VendorDb",
                newName: "VendorId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "VendorDb",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(40)",
                oldMaxLength: 40);

            migrationBuilder.CreateTable(
                name: "CustomerAddressDb",
                columns: table => new
                {
                    CustomerAddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HouseNoAndFloor = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BuildingAndBlockNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Pincode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    LandmarkAndAreaName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerAddressDb", x => x.CustomerAddressId);
                    table.ForeignKey(
                        name: "FK_CustomerAddressDb_CustomerDb_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "CustomerDb",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerAddressDb_CustomerId",
                table: "CustomerAddressDb",
                column: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerAddressDb");

            migrationBuilder.RenameColumn(
                name: "VendorId",
                table: "VendorDb",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "VendorDb",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);
        }
    }
}
