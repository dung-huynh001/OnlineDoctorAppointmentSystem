import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { iPatientInfo } from '../../../../core/models/patient.model';
import { ProfileService } from '../../../../core/services/profile.service';
import { catchError, finalize, map, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../core/models/auth.models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrl: './view-patient.component.scss'
})
export class ViewPatientComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  hostName = environment.serverApi;

  patientData!: iPatientInfo;

  avatarUrl: string = "Default";

  recentlyDiagnosis: any;
  allergies: any;

  patientId!: number;

  constructor(
    private _profileService: ProfileService,
    private _spinnerService: NgxSpinnerService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'View Patient', active: true },
    ];

    const currentUrl = this.router.url;
    this.patientId = parseInt(currentUrl.substring(currentUrl.lastIndexOf("/") + 1));

    this.fetchData();
  }

  fetchData() {
    this._spinnerService.show();
    this._profileService
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
        this._profileService.setPatient(res);
        this.avatarUrl = this.patientData.avatarUrl == null ? "https://localhost:7139/Uploads/Images/default-user.jpg" : this.hostName + `/` + this.patientData.avatarUrl;
      });
  }
}

