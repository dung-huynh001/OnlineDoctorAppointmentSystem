import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const hostName = environment.serverApi;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getDoctorList(url: string, data: any): Observable<any> {
    return this.http.post(hostName + `/api` + url, data);
  }

  addSchedule(url: string, data: any): Observable<any> {
    return this.http.post(hostName + `/api` + url, data);
  } 

  getScheduleEvents(url: string, doctorId: any): Observable<any> {
    return this.http.get(hostName + `/api${url}?doctorId=${doctorId}`);
  }

  getSchedulesOfDoctors(url: string): Observable<any> {
    return this.http.get(hostName + `/api${url}`);
  }

  getScheduleShiftByDate(url: string, doctorId:any, date: any): Observable<any> {
    return this.http.get(hostName + `/api/${url}/${doctorId}?date=${date}`);
  }

  getDoctors(url: string): Observable<any> {
    return this.http.get(hostName + `/api/${url}`);
  }

  getSchedulesForPatient(url: string, doctorId:any, date: any): Observable<any> {
    return this.http.get(hostName + `/api/${url}`);
  }
}
