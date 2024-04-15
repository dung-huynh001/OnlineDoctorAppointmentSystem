import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataTableResponse } from '../models/dataTableResponse.model';

const HOSTNAME = environment.serverApi;
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) { }

  getDepartments(dataTablesParameters: any) {
    return this.http.post<DataTableResponse>(`${HOSTNAME}/api/Department/get-department`, dataTablesParameters);
  }

  create(data: any): Observable<any>  {
    return this.http.post(`${HOSTNAME}/api/Department/create`, data);
  }

  update(id: number, data: any): Observable<any>  {
    return this.http.patch(`${HOSTNAME}/api//Department/update/${id}`, data);
  }

  delete(id: number): Observable<any>  {
    return this.http.delete(`${HOSTNAME}/api/Department/delete?id=${id}`);
  }

  restore(id: number): Observable<any>  {
    return this.http.get(`${HOSTNAME}/api/'Department/restore?id=${id}`);
  }
}
