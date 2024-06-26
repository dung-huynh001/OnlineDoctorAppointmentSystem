﻿using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class ChangePasswordModel
    {
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set;}
        [Required]
        public string ConfirmPassword { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
