import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.scss',
})
export class EditDoctorComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  userType = localStorage.getItem('userType');
  isLoading: boolean = true;
  completionLevel!: number;
  doctorId!: any;
  departmentData!: Array<{
    id: number;
    departmentName: string;
  }>;
  selectedDepartment: any;

  doctorDetails!: {
    id: number;
    userId: string;
    fullName: string;
    nationalId: string;
    email: string;
    departmentId: number;
    dateOfBirth: string;
    phoneNumber: string;
    gender: number;
    speciality: string;
    address: string;
    workingStartDate: string;
    workingEndDate: string;
    avatar: File;
  };

  personalForm!: FormGroup;
  workInfoForm!: FormGroup;
  changePassForm!: FormGroup;

  personalFormSubmitted: boolean = false;
  workInfoFormSubmitted: boolean = false;
  changePassFormSubmitted: boolean = false;

  maxFileSize: number = 272025;

  constructor(
    private router: Router,
    private _doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {
    this.completionLevel = 30;
  }

  get personalFormControl() {
    return this.personalForm.controls;
  }

  get workInfoFormControl() {
    return this.workInfoForm.controls;
  }

  get changePassFormControl() {
    return this.changePassForm.controls;
  }

  personalFormChanged(): boolean {
    if (!this.personalForm.pristine) {
      return true;
    }
    return false;
  }

  workInfoFormChanged(): boolean {
    if (!this.workInfoForm.pristine) {
      return true;
    }
    return false;
  }

  changePassFormChanged(): boolean {
    if (!this.changePassForm.pristine) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Doctor Management' },
      { label: 'Edit Doctor', active: true },
    ];

    this._doctorService
      .getDepartments()
      .pipe(
        catchError((err) => {
          console.log('Cannot load department data: ' + err);
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.departmentData = res;
      });

    const currentUrl = this.router.url;
    this.doctorId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    this._doctorService
      .getDoctorDetails('Doctor/get-doctor-details', this.doctorId)
      .pipe(
        catchError((err) => {
          this.router.navigate(['pages/page-not-found']);
          console.log(err);
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.doctorDetails = res;
        this.selectedDepartment = res.departmentId;
        this.personalForm = this.formBuilder.group({
          Id: [this.doctorDetails.id, Validators.required],
          UserId: [this.doctorDetails.userId, Validators.required],
          FullName: [this.doctorDetails.fullName, Validators.required],
          Email: [
            this.doctorDetails.email,
            [Validators.required, Validators.email],
          ],
          NationalId: [this.doctorDetails.nationalId, Validators.required],
          DateOfBirth: [this.doctorDetails.dateOfBirth, Validators.required],
          Gender: [this.doctorDetails.gender, Validators.required],
          PhoneNumber: [this.doctorDetails.phoneNumber, Validators.required],
          Address: [this.doctorDetails.address, Validators.required],
          Avatar: [null, [Validators.max(this.maxFileSize)]],
        });

        this.workInfoForm = this.formBuilder.group({
          Id: [this.doctorDetails.id, Validators.required],
          Speciality: [this.doctorDetails.speciality, Validators.required],
          DepartmentId: [this.doctorDetails.departmentId, Validators.required],
          WorkingStartDate: [
            this.doctorDetails.workingEndDate,
            Validators.required,
          ],
          WorkingEndDate: [
            this.doctorDetails.workingEndDate,
            Validators.required,
          ],
        });
      });

    this.changePassForm = this.formBuilder.group({
      OldPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });
  }

  onChangePassFormSubmit() {
    this.changePassFormSubmitted = true;
  }

  onWorkInfoFormSubmit() {
    this.workInfoFormSubmitted = true;
    if (this.workInfoForm.valid) {
      this._doctorService
        .update(
          'Doctor/update-work-info',
          this.doctorId,
          this.workInfoForm.value
        )
        .pipe(
          catchError((err) => {
            console.log('update doctor error: ' + err);
            return throwError(() => err);
          })
        )
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
          }
        });
    }
  }

  onPersonalFormSubmit() {
    this.personalFormSubmitted = true;
    if (this.personalForm.valid) {
      this._doctorService
        .update(
          'Doctor/update-personal-info',
          this.doctorId,
          this.personalForm.value
        )
        .pipe(
          catchError((err) => {
            console.log('update doctor error: ' + err);
            return throwError(() => err);
          })
        )
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
          }
        });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.personalForm.get('Avatar')?.setValue(file);
    console.log(file);
  }
}
