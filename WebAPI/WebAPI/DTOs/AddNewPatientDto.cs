﻿namespace WebAPI.DTOs
{
    public class AddNewPatientDto
    {
        public string? UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string NationalId { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public int Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
