import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrl: './view-appointment.component.scss',
})
export class ViewAppointmentComponent implements OnInit, AfterViewInit {
  breadcrumbItems!: Array<{}>;
  appointmentForm!: FormGroup

  appointmentId: any;
  appointmentDetails: any;

  constructor(
    private _appointmentService: AppointmentService,
    private router: Router,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home' },
      { label: 'Make Appointment', active: true },
    ];
    this.appointmentForm = this.formBuilder.group({
      PatientName: [],
      Gender: [],
      PatientPhoneNumber: [],
      PatientBirthDay: [],
      PatientEmail: [],
      PatientAddress: [],
      AppointmentDate: [],
      Time: [],
      DoctorName: [],
      Speciality: [],
      ModeOfConsultant: [],
      ConsultantType: [],
      ExistingIllness: [],
      Allergies: [],
      Notes: [],
    });

    // this.fetchData();
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  get appointmentFormControl() {
    return this.appointmentForm.controls;
  }

  fetchData() {
    this._spinnerService.show();

    const currentUrl = this.router.url;
    this.appointmentId = currentUrl.slice(currentUrl.length - 1);

    this._appointmentService
      .viewAppointmentDetails(
        'Appointment/view-appointment-details',
        this.appointmentId
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        }),
        finalize(() => {
          setTimeout(() => {
            this._spinnerService.hide();
          }, 300);
        })
      )
      .subscribe((res) => {
        this.appointmentDetails = res;
        this.appointmentForm = this.formBuilder.group({
          PatientName: [res.patientName],
          Gender: [res.patientGender],
          PatientPhoneNumber: [res.patientPhoneNumber],
          PatientBirthDay: [res.patientBirthDay.slice(0, 10)],
          PatientEmail: [res.patientEmail],
          PatientAddress: [res.patientAddress],
          AppointmentDate: [res.appointmentDate.slice(0, 10)],
          Time: [res.appointmentDate.slice(11, 16)],
          DoctorName: [res.doctorName],
          Speciality: [res.speciality],
          ModeOfConsultant: [res.modeOfConsultant],
          ConsultantType: [res.consultantType],
          ExistingIllness: [res.existingIllness],
          Allergies: [res.drugAllergies],
          Notes: [res.note],
        });
      });
  }
}
