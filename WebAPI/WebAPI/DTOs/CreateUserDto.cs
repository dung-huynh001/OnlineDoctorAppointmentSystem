﻿namespace WebAPI.DTOs
{
    public class CreateUserDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string UserType { get; set; }
        public string AvatarUrl { get; set; }
    }
}
