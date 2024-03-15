export interface Doctor {
    id: number;
    department: string;
    nationalId: string;
    fullName: string;
    gender: number;
    dateOfBirth: Date;
    phoneNumber: string;
    speciality: string;
    email: string;
    workingStartDate: Date;
    workingEndDate: Date;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isDeleted: boolean;
}
