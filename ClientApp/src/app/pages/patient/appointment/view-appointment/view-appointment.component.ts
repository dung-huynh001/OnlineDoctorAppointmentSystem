import {
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { iPrescription } from '../../../../core/models/prescription.model';
import { iAppointment } from '../../../../core/models/appointment.model';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/auth.models';
@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrl: './view-appointment.component.scss',
})
export class ViewAppointmentComponent implements OnInit, AfterViewInit {
  currentUser!: User;

  breadcrumbItems!: Array<{}>;
  appointmentForm!: FormGroup;

  hospitalInfo: any;

  appointmentId: any;
  appointmentDetails!: iAppointment;

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

  prescriptions!: Array<iPrescription>;

  prescriptionsFromDB: Array<iPrescription> = [];

  frequencyItems!: {
    value: number;
    text: string;
  }[];

  unitItems!: {
    value: number;
    text: string;
  }[];

  isChanged: boolean = false;

  constructor(
    private _appointmentService: AppointmentService,
    private router: Router,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'View Appointment', active: true },
    ];

    this._appointmentService
      .getHospitalInfo()
      .subscribe((res) => (this.hospitalInfo = res));

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
    this.currentUser = this._authService.currentUser();
  }

  ngAfterViewInit(): void {
    if (this.appointmentDetails && this.appointmentDetails.id) {
      this.fetchPrescription();
    }
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
        this.appointmentDate = new Date(res.appointmentDate);
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
        this.diagnosisDetails = JSON.parse(
          JSON.stringify(this.diagnosisDetailsFromDB)
        );
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
        this.prescriptions = JSON.parse(JSON.stringify(res));
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
    const prescriptionId = this.prescriptions[index].id;
    this.prescriptionsFromDB.find((pres) => {
      if (pres.id === prescriptionId) {
        pres.isDeleted = true;
        return;
      }
    });
    this.prescriptions.splice(index, 1);
  }

  addRow() {
    this.pres_submitted = false;
    this.prescriptions.push({
      drug: '',
      frequency: '1',
      medicationDays: '',
      note: '',
      quantity: '',
      unit: '6',
      appointmentId: this.appointmentDetails.id,
      isDeleted: false,
      id: undefined,
    });
  }

  savePrescriptions(id: number, prescriptions: Array<iPrescription>) {
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

    if (!isInvalid) {
      this._spinnerService.show();
      const data = [...prescriptions];
      this.prescriptionsFromDB.forEach((pres) => {
        if (pres.isDeleted) {
          data.push(pres);
        }
      });

      this._appointmentService
        .updatePrescriptions(id, data)
        .pipe(
          finalize(() => {
            this._spinnerService.hide();
          })
        )
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
            this.prescriptionsFromDB = JSON.parse(
              JSON.stringify(this.prescriptions)
            );
          } else {
            this._toastService.error(res.message);
          }
        });
    }
  }

  getFreq() {
    this._appointmentService.getFreq().subscribe((res) => {
      this.frequencyItems = res;
    });
  }

  getUnit() {
    this._appointmentService.getUnit().subscribe((res) => {
      this.unitItems = res;
    });
  }

  resetPrescriptions() {
    this.pres_submitted = false;
    this.prescriptionsFromDB.forEach((pres) => (pres.isDeleted = false));
    this.prescriptions = JSON.parse(JSON.stringify(this.prescriptionsFromDB));
  }

  resetAppointmentDate() {
    this.appointmentDate = new Date(this.appointmentDetails.appointmentDate);
    this.appointmentTime = this.appointmentDetails.appointmentDate.slice(
      11,
      16
    );
  }

  changeAppointmentDate() {
    this._spinnerService.show();
    const time = this.appointmentTime.split(':');
    const date = this.appointmentDate.setHours(time[0], time[1]);

    const appointmentDate = new Date(date);
    this._appointmentService
      .changeAppointmentDate(this.appointmentDetails.id, this.appointmentDate)
      .pipe(finalize(() => this._spinnerService.hide()))
      .subscribe((res) => {
        if (res.isSuccess) {
          this._toastService.success(res.message);
          this.fetchAppointmentDetails();
        } else {
          this._toastService.error(res.message);
        }
      });
  }

  markAsChanged() {
    if (!this.isChanged) this.isChanged = true;
  }

  markAsUnChanged() {
    if (this.isChanged) this.isChanged = false;
  }

  toggleMenu() {
    const menu = document.querySelector('.appt-menu');
    menu?.classList.toggle('cs-close');
  }
}
