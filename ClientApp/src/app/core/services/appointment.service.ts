import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

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
      dateOfConsultation: string
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
      dateOfConsultation: string
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

  getDoctorOnDuty(url: string, dateTime: any): Observable<any> {
    return this.http.post(
      HOSTNAME + `/api` + url + `?date=${dateTime}`,
      dateTime
    );
  }

  makeAppoinntment(url: string, data: any): Observable<any> {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http.post(HOSTNAME + `/api` + url, formData);
  }

  getAllAppointments(
    url: string,
    id: any,
    userType: string,
    type: string,
    dataTablesParameters: any
  ): Observable<any> {
    return this.http.post(
      HOSTNAME + `/api/${url}/${id}?type=${type}&userType=${userType}`,
      dataTablesParameters
    );
  }

  cancelAppointment(url: string, id: any): Observable<any> {
    return this.http.get(HOSTNAME + `/api/${url}/${id}`);
  }

  viewAppointmentDetails(url: string, id: any): Observable<any> {
    return this.http.get(HOSTNAME + `/api/${url}/${id}`);
  }

  loadWidgets(url: string, id: any, userType: any): Observable<any> {
    return this.http.get(HOSTNAME + `/api/${url}/${id}?userType=${userType}`);
  }

  getRecentlyAppointment(url: string, id: any): Observable<any> {
    return this.http.get(HOSTNAME + `/api/${url}/${id}`);
  }

  getUpcomingAppointment(url: string, id: any): Observable<any> {
    return this.http.get(HOSTNAME + `/api/${url}/${id}`);
  }
}
