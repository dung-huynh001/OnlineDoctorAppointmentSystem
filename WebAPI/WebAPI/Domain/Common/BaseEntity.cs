﻿namespace WebAPI.Domain.Common
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set;}
        public DateTime CreatedDate { get; set;}
        public DateTime UpdatedDate { get; set;}
        public Boolean IsDeleted { get; set;}

    }
}
