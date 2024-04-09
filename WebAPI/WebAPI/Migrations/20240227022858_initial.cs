using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DEPARTMENTS",
                columns: table => new
                {
                    DEPARTMENTID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DEPARTMENTNAME = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DEPARTMENTS", x => x.DEPARTMENTID)
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    LOGID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EVENTCATG = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: true),
                    EVENTMSG = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: true),
                    EVENTSRC = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: true),
                    EVENTTYPE = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CREATEDBY = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.LOGID)
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "PRESCRIPTION",
                columns: table => new
                {
                    PRECRIPTIONID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DRUG = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PATIENTNAME = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MEDICATIONDAYS = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    QUANTITY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FREQUENCY = table.Column<int>(type: "int", nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    UNIT = table.Column<int>(type: "int", nullable: true)
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
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    PARAID = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    GROUPID = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PARAVAL = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: true)
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
                    USERTYPE = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AVATARURL = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PASSWORDRECOVERYQUE1 = table.Column<int>(type: "int", nullable: true),
                    PASSWORDRECOVERYQUE2 = table.Column<int>(type: "int", nullable: true),
                    PASSWORDRECOVERYQUE3 = table.Column<int>(type: "int", nullable: true),
                    PASSWORDRECOVERYANS1 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PASSWORDRECOVERYANS2 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PASSWORDRECOVERYANS3 = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    STATUS = table.Column<bool>(type: "bit", nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false),
                    USERNAME = table.Column<string>(type: "char(50)", unicode: false, fixedLength: true, maxLength: 50, nullable: true),
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
                    table.PrimaryKey("PK_USER", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaims_ROLE_RoleId",
                        column: x => x.RoleId,
                        principalTable: "ROLE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DOCTOR",
                columns: table => new
                {
                    DOCTORID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    USERID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DEPARTMENTID = table.Column<int>(type: "int", nullable: false),
                    DOCTORNAME = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DOCTORNATIONALID = table.Column<string>(type: "char(20)", unicode: false, fixedLength: true, maxLength: 20, nullable: false),
                    DOCTORGENDER = table.Column<int>(type: "int", nullable: false),
                    DOCTORDATEOFBIRTH = table.Column<DateTime>(type: "date", nullable: false),
                    DOCTORMOBILENO = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    DOCTORADDRESS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    SPECIALITY = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    WORKINGSTARTDATE = table.Column<DateTime>(type: "date", nullable: false),
                    WORKINGENDDATE = table.Column<DateTime>(type: "date", nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false)
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
                    PATIENTNAME = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PATIENTNATIONALID = table.Column<string>(type: "char(20)", unicode: false, fixedLength: true, maxLength: 20, nullable: false),
                    PATIENTGENDER = table.Column<int>(type: "int", nullable: false),
                    PATIENTMOBILENO = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    PATIENTDATEOFBIRTH = table.Column<DateTime>(type: "date", nullable: false),
                    PATIENTADDRESS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false)
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
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaims_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "USER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogins_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "USER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_ROLE_RoleId",
                        column: x => x.RoleId,
                        principalTable: "ROLE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "USER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_UserTokens_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "USER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SCHEDULE",
                columns: table => new
                {
                    SCHEDULEID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DOCTORID = table.Column<int>(type: "int", nullable: false),
                    WORKINGDAY = table.Column<DateTime>(type: "date", nullable: false),
                    SHIFTTIME = table.Column<TimeSpan>(type: "time", nullable: false),
                    BREAKTIME = table.Column<TimeSpan>(type: "time", nullable: false),
                    CONSULTANTTIME = table.Column<int>(type: "int", nullable: false),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false)
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
                    PATIENTID = table.Column<int>(type: "int", nullable: false),
                    DOCTORID = table.Column<int>(type: "int", nullable: false),
                    SCHEDULEID = table.Column<int>(type: "int", nullable: false),
                    CONSULTANTTYPE = table.Column<int>(type: "int", nullable: false),
                    MODEOFCONSULTANT = table.Column<int>(type: "int", nullable: false),
                    DATEOFCONSULTATION = table.Column<DateTime>(type: "datetime", nullable: false),
                    APPOINTMENTDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    APPOIMENTSTATUS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CLOSEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    CLOSEDBY = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    SYMTOMS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EXISTINGILLNESS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    DRUGALLERGIES = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CASENOTE = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    DIAGNOSIS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ADVICETOPATIENT = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    LABTESTS = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CREATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CREATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    UPDATEDBY = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UPDATEDDATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    DELETEDFLAG = table.Column<bool>(type: "bit", nullable: false)
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
                name: "IX_RoleClaims_RoleId",
                table: "RoleClaims",
                column: "RoleId");

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

            migrationBuilder.CreateIndex(
                name: "IX_UserClaims_UserId",
                table: "UserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogins_UserId",
                table: "UserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "APPOINTMENT_PRESCRIPTION");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "SYSTEM_PARA");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropTable(
                name: "APPOINTMENT");

            migrationBuilder.DropTable(
                name: "PRESCRIPTION");

            migrationBuilder.DropTable(
                name: "ROLE");

            migrationBuilder.DropTable(
                name: "PATIENT");

            migrationBuilder.DropTable(
                name: "SCHEDULE");

            migrationBuilder.DropTable(
                name: "DOCTOR");

            migrationBuilder.DropTable(
                name: "DEPARTMENTS");

            migrationBuilder.DropTable(
                name: "USER");
        }
    }
}
