import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Subscription, catchError, finalize, map, throwError } from 'rxjs';
import { ProfileService } from '../../../core/services/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../core/models/auth.models';

const MINIMUM_BIRTHDAY_YEAR = 1910;
const COUNT_DOWN_MINUTES = 1;
const COUNT_DOWN_SECONDS = 0;
const STATUS_ENOUGH_INFO = '1';
const STATUS_NOT_ACTIVATE = '0';
const STATUS_ACTIVATED = '2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  @ViewChild('content') content!: TemplateRef<any>;

  currentUser!: User;
  userId: any;
  status: any;

  loaded: boolean = false;
  subscription$!: Subscription;

  form!: FormGroup;
  submitted: boolean = false;
  maxFileSize: number = 272025;

  otpCode!: string;
  expiredTime!: string;
  countDownTime: {
    m: number;
    s: number;
  } = {
    m: COUNT_DOWN_MINUTES,
    s: COUNT_DOWN_SECONDS,
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

  ngOnInit(): void {
    this.breadCrumbItems = [
      
      { label: 'Edit Profile', active: true },
    ];
    this.currentUser = this._authService.currentUser();
    this.userId = this.currentUser.id;
    this.status = this.currentUser.status;

    this.fetchData();
  }

  ngAfterViewInit(): void {
    if (this.status.toString() == STATUS_ENOUGH_INFO) {
      this._profileService.getPatient().subscribe((data) => {
        this.sendActivateEmail(data.userId, data.email);
      });
      this.openWarningModal(this.content);
    }
  }

  sendActivateEmail(id: string, email: string) {
    this.countDown();
    this._profileService
      .sendActivateEmail('Patient/send-activate-email', id, email)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe((res) => (this.expiredTime = res));
  }

  get formControl() {
    return this.form.controls;
  }

  reSendActivateEmail() {
    this.countDown();
    this._profileService.getPatient().subscribe((data) => {
      this.sendActivateEmail(data.userId, data.email);
    });
  }

  validOTP() {
    const otp = {
      code: this.otpCode,
      expiredTime: this.expiredTime,
    };

    if (this.countDownTime.m == 0 && this.countDownTime.s == 0) {
      this._toastService.warning(
        'OTP code expired. Please click on Resend OTP code'
      );
      return;
    }

    this._profileService
      .validOTP('Patient/valid-otp', this.currentUser.id, otp)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        if (res.isSuccess) {
          this.currentUser.status = STATUS_ACTIVATED;
          this._toastService.success(res.message);
          this.setCurrentUser(this.currentUser);
          this.closeModal();
        } else {
          this._toastService.warning('OTP code invalid');
        }
      });
  }

  closeModal() {
    this._modalService.dismissAll('Completed');
  }

  countDown() {
    this.countDownTime = {
      m: COUNT_DOWN_MINUTES,
      s: COUNT_DOWN_SECONDS,
    };
    const interval = setInterval(() => {
      if (this.countDownTime.m == 0 && this.countDownTime.s == 0) {
        this.disableResend = true;
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
          if (res) {
            this._toastService.success('Updated your profile successfully');
            if (this._authService.status$.value == STATUS_NOT_ACTIVATE || this._authService.status$.value  == STATUS_ENOUGH_INFO) {
              this.sendActivateEmail(this.currentUser.id, this.formControl['Email'].value)
              this.currentUser.status = STATUS_ENOUGH_INFO;
              this.openWarningModal(this.content);
            }
            this.currentUser.fullName = res.fullName;
            this.currentUser.avatarUrl = res.avatarUrl;
            this.setCurrentUser(this.currentUser);
          } else {
            this._toastService.error(res.message);
          }
        });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.form.get('Avatar')?.setValue(file);
  }

  openWarningModal(content: TemplateRef<any>) {
    this._modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (result != 'Later' && result != 'Completed')
            this.openWarningModal(content);
        },
        (reason) => {
          if (reason != 'Completed') this.openWarningModal(content);
        }
      );
  }

  setCurrentUser(user: User) {
    this._authService.setCurrentUser(user);
  }

  fetchData() {
    this._spinnerService.show();
    this.subscription$ = this._profileService
      .getPatientDetailByUserId(this.userId)
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
        this._profileService.setPatient(res);
        this.loaded = true;
        this.form = this.formBuilder.group({
          Id: [res.id, Validators.required],
          UserId: [res.userId, Validators.required],
          FullName: [res.fullName, Validators.required],
          Email: [
            res.email,
            [
              Validators.required,
              Validators.email,
              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
            ],
          ],
          NationalId: [
            res.nationalId.includes('Not update') ? '' : res.nationalId,
            Validators.required,
          ],
          DateOfBirth: [
            res.dateOfBirth.split('/').reverse().join('-'),
            [Validators.required],
          ],
          Gender: [
            res.gender === 'Male' ? 0 : res.gender === 'Female' ? 1 : 2,
            Validators.required,
          ],
          PhoneNumber: [
            res.phoneNumber.includes('Not update') ? '' : res.phoneNumber,
            Validators.required,
          ],
          Address: [
            res.address.includes('Not update') ? '' : res.address,
            Validators.required,
          ],
          Avatar: [null, [Validators.max(this.maxFileSize)]],
        });
      });
  }
}
