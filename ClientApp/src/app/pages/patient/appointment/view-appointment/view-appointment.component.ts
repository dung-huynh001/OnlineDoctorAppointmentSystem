import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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

  appointmentDate!: Date;
  appointmentTime!: any;

  diagnosisDetailsFromDB!: {
    diagnosis: string;
    caseNote: string;
    adviceToPatient: string;
  };

  diagnosisDetails!: {
    diagnosis: string;
    caseNote: string;
    adviceToPatient: string;
  };

  numberOrder: number = 0;
  pres_submitted: boolean = false;

  prescriptions!: Array<{
    id?: number;
    drug: string;
    frequency: number;
    medicationDays: string;
    quantity: string;
    unit: number;
    appointmentId: number;
    note: string;
    isDeleted: boolean;
  }>;

  prescriptionsFromDB: Array<{
    id?: number;
    drug: string;
    frequency: number;
    medicationDays: string;
    quantity: string;
    unit: number;
    appointmentId?: number;
    note: string;
    isDeleted: boolean;
  }> = [];

  frequencyDropdownItems!: {
    value: number;
    text: string;
  }[];

  unitDropdownItems!: {
    value: number;
    text: string;
  }[];

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

    this.fetchAppointmentDetails();
    this.prescriptions = JSON.parse(JSON.stringify(this.prescriptionsFromDB));
  }

  ngAfterViewInit(): void {}

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

  fetchAppointmentDetails() {
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
        this.appointmentDate = res.appointmentDate;
        this.appointmentTime = res.appointmentDate.slice(11, 16);

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

  fetchDiagnosis() {
    this._spinnerService.show();
    this._appointmentService
      .getDiagnosis(this.appointmentDetails.id)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        }),
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((res) => {
        this.diagnosisDetailsFromDB = res;
        this.diagnosisDetails = res;
      });
  }

  fetchPrescription() {
    this._spinnerService.show();
    this._appointmentService
      .getPrescription(this.appointmentDetails.id)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((res) => {
        this.prescriptionsFromDB = res;
      });
    
    this.getFreq();
    this.getUnit();
  }

  updateAppointmentStatus(id: number, appointmentStatus: string) {
    this._spinnerService.show();
    this._appointmentService
      .updateAppointmentStatus(id, appointmentStatus)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((res) => {
        if (res.isSuccess) {
          this._toastService.success(res.message);
          this.fetchAppointmentDetails();
        } else {
          this._toastService.error(res.message);
        }
      });
  }

  resetDiagnosis() {
    this.diagnosisDetails = JSON.parse(
      JSON.stringify(this.diagnosisDetailsFromDB)
    );
  }

  updateDiagnosis(id: number, diagnosis: any) {
    this._spinnerService.show();
    this._appointmentService
      .updateDiagnosis(id, diagnosis)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((res) => {
        if (res.isSuccess) {
          this._toastService.success(res.message);
        } else {
          this._toastService.error(res.message);
        }
        this.fetchDiagnosis();
      });
  }

  deleteRow(index: number) {
    this.pres_submitted = false;
    this.prescriptions.splice(index, 1);
  }

  addRow() {
    this.pres_submitted = false;
    this.prescriptions.push({
      drug: '',
      frequency: 1,
      medicationDays: '',
      note: '',
      quantity: '',
      unit: 1,
      appointmentId: this.appointmentDetails.id,
      isDeleted: false,
      id: undefined,
    });
  }

  savePrescriptions(id: number, prescriptions: any) {
    this.pres_submitted = true;
    const isInvalid = this.prescriptions.find((pres) => {
      return (
        !pres.drug ||
        !pres.frequency ||
        !pres.medicationDays ||
        !pres.quantity ||
        !pres.unit
      );
    });

    if (!isInvalid && this.prescriptions.length != 0) {
      this._spinnerService.show();
      this._appointmentService
        .updatePrescriptions(id, prescriptions)
        .pipe(
          finalize(() => {
            this._spinnerService.hide();
          })
        )
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
          } else {
            this._toastService.error(res.message);
          }
        });
    } else {
      console.log('invalid');
    }
  }

  getFreq() {
    this._appointmentService.getFreq().subscribe((res) => {
      this.frequencyDropdownItems = res;
    });
  }

  getUnit() {
    this._appointmentService.getUnit().subscribe((res) => {
      this.unitDropdownItems = res;
    });
  }

  resetPrescriptions() {
    this.pres_submitted = false;
    this.prescriptions = JSON.parse(JSON.stringify(this.prescriptionsFromDB));
  }

  resetAppointmentDate() {
    this.appointmentDate = this.appointmentDetails.appointmentDate;
    this.appointmentTime = this.appointmentDetails.appointmentDate.slice(
      11,
      16
    );
  }

  toggleMenu() {
    const menu = document.querySelector('.appt-menu');
    menu?.classList.toggle('cs-close');
  }
}
