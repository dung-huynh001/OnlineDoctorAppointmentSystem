// import { CdkStepper } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, throwError } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
import { DoctorService } from '../../../../core/services/doctor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CdkStepper, StepperSelectionEvent } from '@angular/cdk/stepper';
import { NgStepperComponent } from 'angular-ng-stepper';
import { DepartmentService } from '../../../../core/services/department.service';

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

  @ViewChild('cdkStepper') public cdkStepperObj!: NgStepperComponent;


  // Config department select
  departmentData!: Array<{
    id: number;
    departmentName: string;
  }>;
  selectedDepartment: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private _departmentService: DepartmentService,
    private _toastService: ToastService,
    private _doctorService: DoctorService,
    private _spinnerService: NgxSpinnerService
  ) { }
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
      Gender: ['0', Validators.required],
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
    this._departmentService
      .getDepartmentOptions()
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

  selectedIndexChange(event: any) {
    // console.log(event);
  }

  selectionChange(event: StepperSelectionEvent) {
    const previousIndex = event.previouslySelectedIndex;

    switch (previousIndex) {
      case 0:
        this.accountForm_submitted = true;
        this.accountForm.markAllAsTouched();
        if (this.accountForm.invalid) {
          // this.cdkStepperObj.previous();
        }
        break;
      case 1:
        this.doctorInfoForm_submitted = true;
        this.doctorInfoForm.markAllAsTouched();
        if (this.doctorInfoForm.invalid) {
          // this.cdkStepperObj.previous();
        }
        break;
      default:
        this.workInfoForm_submitted = true;
        this.workInfoForm.markAllAsTouched();
        if (this.workInfoForm.invalid) {
          const ngSelectContainer = document.querySelectorAll('ng-select');
          console.log(ngSelectContainer)
          
          // this.cdkStepperObj.previous();
        }
        break;
    }

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

      this._spinnerService.show();

      this._doctorService
        .create(data)
        .pipe(
          catchError((err) => {
            this._toastService.error(err.Message);
            return throwError(() => err);
          }),
          finalize(() => {
            this._spinnerService.hide();
          })
        )
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
            this.resetForms();
          }
        });
    }
  }

  resetForms() {
    this.accountForm.reset();
    this.accountForm.markAsUntouched();
    this.accountForm.markAsPristine();

    this.workInfoForm.reset();
    this.workInfoForm.markAsUntouched();
    this.workInfoForm.markAsPristine();

    this.doctorInfoForm.reset();
    this.doctorInfoForm.markAsUntouched();
    this.doctorInfoForm.markAsPristine();

    this.accountForm_submitted = false;
    this.doctorInfoForm_submitted = false;
    this.workInfoForm_submitted = false;

    this.selectedIndex = 0;
    this.workInfoFormControl['DepartmentId'].setValue(1);
    this.doctorInfoFormControl['Gender'].setValue(0);

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.doctorInfoForm.get('Avatar')?.setValue(file);
  }
}
