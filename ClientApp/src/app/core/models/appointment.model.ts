export interface iAppointment {
    patientId: number;
    doctorId: number;
    scheduleId: number;
    consultantType: number;
    modeOfConsultant: number;
    dateOfConsultant: string;
    appointmentDate: string;
    appointmentStatus: string;
    closedBy: string;
    closedDate: string;
    symtoms: string;
    existingillness: string;
    druggallergies: string;
    note: string;
    caseNote: string;
    diagnosis: string;
    adviceToPatient: string;
    labTests: string;
}