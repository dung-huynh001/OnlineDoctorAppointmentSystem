// import { CdkStepper } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../../../core/services/rest-api.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
import { DoctorService } from '../../../../core/services/doctor.service';

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
  maxFileSize: number = 272025;
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
      Email: ['doctor1@gmail.com', [Validators.required, Validators.email]],
      Username: ['doctor1', Validators.required],
      Password: ['password123', Validators.required],
      ConfirmPassword: ['password123', Validators.required],
    });

    this.doctorInfoForm = this.formBuilder.group({
      FullName: ['Hai Nguyen', Validators.required],
      NationalId: ['93445893493', Validators.required],
      DateOfBirth: ['06/12/2001', Validators.required],
      Gender: ['1', Validators.required],
      PhoneNumber: ['0954958439', Validators.required],
      Address: ['Hem 51, 3/2', Validators.required],
      Avatar: [null, [Validators.required, Validators.max(this.maxFileSize)]],
    });

    this.workInfoForm = this.formBuilder.group({
      Speciality: ['Brain', Validators.required],
      DepartmentId: ['', Validators.required],
      WorkingStartDate: ['06/12/2018', Validators.required],
      WorkingEndDate: ['06/12/2021', Validators.required],
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
    this.selectedIndex = 1;
    // if (this.accountForm.valid) {
    //   this.selectedIndex = 1;
    // }
  }
  doctorInfoFormSubmit() {
    this.selectedIndex = 2;
    this.doctorInfoForm_submitted = true;
    // if (this.doctorInfoForm.valid) {
    //   this.selectedIndex = 2;
    // }
  }
  workInfoFormSubmit() {
    this.workInfoForm_submitted = true;

    if (this.workInfoForm.valid) {
      const data = {
        ...this.accountForm.value,
        ...this.doctorInfoForm.value,
        ...this.workInfoForm.value,
      };
      console.log(data);

      this._doctorService
        .create('/Doctor/create', data)
        .pipe(catchError(err => {
          this._toastService.error('Something went wrong');
          return throwError(() => err);
        }))
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
          }
        });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.doctorInfoForm.get('Avatar')?.setValue(file);
    console.log(file);
  }
}
