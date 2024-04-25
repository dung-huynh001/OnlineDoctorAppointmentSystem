import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iPatient } from '../models/patient.model';
import { environment } from '../../../environments/environment';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getAll(dataTablesParameters: any): Observable<any> {
    return this.http.post<any>(`${HOSTNAME}/api/Patient/get-all`, dataTablesParameters);
  }
}
