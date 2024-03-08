import { RestApiService } from './../../core/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../account/login/toast-service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.scss',
})
export class MakeAppointmentComponent implements OnInit {
  breadcrumbItems!: Array<{}>;
  workingDay!: string;
  workingTime!: string;

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
    private _restApiService: RestApiService
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
      { label: 'Menu' },
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
    console.log(new Date(this.workingDay + ' ' + this.workingTime));
    return new Date(this.workingDay + ' ' + this.workingTime).toLocaleString();
  }

  getDoctorOnDutyList() {
    const date = this.getScheduleDateTime();
    console.log(date);
    this._restApiService
      .get('/Doctor/get-doctor-on-duty', `?date=${date}`)
      .pipe(catchError((err) => {
        console.log(err);
        return throwError(() => err);
      }))
      .subscribe((res) => console.log(res));
  }
}
