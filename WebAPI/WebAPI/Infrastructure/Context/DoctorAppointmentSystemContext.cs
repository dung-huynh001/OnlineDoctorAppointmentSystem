﻿using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WebAPI.Domain.Common;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Context
{
    public partial class DoctorAppointmentSystemContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public DoctorAppointmentSystemContext()
        {
        }

        public DoctorAppointmentSystemContext(DbContextOptions<DoctorAppointmentSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Appointment> Appointments { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Doctor> Doctors { get; set; } = null!;
        public virtual DbSet<Log> Logs { get; set; } = null!;
        public virtual DbSet<Patient> Patients { get; set; } = null!;
        public virtual DbSet<Prescription> Prescriptions { get; set; } = null!;
        public virtual DbSet<AppRole> AppRoles { get; set; } = null!;
        public virtual DbSet<Schedule> Schedules { get; set; } = null!;
        public virtual DbSet<SystemPara> SystemParas { get; set; } = null!;
        public virtual DbSet<AppUser> AppUsers { get; set; } = null!;

      
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .IsClustered(false);

                entity.HasIndex(e => e.PatientId, "RELATIONSHIP_13_FK");

                entity.HasIndex(e => new { e.DoctorId, e.ScheduleId }, "RELATIONSHIP_14_FK");

                entity.Property(e => e.Id);

                entity.Property(e => e.AdviceToPatient)
                    .HasMaxLength(256);

                entity.Property(e => e.AppointmentStatus)
                    .HasMaxLength(256);

                entity.Property(e => e.AppointmentDate)
                    .HasColumnType("datetime");

                entity.Property(e => e.CaseNote)
                    .HasMaxLength(256);

                entity.Property(e => e.ClosedBy)
                    .HasMaxLength(256);

                entity.Property(e => e.ClosedDate)
                    .HasColumnType("datetime");

                entity.Property(e => e.ConsultantType);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");

                entity.Property(e => e.DateOfConsultation)
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDeleted);

                entity.Property(e => e.Diagnosis)
                    .HasMaxLength(256);

                entity.Property(e => e.DoctorId);

                entity.Property(e => e.DrugAllergies)
                    .HasMaxLength(256);

                entity.Property(e => e.ExistingIllness)
                    .HasMaxLength(256);

                entity.Property(e => e.LabTests)
                    .HasMaxLength(256);

                entity.Property(e => e.ModeOfConsultant);

                entity.Property(e => e.Note)
                    .HasMaxLength(256);

                entity.Property(e => e.PatientId);

                entity.Property(e => e.ScheduleId);

                entity.Property(e => e.Symtoms)
                    .HasMaxLength(256);

                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");

                entity.HasOne(a => a.Patient)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(a => a.PatientId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(a => a.Doctor)
                    .WithMany(d => d.Appointments)
                    .HasForeignKey(a => a.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Schedule)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.ScheduleId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .IsClustered(false);

                entity.Property(e => e.Id);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDeleted);

                entity.Property(e => e.DepartmentName)
                    .HasMaxLength(256);

                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .IsClustered(false);

                entity.HasIndex(e => e.DepartmentId, "RELATIONSHIP_20_FK");

                entity.HasIndex(e => e.UserId, "RELATIONSHIP_22_FK");

                entity.HasIndex(e => e.Id, "UQ__DOCTOR__3CCC7AAE54D9074D")
                    .IsUnique();

                entity.Property(e => e.Id);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDeleted);

                entity.Property(e => e.DepartmentId);

                entity.Property(e => e.Address)
                    .HasMaxLength(256);

                entity.Property(e => e.DateOfBirth)
                    .HasColumnType("date");

                entity.Property(e => e.Gender);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.FullName)
                    .HasMaxLength(50);

                entity.Property(e => e.NationalId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Speciality)
                    .HasMaxLength(256);

                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");

                entity.Property(e => e.UserId);

                entity.Property(e => e.WorkingEndDate)
                    .HasColumnType("date");

                entity.Property(e => e.WorkingStartDate)
                    .HasColumnType("date");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Doctors)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Doctors)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Log>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .IsClustered(false);

                entity.Property(e => e.Id);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.EventCatg)
                    .HasMaxLength(256)
                    .IsUnicode(false);


                entity.Property(e => e.EventMsg)
                    .HasMaxLength(256)
                    .IsUnicode(false);


                entity.Property(e => e.EventSrc)
                    .HasMaxLength(256)
                    .IsUnicode(false);


                entity.Property(e => e.EventType)
                    .HasMaxLength(10);

            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .IsClustered(false);


                entity.HasIndex(e => e.UserId, "RELATIONSHIP_19_FK");

                entity.HasIndex(e => e.NationalId, "UQ__PATIENT__D90C4BCF974EE727")
                    .IsUnique();

                entity.Property(e => e.Id);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.IsDeleted);

                entity.Property(e => e.Address)
                    .HasMaxLength(256);


                entity.Property(e => e.DateOfBirth)
                    .HasColumnType("date");


                entity.Property(e => e.Gender);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.FullName)
                    .HasMaxLength(50);


                entity.Property(e => e.NationalId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.UserId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Patients)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Prescription>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .IsClustered(false);

                entity.Property(e => e.Id);

                entity.HasIndex(e => e.AppointmentId, "RELATIONSHIP_8_FK");

                entity.Property(e => e.AppointmentId);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.IsDeleted);

                entity.Property(e => e.Drug)
                    .HasMaxLength(256);


                entity.Property(e => e.Frequency);

                entity.Property(e => e.MedicationDays)
                    .HasMaxLength(50);


                entity.Property(e => e.Note)
                    .HasMaxLength(256);


                entity.Property(e => e.Quantity)
                    .HasMaxLength(50);


                entity.Property(e => e.Unit);

                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");

                entity.HasOne(p => p.Appointment)
                    .WithMany(a => a.Prescriptions)
                    .HasForeignKey(p => p.AppointmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

            });

            modelBuilder.Entity<AppRole>(entity =>
            {

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.IsDeleted);


                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");

            });

            modelBuilder.Entity<Schedule>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .IsClustered(false);

                entity.HasIndex(e => e.DoctorId, "RELATIONSHIP_7_FK");

                entity.Property(e => e.DoctorId);

                entity.Property(e => e.Id);

                entity.Property(e => e.Description);

                entity.Property(e => e.Type);

                entity.Property(e => e.BreakTime);

                entity.Property(e => e.ConsultantTime);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.IsDeleted);

                entity.Property(e => e.ShiftTime);

                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.WorkingDay)
                    .HasColumnType("date");


                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.Schedules)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SCHEDULE_RELATIONS_DOCTOR");
            });

            modelBuilder.Entity<SystemPara>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .IsClustered(false);

                entity.Property(e => e.Id);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.IsDeleted);

                entity.Property(e => e.Groupid)
                    .HasMaxLength(256);


                entity.Property(e => e.Note)
                    .HasMaxLength(256);


                entity.Property(e => e.Paraid)
                    .HasMaxLength(256);


                entity.Property(e => e.Paraval)
                    .HasMaxLength(256);


                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");

                var freqs = new List<string> {
                    "2 times a day", "Daily", "4 Hourly", "Only Morning", "Only Night"
                };

                var units = new List<string>
                {
                    "pills", "mg", "ml", "grains", "capsules"
                };

                var @params = new List<SystemPara>();

                int id = 1;

                freqs.ForEach(f => {
                    @params.Add(new SystemPara
                    {
                        Id = id,
                        Groupid = "Frequency",
                        Paraid = $"freq_{id}",
                        Paraval = f,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now,
                        CreatedBy = "system",
                        UpdatedBy = "system",
                        Note = "",
                        IsDeleted = false,
                    });

                    id++;
                });

                units.ForEach(u =>
                {
                    @params.Add(new SystemPara
                    {
                        Id = id,
                        Groupid = "Unit",
                        Paraid = $"unit_{id}",
                        Paraval = u,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now,
                        CreatedBy = "system",
                        UpdatedBy = "system",
                        Note = "",
                        IsDeleted = false,
                    });

                    id++;
                });

                entity.HasData(@params);
            });

            modelBuilder.Entity<AppUser>(entity =>
            {

                entity.HasIndex(e => e.Email, "UQ__USER__161CF724976807CA")
                    .IsUnique();

                entity.Property(e => e.AvatarUrl)
                    .HasMaxLength(256);


                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.IsDeleted);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("EMAIL")
                    .IsFixedLength();

                entity.Property(e => e.Status);

                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50);


                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime");


                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.UserType)
                    .HasMaxLength(100);
            });


            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var tableName = entityType.GetTableName();
                if (tableName.StartsWith("AspNet"))
                {
                    entityType.SetTableName(tableName.Substring(6));
                }
            }

            OnModelCreatingPartial(modelBuilder);
        }

        public virtual async Task<int> SaveChangesAsync(string editor = "admin")
        {
            foreach (var entity in base.ChangeTracker.Entries<BaseEntity>()
                .Where(q => q.State == EntityState.Added || q.State == EntityState.Modified))
            {
                entity.Entity.UpdatedDate = DateTime.Now;
                entity.Entity.UpdatedBy = editor;

                if (entity.State == EntityState.Added)
                {
                    entity.Entity.CreatedDate = DateTime.Now;
                    entity.Entity.CreatedBy = editor;
                }

            }

            return await base.SaveChangesAsync();
        }

        public virtual async Task<int> SaveChangesAsync(CancellationToken cancellationToken, string editor)
        {
            foreach (var entity in base.ChangeTracker.Entries<BaseEntity>()
                .Where(q => q.State == EntityState.Added || q.State == EntityState.Modified))
            {
                entity.Entity.UpdatedDate = DateTime.Now;
                entity.Entity.UpdatedBy = editor;

                if (entity.State == EntityState.Added)
                {
                    entity.Entity.CreatedDate = DateTime.Now;
                    entity.Entity.CreatedBy = editor;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
