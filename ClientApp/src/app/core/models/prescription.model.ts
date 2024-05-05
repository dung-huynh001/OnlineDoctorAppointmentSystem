export interface iPrescription {
  id?: number;
  drug: string;
  frequency: string;
  medicationDays: string;
  quantity: string;
  unit: string;
  appointmentId: number;
  note: string;
  isDeleted: boolean;
}
