import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getDoctorList(url: string, data: any): Observable<any> {
    return this.http.post(environment.serverApi + `/api` + url, data);
  }

  addSchedule(url: string, data: any): Observable<any> {
    return this.http.post(environment.serverApi + `/api` + url, data);
  } 

  getScheduleEvents(url: string, doctorId: any): Observable<any> {
    return this.http.get(environment.serverApi + `/api${url}?doctorId=${doctorId}`);
  }

  getSchedulesOfDoctors(url: string): Observable<any> {
    return this.http.get(environment.serverApi + `/api${url}`);
  }
}
