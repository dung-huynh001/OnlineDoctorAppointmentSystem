import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataTableResponse } from '../models/dataTableResponse.model';
import { apiResponse } from '../models/apiResponse.model';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key != 'ConfirmPassword') formData.append(key, data[key]);
    });

    return this.http.post(`${HOSTNAME}/api/Doctor/create`, formData);
  }

  update(url: string, id: any, data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append('id', id.toString());

    return this.http.patch(`${HOSTNAME}/api/${url}/${id}`, formData);
  }

  delete(id: number): Observable<apiResponse> {
    return this.http.delete<apiResponse>(`${HOSTNAME}/api/Doctor/delete/${id}`)
      .pipe(catchError(err => {
        console.log(err);
        return throwError(() => err);
      }))
  }

  restore(id: number): Observable<apiResponse> {
    return this.http.get<apiResponse>(`${HOSTNAME}/api/Doctor/restore/${id}`)
      .pipe(catchError(err => {
        console.log(err);
        return throwError(() => err);
      }))
  }

  getAll(dataTablesParameters: any) {
    return this.http.post<DataTableResponse>(`${HOSTNAME}/api/Doctor/get-all`, dataTablesParameters);
  }

  getScheduleByDate(id: number, dateTime: any): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Schedule/get-schedule-by-date/${id}/?date=${dateTime}`);
  }

  getScheduleByDateAndUserId(id: string, dateTime: any): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Schedule/get-schedule-by-date-and-user-id/${id}/?date=${dateTime}`);
  }

  getDoctorDetails(id: number): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Doctor/get-doctor-details/${id}`);
  }

  getDoctorDetailsByUserId(id: string): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Doctor/get-doctor-details-by-user-id/${id}`);
  }

  getDepartments(): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Department/get-department-to-select`);
  }
}
