// import { CdkStepper } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../../../core/services/rest-api.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
import { DoctorService } from '../../../../core/services/doctor.service';

const MAX_FILE_SIZE = 272025;

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss',
})
export class AddDoctorComponent implements OnInit, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  accountForm!: FormGroup;
  doctorInfoForm!: FormGroup;
  workInfoForm!: FormGroup;
  maxFileSize: number = MAX_FILE_SIZE;
  accountForm_submitted: boolean = false;
  doctorInfoForm_submitted: boolean = false;
  workInfoForm_submitted: boolean = false;
  avatarFile!: File;
  currUser: any;

  selectedIndex: number = 0;

  // Config department select
  departmentData = [{}];
  selectedAccount = 1;

  constructor(
    private formBuilder: FormBuilder,
    private _restApiService: RestApiService,
    private _toastService: ToastService,
    private _doctorService: DoctorService
  ) {}
  ngOnInit(): void {
    this.currUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.accountForm = this.formBuilder.group({
      UserType: ['doctor', Validators.required],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$')]],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });

    this.doctorInfoForm = this.formBuilder.group({
      FullName: ['', Validators.required],
      NationalId: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Gender: ['1', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Avatar: [null, [Validators.required, Validators.max(this.maxFileSize)]],
    });

    this.workInfoForm = this.formBuilder.group({
      Speciality: ['', Validators.required],
      DepartmentId: ['', Validators.required],
      WorkingStartDate: ['', Validators.required],
      WorkingEndDate: ['', Validators.required],
    });

    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Doctor Management' },
      { label: 'Create New Doctor', active: true },
    ];
  }

  ngAfterViewInit(): void {
    this._restApiService
      .get('/Department/get-department-to-select', '')
      .pipe(
        catchError((err) => {
          this._toastService.error('Cannot connect to server');
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.departmentData = res;
      });
  }

  get accountFormControl() {
    return this.accountForm.controls;
  }

  get workInfoFormControl() {
    return this.workInfoForm.controls;
  }

  get doctorInfoFormControl() {
    return this.doctorInfoForm.controls;
  }

  accountFormSubmit() {
    this.accountForm_submitted = true;
    if (this.accountFormControl['ConfirmPassword'].value && this.accountFormControl['Password'].value !== this.accountFormControl['ConfirmPassword'].value) {
      this.accountFormControl['ConfirmPassword'].setErrors({ compare: true });
    }
    if (this.accountForm.valid) {
      this.selectedIndex = 1;
    }
  }
  doctorInfoFormSubmit() {
    this.doctorInfoForm_submitted = true;
    if (this.doctorInfoForm.valid) {
      this.selectedIndex = 2;
    }
  }
  workInfoFormSubmit() {
    this.workInfoForm_submitted = true;

    if (this.workInfoForm.valid) {
      const data = {
        ...this.accountForm.value,
        ...this.doctorInfoForm.value,
        ...this.workInfoForm.value,
      };
      this._doctorService
        .create('/Doctor/create', data)
        .pipe(
          catchError((err) => {
            this._toastService.error(err.Message);
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

  resetForms() {
    this.accountForm_submitted = false;
    this.accountForm.reset();
    this.accountForm.markAsUntouched();
    this.accountForm.markAsPristine();

    this.doctorInfoForm_submitted = false;
    this.doctorInfoForm.reset();
    this.doctorInfoForm.markAsUntouched();
    this.doctorInfoForm.markAsPristine();

    this.workInfoForm_submitted = false;
    this.workInfoForm.reset();
    this.workInfoForm.markAsUntouched();
    this.workInfoForm.markAsPristine();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.doctorInfoForm.get('Avatar')?.setValue(file);
  }
}
