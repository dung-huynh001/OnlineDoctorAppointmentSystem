using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class SeedData_SystemPara_v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "SystemParas",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Groupid", "IsDeleted", "Note", "Paraid", "Paraval", "UpdatedBy", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(429), "Frequency", false, "", "freq_1", "2 times a day", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(442) },
                    { 2, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(452), "Frequency", false, "", "freq_2", "Daily", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(453) },
                    { 3, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(457), "Frequency", false, "", "freq_3", "4 Hourly", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(458) },
                    { 4, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(462), "Frequency", false, "", "freq_4", "Only Morning", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(463) },
                    { 5, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(466), "Frequency", false, "", "freq_5", "Only Night", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(467) },
                    { 6, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(476), "Unit", false, "", "unit_6", "pills", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(476) },
                    { 7, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(482), "Unit", false, "", "unit_7", "mg", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(482) },
                    { 8, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(487), "Unit", false, "", "unit_8", "ml", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(488) },
                    { 9, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(603), "Unit", false, "", "unit_9", "grains", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(603) },
                    { 10, "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(607), "Unit", false, "", "unit_10", "capsules", "system", new DateTime(2024, 4, 19, 16, 57, 11, 180, DateTimeKind.Local).AddTicks(609) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "SystemParas",
                keyColumn: "Id",
                keyValue: 10);
        }
    }
}
