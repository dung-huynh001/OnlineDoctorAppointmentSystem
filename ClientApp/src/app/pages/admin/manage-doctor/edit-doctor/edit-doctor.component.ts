import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.scss',
})
export class EditDoctorComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  userType = localStorage.getItem('userType');
  isLoading: boolean = true;
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
  contractForm!: FormGroup;
  changePassForm!: FormGroup;

  personalFormSubmitted: boolean = false;
  contractFormSubmitted: boolean = false;
  changePassFormSubmitted: boolean = false;

  maxFileSize: number = 272025;

  constructor(
    private router: Router,
    private _doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {
  }

  get personalFormControl() {
    return this.personalForm.controls;
  }

  get contractFormControl() {
    return this.contractForm.controls;
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

  contractFormChanged(): boolean {
    if (!this.contractForm.pristine) {
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
      
      { label: 'Doctor Management', link: '/admin/manage-doctor' },
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
      .getDoctorDetails(this.doctorId)
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

        // Format datetime yyyy-mm-dd to bind it to input
        const dateOfBirth = this.doctorDetails.dateOfBirth.split('/').reverse().join('-');
        const workingEndDate = this.doctorDetails.workingEndDate.split('/').reverse().join('-');
        const workingStartDate = this.doctorDetails.workingStartDate.split('/').reverse().join('-');

        this.personalForm = this.formBuilder.group({
          Id: [this.doctorDetails.id, Validators.required],
          UserId: [this.doctorDetails.userId, Validators.required],
          FullName: [this.doctorDetails.fullName, Validators.required],
          Email: [
            this.doctorDetails.email,
            [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$')],
          ],
          NationalId: [this.doctorDetails.nationalId, Validators.required],
          DateOfBirth: [dateOfBirth, Validators.required],
          Gender: [this.doctorDetails.gender, Validators.required],
          PhoneNumber: [this.doctorDetails.phoneNumber, Validators.required],
          Address: [this.doctorDetails.address, Validators.required],
          Avatar: [null, [Validators.max(this.maxFileSize)]],
        });

        this.contractForm = this.formBuilder.group({
          Id: [this.doctorDetails.id, Validators.required],
          Speciality: [this.doctorDetails.speciality, Validators.required],
          DepartmentId: [this.doctorDetails.departmentId, Validators.required],
          WorkingStartDate: [
            workingEndDate,
            Validators.required,
          ],
          WorkingEndDate: [
            workingEndDate,
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

  onContractFormSubmit() {
    this.contractFormSubmitted = true;
    if (this.contractForm.valid) {
      this._doctorService
        .update(
          'Doctor/update-contract-info',
          this.doctorId,
          this.contractForm.value
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
