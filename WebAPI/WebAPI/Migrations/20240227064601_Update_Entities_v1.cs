using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class Update_Entities_v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleClaims_ROLE_RoleId",
                table: "RoleClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_UserClaims_USER_UserId",
                table: "UserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLogins_USER_UserId",
                table: "UserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_ROLE_RoleId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_USER_UserId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTokens_USER_UserId",
                table: "UserTokens");

            migrationBuilder.DropTable(
                name: "APPOINTMENT_PRESCRIPTION");

            migrationBuilder.DropTable(
                name: "ROLE");

            migrationBuilder.DropTable(
                name: "SYSTEM_PARA");

            migrationBuilder.DropTable(
                name: "APPOINTMENT");

            migrationBuilder.DropTable(
                name: "PRESCRIPTION");

            migrationBuilder.DropTable(
                name: "PATIENT");

            migrationBuilder.DropTable(
                name: "SCHEDULE");

            migrationBuilder.DropTable(
                name: "DOCTOR");

            migrationBuilder.DropTable(
                name: "USER");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DEPARTMENTS",
                table: "DEPARTMENTS");

            migrationBuilder.RenameTable(
                name: "DEPARTMENTS",
                newName: "Departments");

            migrationBuilder.RenameColumn(
                name: "EVENTTYPE",
                table: "Logs",
                newName: "EventType");

            migrationBuilder.RenameColumn(
                name: "EVENTSRC",
                table: "Logs",
                newName: "EventSrc");

            migrationBuilder.RenameColumn(
                name: "EVENTMSG",
                table: "Logs",
                newName: "EventMsg");

            migrationBuilder.RenameColumn(
                name: "EVENTCATG",
                table: "Logs",
                newName: "EventCatg");

            migrationBuilder.RenameColumn(
                name: "CREATEDDATE",
                table: "Logs",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "CREATEDBY",
                table: "Logs",
                newName: "CreatedBy");

            migrationBuilder.RenameColumn(
                name: "LOGID",
                table: "Logs",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UPDATEDDATE",
                table: "Departments",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "UPDATEDBY",
                table: "Departments",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "DEPARTMENTNAME",
                table: "Departments",
                newName: "DepartmentName");

            migrationBuilder.RenameColumn(
                name: "CREATEDDATE",
                table: "Departments",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "CREATEDBY",
                table: "Departments",
                newName: "CreatedBy");

            migrationBuilder.RenameColumn(
                name: "DELETEDFLAG",
                table: "Departments",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "DEPARTMENTID",
                table: "Departments",
                newName: "Id");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Logs",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Logs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "Logs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedDate",
                table: "Departments",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Departments",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Departments",
                table: "Departments",
                column: "Id")
                .Annotation("SqlServer:Clustered", false);

            migrationBuilder.CreateTable(
                name: "Prescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Drug = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Note = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PatientName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MedicationDays = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Quantity = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Frequency = table.Column<int>(type: "int", nullable: false),
                    Unit = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescriptions", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeletedFlag = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SystemParas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Paraid = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Groupid = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Paraval = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Note = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemParas", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AvatarUrl = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Passwordrecoveryque1 = table.Column<int>(type: "int", nullable: true),
                    Passwordrecoveryque2 = table.Column<int>(type: "int", nullable: true),
                    Passwordrecoveryque3 = table.Column<int>(type: "int", nullable: true),
                    Passwordrecoveryans1 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Passwordrecoveryans2 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Passwordrecoveryans3 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeletedFlag = table.Column<bool>(type: "bit", nullable: false),
                    UserName = table.Column<string>(type: "char(50)", unicode: false, fixedLength: true, maxLength: 50, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EMAIL = table.Column<string>(type: "char(50)", unicode: false, fixedLength: true, maxLength: 50, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Doctors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DepartmentId = table.Column<int>(type: "int", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NationalId = table.Column<string>(type: "char(20)", unicode: false, fixedLength: true, maxLength: 20, nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "date", nullable: false),
                    PhoneNumber = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Speciality = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    WorkingStartDate = table.Column<DateTime>(type: "date", nullable: false),
                    WorkingEndDate = table.Column<DateTime>(type: "date", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctors", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_Doctors_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Doctors_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NationalId = table.Column<string>(type: "char(20)", unicode: false, fixedLength: true, maxLength: 20, nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "date", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_Patients_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DoctorId = table.Column<int>(type: "int", nullable: false),
                    WorkingDay = table.Column<DateTime>(type: "date", nullable: false),
                    ShiftTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    BreakTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    ConsultantTime = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => new { x.DoctorId, x.Id })
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_SCHEDULE_RELATIONS_DOCTOR",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    DoctorId = table.Column<int>(type: "int", nullable: false),
                    ScheduleId = table.Column<int>(type: "int", nullable: false),
                    ConsultantType = table.Column<int>(type: "int", nullable: false),
                    ModeOfConsultant = table.Column<int>(type: "int", nullable: false),
                    DateOfConsultation = table.Column<DateTime>(type: "datetime", nullable: false),
                    AppointmentDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    AppoimentStatus = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ClosedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    ClosedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Symtoms = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Existingillness = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Drugallergies = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Note = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CaseNote = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Diagnosis = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    AdviceToPatient = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    LabTests = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_Appointments_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Appointments_Schedules_DoctorId_ScheduleId",
                        columns: x => new { x.DoctorId, x.ScheduleId },
                        principalTable: "Schedules",
                        principalColumns: new[] { "DoctorId", "Id" });
                });

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

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_13_FK",
                table: "Appointments",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_14_FK",
                table: "Appointments",
                columns: new[] { "DoctorId", "ScheduleId" });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_20_FK",
                table: "Doctors",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_22_FK",
                table: "Doctors",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "UQ__DOCTOR__3CCC7AAE54D9074D",
                table: "Doctors",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_19_FK",
                table: "Patients",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "UQ__PATIENT__D90C4BCF974EE727",
                table: "Patients",
                column: "NationalId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_7_FK",
                table: "Schedules",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UQ__USER__161CF724976807CA",
                table: "Users",
                column: "EMAIL",
                unique: true,
                filter: "[EMAIL] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleClaims_Roles_RoleId",
                table: "RoleClaims",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserClaims_Users_UserId",
                table: "UserClaims",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLogins_Users_UserId",
                table: "UserLogins",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTokens_Users_UserId",
                table: "UserTokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleClaims_Roles_RoleId",
                table: "RoleClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_UserClaims_Users_UserId",
                table: "UserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLogins_Users_UserId",
                table: "UserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTokens_Users_UserId",
                table: "UserTokens");

            migrationBuilder.DropTable(
                name: "AppointmentPrescriptions");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "SystemParas");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Doctors");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Departments",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Logs");

            migrationBuilder.RenameTable(
                name: "Departments",
                newName: "DEPARTMENTS");

            migrationBuilder.RenameColumn(
                name: "EventType",
                table: "Logs",
                newName: "EVENTTYPE");

            migrationBuilder.RenameColumn(
                name: "EventSrc",
                table: "Logs",
                newName: "EVENTSRC");

            migrationBuilder.RenameColumn(
                name: "EventMsg",
                table: "Logs",
                newName: "EVENTMSG");

            migrationBuilder.RenameColumn(
                name: "EventCatg",
                table: "Logs",
                newName: "EVENTCATG");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Logs",
                newName: "CREATEDDATE");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Logs",
                newName: "CREATEDBY");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Logs",
                newName: "LOGID");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                table: "DEPARTMENTS",
                newName: "UPDATEDDATE");

            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "DEPARTMENTS",
                newName: "UPDATEDBY");

            migrationBuilder.RenameColumn(
                name: "DepartmentName",
                table: "DEPARTMENTS",
                newName: "DEPARTMENTNAME");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "DEPARTMENTS",
                newName: "CREATEDDATE");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "DEPARTMENTS",
                newName: "CREATEDBY");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "DEPARTMENTS",
                newName: "DELETEDFLAG");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "DEPARTMENTS",
                newName: "DEPARTMENTID");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CREATEDDATE",
                table: "Logs",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UPDATEDDATE",
                table: "DEPARTMENTS",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CREATEDDATE",
                table: "DEPARTMENTS",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DEPARTMENTS",
                table: "DEPARTMENTS",
                column: "DEPARTMENTID")
                .Annotation("SqlServer:Clustered", false);

            migrationBuilder.CreateTable(
                name: "PRESCRIPTION",
                columns: table => new
                {
                    PRECRIPTIONID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    DRUG = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    FREQUENCY = table.Column<int>(type: "int", nullable: false),
                    MEDICATIONDAYS = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PATIENTNAME = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    QUANTITY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UNIT = table.Column<int>(type: "int", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRESCRIPTION", x => x.PRECRIPTIONID)
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "ROLE",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ROLE", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SYSTEM_PARA",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: true),
                    GROUPID = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PARAID = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PARAVAL = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SYSTEM_PARA", x => x.ID)
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "USER",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false),
                    AVATARURL = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    EMAIL = table.Column<string>(type: "char(50)", unicode: false, fixedLength: true, maxLength: 50, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PASSWORDRECOVERYANS1 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PASSWORDRECOVERYANS2 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PASSWORDRECOVERYANS3 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PASSWORDRECOVERYQUE1 = table.Column<int>(type: "int", nullable: true),
                    PASSWORDRECOVERYQUE2 = table.Column<int>(type: "int", nullable: true),
                    PASSWORDRECOVERYQUE3 = table.Column<int>(type: "int", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    STATUS = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    USERNAME = table.Column<string>(type: "char(50)", unicode: false, fixedLength: true, maxLength: 50, nullable: true),
                    USERTYPE = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DOCTOR",
                columns: table => new
                {
                    DOCTORID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DEPARTMENTID = table.Column<int>(type: "int", nullable: false),
                    USERID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    DOCTORADDRESS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    DOCTORDATEOFBIRTH = table.Column<DateTime>(type: "date", nullable: false),
                    DOCTORGENDER = table.Column<int>(type: "int", nullable: false),
                    DOCTORMOBILENO = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    DOCTORNAME = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DOCTORNATIONALID = table.Column<string>(type: "char(20)", unicode: false, fixedLength: true, maxLength: 20, nullable: false),
                    SPECIALITY = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    WORKINGENDDATE = table.Column<DateTime>(type: "date", nullable: false),
                    WORKINGSTARTDATE = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DOCTOR", x => x.DOCTORID)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_DOCTOR_RELATIONS_DEPARTME",
                        column: x => x.DEPARTMENTID,
                        principalTable: "DEPARTMENTS",
                        principalColumn: "DEPARTMENTID");
                    table.ForeignKey(
                        name: "FK_DOCTOR_RELATIONS_USER",
                        column: x => x.USERID,
                        principalTable: "USER",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PATIENT",
                columns: table => new
                {
                    PATIENTID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    USERID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    PATIENTADDRESS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PATIENTDATEOFBIRTH = table.Column<DateTime>(type: "date", nullable: false),
                    PATIENTGENDER = table.Column<int>(type: "int", nullable: false),
                    PATIENTMOBILENO = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    PATIENTNAME = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PATIENTNATIONALID = table.Column<string>(type: "char(20)", unicode: false, fixedLength: true, maxLength: 20, nullable: false),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PATIENT", x => x.PATIENTID)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_PATIENT_RELATIONS_USER",
                        column: x => x.USERID,
                        principalTable: "USER",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SCHEDULE",
                columns: table => new
                {
                    DOCTORID = table.Column<int>(type: "int", nullable: false),
                    SCHEDULEID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BREAKTIME = table.Column<TimeSpan>(type: "time", nullable: false),
                    CONSULTANTTIME = table.Column<int>(type: "int", nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    SHIFTTIME = table.Column<TimeSpan>(type: "time", nullable: false),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    WORKINGDAY = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SCHEDULE", x => new { x.DOCTORID, x.SCHEDULEID })
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_SCHEDULE_RELATIONS_DOCTOR",
                        column: x => x.DOCTORID,
                        principalTable: "DOCTOR",
                        principalColumn: "DOCTORID");
                });

            migrationBuilder.CreateTable(
                name: "APPOINTMENT",
                columns: table => new
                {
                    APPOINTMENTID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DOCTORID = table.Column<int>(type: "int", nullable: false),
                    PATIENTID = table.Column<int>(type: "int", nullable: false),
                    SCHEDULEID = table.Column<int>(type: "int", nullable: false),
                    ADVICETOPATIENT = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    APPOIMENTSTATUS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    APPOINTMENTDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    CASENOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CLOSEDBY = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CLOSEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    CONSULTANTTYPE = table.Column<int>(type: "int", nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DATEOFCONSULTATION = table.Column<DateTime>(type: "datetime", nullable: false),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    DIAGNOSIS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    DRUGALLERGIES = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EXISTINGILLNESS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    LABTESTS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    MODEOFCONSULTANT = table.Column<int>(type: "int", nullable: false),
                    NOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    SYMTOMS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_APPOINTMENT", x => x.APPOINTMENTID)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_APPOINTM_RELATIONS_PATIENT",
                        column: x => x.PATIENTID,
                        principalTable: "PATIENT",
                        principalColumn: "PATIENTID");
                    table.ForeignKey(
                        name: "FK_APPOINTM_RELATIONS_SCHEDULE",
                        columns: x => new { x.DOCTORID, x.SCHEDULEID },
                        principalTable: "SCHEDULE",
                        principalColumns: new[] { "DOCTORID", "SCHEDULEID" });
                });

            migrationBuilder.CreateTable(
                name: "APPOINTMENT_PRESCRIPTION",
                columns: table => new
                {
                    PRECRIPTIONID = table.Column<int>(type: "int", nullable: false),
                    APPOINTMENTID = table.Column<int>(type: "int", nullable: false),
                    NOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_APPOINTMENT_PRESCRIPTION", x => new { x.PRECRIPTIONID, x.APPOINTMENTID });
                    table.ForeignKey(
                        name: "FK_APPOINTM_RELATIONS_APPOINTM",
                        column: x => x.APPOINTMENTID,
                        principalTable: "APPOINTMENT",
                        principalColumn: "APPOINTMENTID");
                    table.ForeignKey(
                        name: "FK_APPOINTM_RELATIONS_PRESCRIP",
                        column: x => x.PRECRIPTIONID,
                        principalTable: "PRESCRIPTION",
                        principalColumn: "PRECRIPTIONID");
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_13_FK",
                table: "APPOINTMENT",
                column: "PATIENTID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_14_FK",
                table: "APPOINTMENT",
                columns: new[] { "DOCTORID", "SCHEDULEID" });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_12_FK",
                table: "APPOINTMENT_PRESCRIPTION",
                column: "PRECRIPTIONID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_15_FK",
                table: "APPOINTMENT_PRESCRIPTION",
                column: "APPOINTMENTID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_20_FK",
                table: "DOCTOR",
                column: "DEPARTMENTID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_22_FK",
                table: "DOCTOR",
                column: "USERID");

            migrationBuilder.CreateIndex(
                name: "UQ__DOCTOR__3CCC7AAE54D9074D",
                table: "DOCTOR",
                column: "DOCTORNATIONALID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_19_FK",
                table: "PATIENT",
                column: "USERID");

            migrationBuilder.CreateIndex(
                name: "UQ__PATIENT__D90C4BCF974EE727",
                table: "PATIENT",
                column: "PATIENTNATIONALID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "ROLE",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_7_FK",
                table: "SCHEDULE",
                column: "DOCTORID");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "USER",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UQ__USER__161CF724976807CA",
                table: "USER",
                column: "EMAIL",
                unique: true,
                filter: "[EMAIL] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "USER",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleClaims_ROLE_RoleId",
                table: "RoleClaims",
                column: "RoleId",
                principalTable: "ROLE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserClaims_USER_UserId",
                table: "UserClaims",
                column: "UserId",
                principalTable: "USER",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLogins_USER_UserId",
                table: "UserLogins",
                column: "UserId",
                principalTable: "USER",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_ROLE_RoleId",
                table: "UserRoles",
                column: "RoleId",
                principalTable: "ROLE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_USER_UserId",
                table: "UserRoles",
                column: "UserId",
                principalTable: "USER",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTokens_USER_UserId",
                table: "UserTokens",
                column: "UserId",
                principalTable: "USER",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
