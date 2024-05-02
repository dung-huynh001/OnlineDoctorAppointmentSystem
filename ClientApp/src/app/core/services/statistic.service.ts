import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { iGenderStatistic, iWidget } from '../models/statistic.model';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getStatisticAppointmentWidgets(
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

  getStatisticResourceWidgets(): Observable<Array<iWidget>> {
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

  statisticGenderOfPatient(): Observable<Array<iGenderStatistic>> {
    return this.http
      .get<Array<iGenderStatistic>>(
        `${HOSTNAME}/api/Admin/get-statistic-gender-of-patient-widgets`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }
}
