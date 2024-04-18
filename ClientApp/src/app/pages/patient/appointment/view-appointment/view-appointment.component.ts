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
  appointmentForm!: FormGroup;

  appointmentId: any;
  appointmentDetails: any;

  numberOrder: number = 0;
  pres_submitted: boolean = false;
  prescriptions!: Array<{
    drug: any,
    freq: any,
    medicalDays: any,
    quantity: any,
    unit: any,
    note: any,
  }>;
  prescriptionsFromDB: Array<{
    drug: any,
    freq: any,
    medicalDays: any,
    quantity: any,
    unit: any,
    note: any,
  }> = [
      {
        drug: 'any',
        freq: 'any',
        medicalDays: 'any',
        quantity: 'any',
        unit: 'any',
        note: 'any',
      }
    ];

  constructor(
    private _appointmentService: AppointmentService,
    private router: Router,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }
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

    this.fetchData();
    this.prescriptions = JSON.parse(JSON.stringify(this.prescriptionsFromDB));
  }

  ngAfterViewInit(): void {
  }

  get appointmentFormControl() {
    return this.appointmentForm.controls;
  }

  setBgColor(status: string) {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'light';
    }
  }

  fetchData() {
    this._spinnerService.show();

    const currentUrl = this.router.url;
    const currentUrlArr = currentUrl.split('/');
    this.appointmentId = currentUrlArr.at(currentUrlArr.length - 1);

    this._appointmentService
      .viewAppointmentDetails(this.appointmentId)
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
  markAsConfirmed(id: number) {

  }

  markAsCompleted(id: number) {

  }

  markAsCancel(id: number) {

  }

  deleteRow(index: number) {
    this.pres_submitted = false;
    this.prescriptions.splice(index, 1);
  }

  addRow() {
    this.pres_submitted = false;
    this.prescriptions.push({
      drug: '',
      freq: '',
      medicalDays: '',
      note: '',
      quantity: '',
      unit: ''
    })
  }

  savePrescriptions() {
    this.pres_submitted = true;
    const isInvalid = this.prescriptions.find(pres => {
      return !pres.drug || !pres.freq || !pres.medicalDays || !pres.quantity || !pres.unit;
    })

    if (!isInvalid && this.prescriptions.length != 0) {
      console.log('valid');
    } else {
      console.log('invalid');
    }
  }

  resetPrescriptions() {
    this.pres_submitted = false;
    this.prescriptions = JSON.parse(JSON.stringify(this.prescriptionsFromDB));
  }

  toggleMenu() {
    const menu = document.querySelector('.appt-menu');
    menu?.classList.toggle('cs-close');
  }
}
