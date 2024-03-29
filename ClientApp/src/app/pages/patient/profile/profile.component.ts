import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { iPatientInfo } from '../../../core/models/patientInfo.model';
import { ProfileService } from '../../../core/services/profile.service';
import { catchError, finalize, map, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  hostName = environment.serverApi;

  userData!: {
    id: any;
    userName: string;
    userType: string;
    status: number;
    fullName: string;
    avatarUrl: string;
  };

  patientData!: iPatientInfo;

  avatarUrl: string = "Default";

  constructor(
    private _authService: AuthService,
    private _profileService: ProfileService,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Profile', active: true },
    ];
    this.userData = this._authService.currentUser();
    this.fetchData();
  }

  fetchData() {
    this._spinnerService.show();
    this._profileService
      .getPatientInfo('/Patient/get-patient-details', this.userData.id)
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
            avatarUrl: data.avatarUrl
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
        this._profileService.setPatientData(res);
        this.avatarUrl = this.patientData.avatarUrl == null ? "Default" : this.hostName + `/` + this.patientData.avatarUrl;
      });
  }
}
