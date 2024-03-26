import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) { }

  getDoctorOnDuty(url: string, dateTime: any): Observable<any> {
    return this.http.post(HOSTNAME + `/api` + url + `?date=${dateTime}`, dateTime);
  }

  makeAppoinntment(url: string, data: any): Observable<any> {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    return this.http.post(HOSTNAME + `/api` + url, formData);
  }

  getAllAppointments(url: string, id: any, userType: string, type: string, dataTablesParameters: any): Observable<any> {
    return this.http.post(HOSTNAME + `/api/${url}/${id}?type=${type}&userType=${userType}`, dataTablesParameters);
  }
}
