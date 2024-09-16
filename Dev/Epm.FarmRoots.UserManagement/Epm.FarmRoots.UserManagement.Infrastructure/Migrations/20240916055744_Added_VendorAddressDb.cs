using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epm.FarmRoots.UserManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Added_VendorAddressDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VendorAddressDb",
                columns: table => new
                {
                    VendorAddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VendorShopName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false, comment: "Shop name must be between 3 and 100 characters long, including letters, numbers, spaces, and certain special characters like hyphens, apostrophes, and periods."),
                    HouseNoAndFloor = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BuildingAndBlockNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Pincode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    LandmarkAndAreaName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    VendorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorAddressDb", x => x.VendorAddressId);
                    table.ForeignKey(
                        name: "FK_VendorAddressDb_VendorDb_VendorId",
                        column: x => x.VendorId,
                        principalTable: "VendorDb",
                        principalColumn: "VendorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VendorAddressDb_VendorId",
                table: "VendorAddressDb",
                column: "VendorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VendorAddressDb");
        }
    }
}
