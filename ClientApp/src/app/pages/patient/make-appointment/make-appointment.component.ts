import { iDoctorOnDuty } from './../../../core/models/doctorOnDuty.model';
import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../core/services/rest-api.service';
import { catchError, map, throwError } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.scss'
})
export class MakeAppointmentComponent implements OnInit {
  breadcrumbItems!: Array<{}>;
  workingDay!: string;
  workingTime!: string;

  doctorOndutyData!: Array<iDoctorOnDuty>;

  defaultData!: {
    doctorId: number;
    patientId: number;
    scheduleId: number;
    doctorName: string;
    patientName: string;
    speciality: string;
    phoneNumber: string;
    // yyyy-MM-dd
    dateOfBirth: string;
    gender: number;
    email: string;
    address: string;
  };

  constructor(
    private _toastService: ToastService,
    private _appointmentService: AppointmentService
  ) {
    this.defaultData = {
      doctorId: 1,
      patientId: 1,
      scheduleId: 1,
      doctorName: 'John Smith',
      patientName: 'Tommy',
      speciality: 'Brain',
      phoneNumber: '0964493435',
      dateOfBirth: '2024-01-20',
      gender: 1,
      email: 'tommy@gmail.com',
      address: 'Ninh Kieu District, Can Tho City',
    };

  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home' },
      { label: 'Make Appointment', active: true },
    ];
    this.workingDay = new Date().toLocaleDateString('en-ZA');
    this.workingTime = new Date().toLocaleTimeString();
  }

  onDateChange(workingDate: string) {
    this.workingDay = workingDate;
  }

  onTimeChange(time: string) {
    this.workingTime = time;
  }

  getScheduleDateTime(): string {
    return new Date(this.workingDay + ' ' + this.workingTime).toLocaleString('en-GB');
  }

  getDoctorsOnDuty() {
    const date = this.getScheduleDateTime();
    this._appointmentService
      .getDoctorOnDuty('/Doctor/get-doctor-on-duty', date)
      .pipe(
        map((res): Array<iDoctorOnDuty> => {
          return res.map((doctor: any) => ({
            id: doctor.id,
            fullName: doctor.fullName,
            scheduleId: doctor.scheduleId,
            speciality: doctor.speciality,
          }));
        }),
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      )
      .subscribe((doctors) => {
        // Ở đây, bạn có thể sử dụng danh sách các bác sĩ đã được chuyển đổi
        this.doctorOndutyData = doctors;
        console.table(this.doctorOndutyData);
        console.table(doctors);
      });
  }


}
