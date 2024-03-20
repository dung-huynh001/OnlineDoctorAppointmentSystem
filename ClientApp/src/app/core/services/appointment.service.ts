import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getDoctorOnDuty(url: string, dateTime: any): Observable<any> {
    return this.http.post(environment.serverApi + `/api` + url, dateTime);
  }
}
