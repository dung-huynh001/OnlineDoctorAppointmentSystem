import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getDoctorList(data: any): Observable<any> {
    return this.http.post(`${HOSTNAME}/api/Schedule/get-doctor-list`, data);
  }

  addSchedule(data: any): Observable<any> {
    return this.http.post(`${HOSTNAME}/api/Schedule/add-schedule`, data);
  } 

  getScheduleEvents(doctorId: any): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Schedule/get-schedule-events-of-doctor?doctorId=${doctorId}`);
  }

  // getDoctorSchedules(url: string): Observable<any> {
  //   return this.http.get(`${HOSTNAME}/api${url}`);
  // }

  // getScheduleShiftByDate(url: string, doctorId:any, date: any): Observable<any> {
  //   return this.http.get(`${HOSTNAME}/api/${url}/${doctorId}?date=${date}`);
  // }

  getDoctors(): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Schedule/get-doctors`);
  }

  // getSchedulesForPatient(url: string, doctorId:any, date: any): Observable<any> {
  //   return this.http.get(`${HOSTNAME}/api/${url}`);
  // }
}
