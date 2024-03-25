import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { catchError, finalize, map, throwError } from 'rxjs';
import { ProfileService } from '../../../core/services/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { iPatientInfo } from '../../../core/models/patientInfo.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { count } from 'console';

const MINIMUM_BIRTHDAY_YEAR = '1910';
const COUNT_DOWN_TIME = 3;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  @ViewChild('content') content!: TemplateRef<any>;

  currentUser: any;
  userId: any;
  status: any;

  patientData!: iPatientInfo;
  loaded: boolean = false;

  form!: FormGroup;
  submitted: boolean = false;
  maxFileSize: number = 272025;

  otpCode!: string;
  expiredTime!: string;
  countDownMinute = COUNT_DOWN_TIME;
  countDownTime = {
    m: 3,
    s: 0
  };
  disableResend = false;

  constructor(
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _profileService: ProfileService,
    private _spinnerService: NgxSpinnerService,
    private _authService: AuthService,
    private _modalService: NgbModal
  ) {}
  ngAfterViewInit(): void {
    const email = localStorage.getItem('email')!;
    const id = this.currentUser.id;
    if (this.status == 1) {
      this._profileService
        .sendActivateEmail('Patient/send-activate-email', id, email)
        .pipe(
          catchError((err) => {
            return throwError(() => err);
          })
        )
        .subscribe((res) => (this.expiredTime = res));
      this.openWarningModal(this.content);
    }
  }
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Profile', active: true },
    ];

    this.currentUser = this._authService.currentUser();
    this.userId = this.currentUser.id;
    this.status = this.currentUser.status;

    this.fetchData();
  }

  get formControl() {
    return this.form.controls;
  }

  validOTP() {
    const otp = {
      code: this.otpCode,
      expiredTime: this.expiredTime,
    };

    this._profileService
      .validOTP('Patient/valid-otp', this.currentUser.id, otp)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      )
      .subscribe((success) => {
        if (success) {
          this._toastService.success('Activate account successfully');
        }
      });
  }

  countDown() {
    this.disableResend = true;
    const interval = setInterval(() => {
      if (this.countDownTime.m == 0) {
        clearInterval(interval);
      } else {
        if (this.countDownTime.s == 0) {
          this.countDownTime.s = 59;
          --this.countDownTime.m;
        } else {
          --this.countDownTime.s;
        }
      }
    }, 1000);
  }

  onSubmit() {
    this.submitted = true;
    const dateOfBirth_year = this.formControl['DateOfBirth'].value.slice(0, 4);
    if (dateOfBirth_year < MINIMUM_BIRTHDAY_YEAR) {
      this.formControl['DateOfBirth'].setErrors({ require: true });
    }
    if (this.form.valid) {
      this._spinnerService.show();
      this._profileService
        .updatePatientInfo(
          'Patient/update-patient-info',
          this.formControl['Id'].value,
          this.form.value
        )
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
          if (res.isSuccess) {
            this._toastService.success(res.message);
            if (this.status == 0 || this.status == 1) {
              this.setStatus();
              this.openWarningModal(this.content);
            }
          } else {
            this._toastService.error(res.message);
          }
        });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.form.get('Avatar')?.setValue(file);
    console.log(file);
  }

  openWarningModal(content: TemplateRef<any>) {
    this._modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (result != 'Later') this.openWarningModal(content);
        },
        (reason) => {
          this.openWarningModal(content);
        }
      );
  }

  sendActiveEmail() {}

  setStatus() {
    this.currentUser.status = 1;
    const currentUser = JSON.stringify(this.currentUser);
    localStorage.setItem('currentUser', currentUser);
  }

  fetchData() {
    this._spinnerService.show();
    this._profileService
      .getPatientInfo('/Patient/get-patient-details', this.userId)
      .pipe(
        map((data) => {
          return {
            id: data.id,
            userId: data.userId,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            address: data.address,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            nationalId: data.nationalId,
            createdDate: data.createdDate,
            updatedDate: data.updatedDate,
            avatarUrl: data.avatarUrl,
          };
        }),
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        }),
        finalize(() => {
          setTimeout(() => {
            this._spinnerService.hide();
          }, 200);
        })
      )
      .subscribe((res) => {
        this.patientData = res;

        localStorage.setItem('userId', res.id);
        localStorage.setItem('email', res.email);

        this.loaded = true;
        this.form = this.formBuilder.group({
          Id: [this.patientData.id, Validators.required],
          UserId: [this.patientData.userId, Validators.required],
          FullName: [this.patientData.fullName, Validators.required],
          Email: [
            this.patientData.email,
            [
              Validators.required,
              Validators.email,
              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
            ],
          ],
          NationalId: [
            this.patientData.nationalId.includes('Not update')
              ? ''
              : this.patientData.nationalId,
            Validators.required,
          ],
          DateOfBirth: [
            this.patientData.dateOfBirth.split('/').reverse().join('-'),
            [Validators.required],
          ],
          Gender: [
            this.patientData.gender === 'Male'
              ? 0
              : this.patientData.gender === 'Female'
              ? 1
              : 2,
            Validators.required,
          ],
          PhoneNumber: [
            this.patientData.phoneNumber.includes('Not update')
              ? ''
              : this.patientData.phoneNumber,
            Validators.required,
          ],
          Address: [
            this.patientData.address.includes('Not update')
              ? ''
              : this.patientData.address,
            Validators.required,
          ],
          Avatar: [null, [Validators.max(this.maxFileSize)]],
        });
      });
  }
}
