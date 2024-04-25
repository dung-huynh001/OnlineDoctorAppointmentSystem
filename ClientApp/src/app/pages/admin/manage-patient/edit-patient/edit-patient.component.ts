import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { Subscription, catchError, finalize, map, throwError } from 'rxjs';
import { ProfileService } from '../../../../core/services/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/auth.models';
import { Router } from '@angular/router';

const MINIMUM_BIRTHDAY_YEAR = 1910;

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.scss'
})
export class EditPatientComponent implements OnInit, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  @ViewChild('content') content!: TemplateRef<any>;

  loaded: boolean = false;
  subscription$!: Subscription;

  form!: FormGroup;
  submitted: boolean = false;
  maxFileSize: number = 272025;

  patientId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _profileService: ProfileService,
    private _spinnerService: NgxSpinnerService,
    private _modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Edit Patient', active: true },
    ];


    const currentUrl = this.router.url;
    this.patientId = parseInt(currentUrl.substring(currentUrl.lastIndexOf("/") + 1));

    this.fetchData();
  }

  ngAfterViewInit(): void {

  }


  get formControl() {
    return this.form.controls;
  }

  closeModal() {
    this._modalService.dismissAll('Completed');
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

  fetchData() {
    this._spinnerService.show();
    this.subscription$ = this._profileService
      .getPatientDetailByPatientId(this.patientId)
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
