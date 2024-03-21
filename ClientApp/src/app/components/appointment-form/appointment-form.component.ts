import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../core/services/rest-api.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _restApiService: RestApiService,
    private readonly elementRef: ElementRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['defaultData']){
      this.defaultData = changes['defaultData'].currentValue;
    }

    this.appointmentForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      patientName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['1', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],

      doctorId: [this.defaultData.doctorId, Validators.required],
      doctorName: [this.defaultData.doctorName, Validators.required],
      speciality: [this.defaultData.speciality, Validators.required],
      appointmentDate: [new Date().toLocaleDateString('en-CA'), Validators.required],
      appointmentStatus: ['Pending', Validators.required],
      time: [new Date().toLocaleTimeString(), Validators.required],
      scheduleId: [this.defaultData.scheduleId, Validators.required],
      modeOfConsultant: ['1', Validators.required],
      consultantType: ['1', Validators.required],
      existingIllness: [''],
      drugAllergies: [''],
      note: [''],
    });

    const doctorNameElement = this.elementRef.nativeElement.querySelector('#appointmentDate');
    doctorNameElement.scrollIntoView({ behavior: 'smooth' });
  }

  get f() {
    return this.appointmentForm.controls;
  }

  ngOnInit(): void {

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
