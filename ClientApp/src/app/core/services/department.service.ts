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
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments(dataTablesParameters: any): Observable<DataTableResponse> {
    return this.http.post<DataTableResponse>(
      `${HOSTNAME}/api/Department/get-department`,
      dataTablesParameters
    );
  }

  create(data: any): Observable<apiResponse> {
    return this.http.post<apiResponse>(`${HOSTNAME}/api/Department/create`, data).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  update(id: number, data: any): Observable<apiResponse> {
    return this.http
      .patch<apiResponse>(`${HOSTNAME}/api//Department/update/${id}`, data)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  delete(id: number): Observable<apiResponse> {
    return this.http.delete<apiResponse>(`${HOSTNAME}/api/Department/delete?id=${id}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  restore(id: number): Observable<apiResponse> {
    return this.http.get<apiResponse>(`${HOSTNAME}/api/'Department/restore?id=${id}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }
}
