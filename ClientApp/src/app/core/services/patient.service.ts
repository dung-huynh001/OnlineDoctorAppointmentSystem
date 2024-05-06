import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiResponse } from '../models/apiResponse.model';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getAll(dataTablesParameters: any): Observable<any> {
    return this.http.post<any>(`${HOSTNAME}/api/Patient/get-all`, dataTablesParameters);
  }

  delete(id: number): Observable<apiResponse> {
    return this.http.delete<apiResponse>(`${HOSTNAME}/api/Patient/delete/${id}`)
      .pipe(catchError(err => {
        console.log(err);
        return throwError(() => err);
      }))
  }

  restore(id: number): Observable<apiResponse> {
    return this.http.get<apiResponse>(`${HOSTNAME}/api/Patient/restore/${id}`)
      .pipe(catchError(err => {
        console.log(err);
        return throwError(() => err);
      }))
  }
}
