import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, map, throwError } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/auth.models';
import { iPatientInfo } from '../../core/models/patientInfo.model';
import { AppointmentService } from '../../core/services/appointment.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit, OnChanges {
  @Input() defaultData!: {
    doctorId: number;
    scheduleId: number;
    doctorName: string;
    speciality: string;
  };
  appointmentForm!: FormGroup;
  submitted: boolean = false;

  patientInfo!: iPatientInfo;

  constructor(
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _appointmentService: AppointmentService,
    private readonly elementRef: ElementRef,
    private _patientService: ProfileService,
    private _authService: AuthService,
    private _spinnerService: NgxSpinnerService
  ) {
    this.appointmentForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      patientName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['1', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],

      doctorId: ['', Validators.required],
      doctorName: ['', Validators.required],
      speciality: ['', Validators.required],
      appointmentDate: [
        new Date().toLocaleDateString('en-CA'),
        Validators.required,
      ],
      appointmentStatus: ['Pending', Validators.required],
      time: [new Date().toLocaleTimeString(), Validators.required],
      scheduleId: ['', Validators.required],
      modeOfConsultant: ['1', Validators.required],
      consultantType: ['1', Validators.required],
      existingIllness: [''],
      drugAllergies: [''],
      note: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultData']) {
      this.defaultData = changes['defaultData'].currentValue;
    }

    this.f['doctorId'].setValue(this.defaultData.doctorId);
    this.f['doctorName'].setValue(this.defaultData.doctorName);
    this.f['speciality'].setValue(this.defaultData.speciality);
    this.f['scheduleId'].setValue(this.defaultData.scheduleId);

    const doctorNameElement =
      this.elementRef.nativeElement.querySelector('#appointmentDate');
    
    if(!changes['defaultData'].firstChange)
      doctorNameElement?.scrollIntoView({ behavior: 'smooth' });
  }

  get f() {
    return this.appointmentForm.controls;
  }

  ngOnInit(): void {
    const currentUser: User = this._authService.currentUser();
    this._patientService
      .getPatientInfo(currentUser.id)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        }),
        map((res: iPatientInfo) => {
          return res;
        })
      )
      .subscribe((res) => {
        const gender: number =
          res.gender === 'Male' ? 0 : res.gender === 'Female' ? 1 : 2;
        const dateOfBirth: string = res.dateOfBirth
          .split('/')
          .reverse()
          .join('-');
        this.appointmentForm = this.formBuilder.group({
          patientId: [res.id, Validators.required],
          patientName: [res.fullName, Validators.required],
          dateOfBirth: [dateOfBirth, Validators.required],
          gender: [gender, [Validators.required]],
          phoneNumber: [res.phoneNumber, [Validators.required]],
          email: [res.email, [Validators.required, Validators.email]],
          address: [res.address, Validators.required],
          doctorId: ['', Validators.required],
          doctorName: ['', Validators.required],
          speciality: ['', Validators.required],
          appointmentDate: [
            new Date().toLocaleDateString('en-CA'),
            Validators.required,
          ],
          appointmentStatus: ['Pending', Validators.required],
          time: [new Date().toLocaleTimeString('en-GB'), Validators.required],
          scheduleId: ['', Validators.required],
          modeOfConsultant: ['1', Validators.required],
          consultantType: ['1', Validators.required],
          existingIllness: [''],
          drugAllergies: [''],
          note: [''],
        });
      });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.appointmentForm.valid) {
      this._spinnerService.show();
      this._appointmentService
        .makeAppoinntment(
          this.appointmentForm.value
        )
        .pipe(
          catchError((err) => {
            console.log(err);
            return throwError(() => err);
          }),
          finalize(() => {
            setTimeout(() => {
              this._spinnerService.hide();
            }, 300);
          })
        )
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
            this.resetForm();
          }
        });
    }
  }

  resetForm() {
    this.appointmentForm.reset();
    this.f['doctorId'].setValue(null);
    this.f['doctorName'].setValue(null);
    this.f['speciality'].setValue(null);
    this.f['note'].setValue(null);
    this.f['drugAllergies'].setValue(null);
    this.f['existingIllness'].setValue(null);
    this.f['consultantType'].setValue(1);
    this.f['modeOfConsultant'].setValue(1);
    this.f['scheduleId'].setValue(null);
    this.f['appointmentDate'].setValue(new Date().toLocaleDateString('en-CA'));
    this.f['time'].setValue(new Date().toLocaleTimeString('en-GB'));
    this.appointmentForm.markAsPristine();
    this.appointmentForm.markAsUntouched();
    this.submitted = false;
  }
}
