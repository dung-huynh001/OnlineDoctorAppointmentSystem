import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataTableResponse } from '../models/dataTableResponse.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  create(url: string, data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key != 'ConfirmPassword') formData.append(key, data[key]);
    });

    return this.http.post(environment.serverApi + `/api` + url, formData);
  }

  getAll(url: string, dataTablesParameters: any) {
    return this.http.post<DataTableResponse>(environment.serverApi + `/api` + url, dataTablesParameters);
  }
}
