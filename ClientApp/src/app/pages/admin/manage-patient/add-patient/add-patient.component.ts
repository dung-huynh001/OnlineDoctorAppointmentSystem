import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../../core/services/toast.service';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class AddPatientComponent implements OnInit {
  addFormGroup!: FormGroup;
  submitted: boolean = false;
  breadCrumbItems!: Array<{}>

  constructor(private formBuilder: FormBuilder,
    private _spinnerService: NgxSpinnerService,
    private _toastService: ToastService,
    private _appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Patient Management', link: '/admin/manage-patient' },
      { label: 'Create New Patient', active: true },
    ];

    this.addFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      fullName: ['', [Validators.required]],
      nationalId: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.addFormGroup.controls).forEach(key => {
      this.addFormGroup.controls[key].updateValueAndValidity();
    })
    if (this.addFormGroup.valid) {
      this._appointmentService
        .addNewPatient(this.addFormGroup.value)
        .pipe(
          catchError((err) => {
            this._toastService.error(err.Message);
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
          } else {
            this._toastService.error(res.message);
          }
        });
    }
  }

  resetForm() {
    this.addFormGroup.reset();
    this.submitted = false;
    this.addFormGroup.controls['gender'].setValue('');
    this.addFormGroup.markAsPristine();
    this.addFormGroup.markAsUntouched();

    Object.keys(this.addFormGroup.controls).forEach(key => {
      this.addFormGroup.controls[key].setErrors(null);
    })
  }
}
