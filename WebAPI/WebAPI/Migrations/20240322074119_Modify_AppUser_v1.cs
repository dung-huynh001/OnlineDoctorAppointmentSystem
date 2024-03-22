using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class Modify_AppUser_v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordRecoveryAns1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordRecoveryAns2",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordRecoveryAns3",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordRecoveryQue1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordRecoveryQue2",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordRecoveryQue3",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "Users",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "PasswordRecoveryAns1",
                table: "Users",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordRecoveryAns2",
                table: "Users",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordRecoveryAns3",
                table: "Users",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PasswordRecoveryQue1",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PasswordRecoveryQue2",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PasswordRecoveryQue3",
                table: "Users",
                type: "int",
                nullable: true);
        }
    }
}
