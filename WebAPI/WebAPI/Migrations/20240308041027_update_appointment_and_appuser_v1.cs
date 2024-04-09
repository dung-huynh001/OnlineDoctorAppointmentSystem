using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class update_appointment_and_appuser_v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Passwordrecoveryque3",
                table: "Users",
                newName: "PasswordRecoveryQue3");

            migrationBuilder.RenameColumn(
                name: "Passwordrecoveryque2",
                table: "Users",
                newName: "PasswordRecoveryQue2");

            migrationBuilder.RenameColumn(
                name: "Passwordrecoveryque1",
                table: "Users",
                newName: "PasswordRecoveryQue1");

            migrationBuilder.RenameColumn(
                name: "Passwordrecoveryans3",
                table: "Users",
                newName: "PasswordRecoveryAns3");

            migrationBuilder.RenameColumn(
                name: "Passwordrecoveryans2",
                table: "Users",
                newName: "PasswordRecoveryAns2");

            migrationBuilder.RenameColumn(
                name: "Passwordrecoveryans1",
                table: "Users",
                newName: "PasswordRecoveryAns1");

            migrationBuilder.RenameColumn(
                name: "DeletedFlag",
                table: "Users",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "Existingillness",
                table: "Appointments",
                newName: "ExistingIllness");

            migrationBuilder.RenameColumn(
                name: "Drugallergies",
                table: "Appointments",
                newName: "DrugAllergies");

            migrationBuilder.RenameColumn(
                name: "AppoimentStatus",
                table: "Appointments",
                newName: "AppointmentStatus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PasswordRecoveryQue3",
                table: "Users",
                newName: "Passwordrecoveryque3");

            migrationBuilder.RenameColumn(
                name: "PasswordRecoveryQue2",
                table: "Users",
                newName: "Passwordrecoveryque2");

            migrationBuilder.RenameColumn(
                name: "PasswordRecoveryQue1",
                table: "Users",
                newName: "Passwordrecoveryque1");

            migrationBuilder.RenameColumn(
                name: "PasswordRecoveryAns3",
                table: "Users",
                newName: "Passwordrecoveryans3");

            migrationBuilder.RenameColumn(
                name: "PasswordRecoveryAns2",
                table: "Users",
                newName: "Passwordrecoveryans2");

            migrationBuilder.RenameColumn(
                name: "PasswordRecoveryAns1",
                table: "Users",
                newName: "Passwordrecoveryans1");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Users",
                newName: "DeletedFlag");

            migrationBuilder.RenameColumn(
                name: "ExistingIllness",
                table: "Appointments",
                newName: "Existingillness");

            migrationBuilder.RenameColumn(
                name: "DrugAllergies",
                table: "Appointments",
                newName: "Drugallergies");

            migrationBuilder.RenameColumn(
                name: "AppointmentStatus",
                table: "Appointments",
                newName: "AppoimentStatus");
        }
    }
}
