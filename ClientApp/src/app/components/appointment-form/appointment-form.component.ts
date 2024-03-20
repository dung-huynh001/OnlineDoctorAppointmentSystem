import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RestApiService } from '../../core/services/rest-api.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  @Input() defaultData!: {
    doctorId: number;
    patientId: number;
    scheduleId: number;
    doctorName: string;
    patientName: string;
    speciality: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: number;
    email: string;
    address: string;
  };
  appointmentForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _restApiService: RestApiService
  ) {}

  get f() {
    return this.appointmentForm.controls;
  }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patientId: [this.defaultData.patientId, Validators.required],
      patientName: [this.defaultData.patientName, Validators.required],
      dateOfBirth: [this.defaultData.dateOfBirth, Validators.required],
      gender: [this.defaultData.gender, [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: [this.defaultData.email, [Validators.required, Validators.email]],
      address: [this.defaultData.address, Validators.required],

      doctorId: [this.defaultData.doctorId, Validators.required],
      doctorName: [this.defaultData.doctorName, Validators.required],
      speciality: [this.defaultData.speciality, Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentStatus: ['Pending', Validators.required],
      time: ['', Validators.required],
      scheduleId: [this.defaultData.scheduleId, Validators.required],
      modeOfConsultant: ['1', Validators.required],
      consultantType: ['1', Validators.required],
      existingIllness: [''],
      drugAllergies: [''],
      note: [''],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
      this._restApiService
        .post(`/Appointment/make-appointment`, this.appointmentForm.value)
        .pipe(
          catchError((err) => {
            console.log(err);
            return throwError(() => err);
          })
        )
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success('Make appointment success');
          }
        });
    }
  }
}
