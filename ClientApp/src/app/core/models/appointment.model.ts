export interface iAppointment {
    id: number;
    patientId: number;
    doctorId: number;
    scheduleId: number;
    consultantType: number;
    modeOfConsultant: number;
    dateOfConsultation: any;
    appointmentDate?: any;
    appointmentStatus: string;
    closedBy?: string;
    closedDate?: any;
    symtoms?: string;
    existingIllness?: string;
    drugAllergies?: string;
    note?: string;
    caseNote?: string;
    diagnosis?: string;
    adviceToPatient?: string;
    labTests?: string;
    doctorPhoneNumber: number;
    doctorName: string;
    speciality: string;
    doctorGender: number;
    doctorEmail: string;
    doctorAvatarUrl: string;
    patientName: string;
    patientBirthDay?: any;
    patientPhoneNumber: number;
    patientGender?: number;
    patientEmail: string;
    patientAddress?: string;
}