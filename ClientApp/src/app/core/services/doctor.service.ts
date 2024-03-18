import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataTableResponse } from '../models/dataTableResponse.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) { }

  create(url: string, data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key != 'ConfirmPassword') formData.append(key, data[key]);
    });

    return this.http.post(environment.serverApi + `/api` + url, formData);
  }

  update(url: string, id: any, data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append('id', id.toString());
    
    return this.http.patch(environment.serverApi + `/api/${url}/${id}`, formData);
  }

  getAll(url: string, dataTablesParameters: any) {
    return this.http.post<DataTableResponse>(environment.serverApi + `/api` + url, dataTablesParameters);
  }

  getScheduleByDate(url: string, id: any, dateTime: any): Observable<any> {
    return this.http.get(environment.serverApi + `/api/${url}/${id}/?dateTime=${dateTime}`);
  }

  getDoctorDetails(url: string, id: any): Observable<any> {
    return this.http.get(environment.serverApi + `/api/${url}/${id}`);
  }

  getDepartments(): Observable<any>{
    return this.http.get(environment.serverApi + `/api/Department/get-department-to-select`);
  }
}
