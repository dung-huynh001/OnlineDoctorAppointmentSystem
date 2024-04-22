import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiResponse } from '../models/apiResponse.model';
import { iPrescription } from '../models/prescription.model';
import { iAppointment } from '../models/appointment.model';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private widgetsData$: Subject<Array<number>> = new Subject();
  private recentlyAppointments$: Subject<
    Array<{
      id: number;
      appointmentDate: string;
      avatarUrl: string;
      speciality: string;
      doctorName: string;
    }>
  > = new Subject();

  private upcomingAppointments$: Subject<
    Array<{
      id: number;
      appointmentDate: string;
      doctorName: string;
      speciality: string;
      dateOfConsultation: string;
    }>
  > = new Subject();

  setWidgetsData(widgetsData: Array<number>) {
    this.widgetsData$.next(widgetsData);
  }

  setRecentlyApptData(
    recentlyApptData: Array<{
      id: number;
      appointmentDate: string;
      avatarUrl: string;
      speciality: string;
      doctorName: string;
    }>
  ) {
    this.recentlyAppointments$.next(recentlyApptData);
  }

  setUpcomingApptData(
    upcomingApptData: Array<{
      id: number;
      appointmentDate: string;
      doctorName: string;
      speciality: string;
      dateOfConsultation: string;
    }>
  ) {
    this.upcomingAppointments$.next(upcomingApptData);
  }

  get WidgetsData() {
    return this.widgetsData$.asObservable();
  }

  get RecentlyAppointments() {
    return this.recentlyAppointments$.asObservable();
  }

  get UpcomingAppointment() {
    return this.upcomingAppointments$.asObservable();
  }

  constructor(private http: HttpClient) {}

  getHospitalInfo(): Observable<any> {
    return this.http.get(environment.hospitalConfigPath);
  }

  getDoctorOnDuty(dateTime: any): Observable<any> {
    return this.http
      .get(`${HOSTNAME}/api/Doctor/get-doctor-on-duty?date=${dateTime}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  makeAppointment(data: any): Observable<apiResponse> {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http
      .post<apiResponse>(
        `${HOSTNAME}/api/Appointment/make-appointment`,
        formData
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getAppointments(
    id: any,
    userType: string,
    type: string,
    dataTablesParameters: any
  ): Observable<any> {
    return this.http
      .post(
        `${HOSTNAME}/api/Appointment/get-appointments/${id}?type=${type}&userType=${userType}`,
        dataTablesParameters
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  cancelAppointment(id: any): Observable<any> {
    return this.http
      .get(`${HOSTNAME}/api/Appointment/cancel-appointment/${id}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  viewAppointmentDetails(id: any): Observable<iAppointment> {
    return this.http
      .get<iAppointment>(
        `${HOSTNAME}/api/Appointment/view-appointment-details/${id}`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  loadWidgets(url: string, id: any, userType: any): Observable<any> {
    return this.http
      .get(HOSTNAME + `/api/${url}/${id}?userType=${userType}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getRecentlyAppointment(id: any): Observable<any> {
    return this.http
      .get(`${HOSTNAME}/api/Appointment/get-recently-appointments/${id}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getNewBooking(id: any): Observable<any> {
    return this.http
      .get(`${HOSTNAME}/api/Appointment/get-new-booking/${id}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getUpcomingAppointment(id: any, userType: string): Observable<any> {
    return this.http
      .get(
        `${HOSTNAME}/api/Appointment/get-upcoming-appointments/${id}?userType=${userType}`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getPatientsToFillDropdown(): Observable<any> {
    return this.http
      .get(`${HOSTNAME}/api/Appointment/get-patients-to-fill-dropdown`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  addNewPatient(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return this.http
      .post(`${HOSTNAME}/api/Appointment/add-new-patient`, formData)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  updateAppointmentStatus(
    id: number,
    appointmentStatus: string
  ): Observable<apiResponse> {
    return this.http
      .get<apiResponse>(
        `${HOSTNAME}/api/Appointment/update-appointment-status/${id}?appointmentStatus=${appointmentStatus}`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getFreq(): Observable<
    {
      value: number;
      text: string;
    }[]
  > {
    return this.http
      .get<
        {
          value: number;
          text: string;
        }[]
      >(`${HOSTNAME}/api/Appointment/get-frequency`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getUnit(): Observable<
    {
      value: number;
      text: string;
    }[]
  > {
    return this.http
      .get<
        {
          value: number;
          text: string;
        }[]
      >(`${HOSTNAME}/api/Appointment/get-unit`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getDiagnosis(id: number): Observable<{
    diagnosis: string;
    caseNote: string;
    adviceToPatient: string;
  }> {
    return this.http
      .get<{
        diagnosis: string;
        caseNote: string;
        adviceToPatient: string;
      }>(`${HOSTNAME}/api/Appointment/get-diagnosis/${id}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  getPrescription(id: number): Observable<Array<iPrescription>> {
    return this.http
      .get<Array<iPrescription>>(
        `${HOSTNAME}/api/Appointment/get-prescriptions/${id}`
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  updatePrescriptions(id: number, prescriptions: any): Observable<apiResponse> {
    return this.http
      .post<apiResponse>(
        `${HOSTNAME}/api/Appointment/update-prescriptions/${id}`,
        prescriptions
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  updateDiagnosis(id: number, diagnosis: any): Observable<apiResponse> {
    return this.http
      .patch<apiResponse>(
        `${HOSTNAME}/api/Appointment/update-diagnosis/${id}`,
        diagnosis
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  changeAppointmentDate(id: number, appointmentDate: Date) {
    return this.http
      .patch<apiResponse>(
        `${HOSTNAME}/api/Appointment/change-appointment-date/${id}`,
        appointmentDate
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }
}
