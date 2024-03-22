export interface Doctor {
  id: number;
  department: string;
  nationalId: string;
  fullName: string;
  gender: number;
  dateOfBirth: Date;
  phonenumber: string;
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

export interface iDoctorDetails {
  id: number;
  userId: string;
  address: string;
  dateOfBirth: string;
  departmentId: string;
  departmentName: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  gender: string;
  nationalId: string;
  phoneNumber: string;
  speciality: string;
  workingEndDate: string;
  workingStartDate: string;
  createdDate: string;
  updatedDate: string;
}
