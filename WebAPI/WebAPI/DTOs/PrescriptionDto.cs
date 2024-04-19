namespace WebAPI.DTOs
{
    public class PrescriptionDto
    {
        public int? Id { get; set; }
        public string Drug { get; set; }
        public string? Note { get; set; }
        public int MedicationDays { get; set; }
        public int Quantity { get; set; }
        public string Frequency { get; set; }
        public string Unit { get; set; }
        public int AppointmentId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
