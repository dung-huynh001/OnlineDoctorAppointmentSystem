using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class CreateScheduleDto
    {
        [Required]
        public int DoctorId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string ScheduleDate { get; set; }
        [Required]
        public string nStartTime { get; set; }
        [Required]
        public string nEndTime { get; set; }
        [Required]
        public string aStartTime { get; set; }
        [Required]
        public string aEndTime { get; set; }
        [Required]
        public string mStartTime { get; set; }
        [Required]
        public string mEndTime { get; set; }
        [Required]
        public int ConsultantTime { get; set; }
        [Required]
        public bool Force { get; set; }
    }
}
