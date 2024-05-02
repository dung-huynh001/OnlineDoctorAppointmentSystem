import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { iPatientResource } from '../models/scheduler.model';
import { map } from 'jquery';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getDoctorList(data: any): Observable<any> {
    return this.http
      .post(`${HOSTNAME}/api/Schedule/get-doctor-list`, data)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  addSchedule(data: any): Observable<any> {
    return this.http.post(`${HOSTNAME}/api/Schedule/add-schedule`, data).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  getScheduleEvents(doctorId: any): Observable<any> {
    return this.http
      .get(
        `${HOSTNAME}/api/Schedule/get-schedule-events-of-doctor?doctorId=${doctorId}`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Schedule/get-doctors`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  getAppointmentPatients(id: string): Observable<Array<iPatientResource>> {
    return this.http
      .get<Array<iPatientResource>>(`${HOSTNAME}/api/Schedule/get-appointment-patients/${id}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        }),
      );
  }
}
