using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class Remove_AppointmentPrescription_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentPrescriptions");

            migrationBuilder.AddColumn<int>(
                name: "AppointmentId",
                table: "Prescriptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_8_FK",
                table: "Prescriptions",
                column: "AppointmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Appointments_AppointmentId",
                table: "Prescriptions",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Appointments_AppointmentId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_8_FK",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "AppointmentId",
                table: "Prescriptions");

            migrationBuilder.CreateTable(
                name: "AppointmentPrescriptions",
                columns: table => new
                {
                    PrecriptionId = table.Column<int>(type: "int", nullable: false),
                    AppointmentId = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentPrescriptions", x => new { x.PrecriptionId, x.AppointmentId });
                    table.ForeignKey(
                        name: "FK_AppointmentPrescriptions_Appointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "Appointments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AppointmentPrescriptions_Prescriptions_PrecriptionId",
                        column: x => x.PrecriptionId,
                        principalTable: "Prescriptions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_12_FK",
                table: "AppointmentPrescriptions",
                column: "PrecriptionId");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_15_FK",
                table: "AppointmentPrescriptions",
                column: "AppointmentId");
        }
    }
}
