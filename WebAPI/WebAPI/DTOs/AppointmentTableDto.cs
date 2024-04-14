namespace WebAPI.DTOs
{
    public class AppointmentTableDto
    {
        public int Id { get; set; }
        public string? DoctorName { get; set; }
        public string? PatientName { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public DateTime DateOfConsultation { get; set; }
        public string? Status { get; set; }
        public string? ClosedBy { get; set; }
        public DateTime? ClosedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
    }
}
