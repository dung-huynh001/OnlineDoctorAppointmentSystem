import { AppointmentStatisticRequest } from './../models/statistic.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {
  iAppointmentStatistic,
  iGenderStatistic,
  iWidget,
} from '../models/statistic.model';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  statisticAppointmentWidgets(
    userId: string,
    userType: string
  ): Observable<Array<iWidget>> {
    return this.http
      .get<Array<iWidget>>(
        `${HOSTNAME}/api/${userType}/get-statistic-appointment-widgets?userId=${userId}&userType=${userType}`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  statisticResourceWidgets(): Observable<Array<iWidget>> {
    return this.http
      .get<Array<iWidget>>(
        `${HOSTNAME}/api/Admin/get-statistic-resource-widgets`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  statisticAppointment(
    data: AppointmentStatisticRequest
  ): Observable<iAppointmentStatistic> {
    return this.http
      .post<iAppointmentStatistic>(
        `${HOSTNAME}/api/Admin/statistic-appointment`,
        data
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  statisticGender(): Observable<Array<iGenderStatistic>> {
    return this.http
      .get<Array<iGenderStatistic>>(
        `${HOSTNAME}/api/Admin/statistic-gender`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }
}
