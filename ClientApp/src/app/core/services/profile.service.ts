import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { iPatientInfo } from '../models/patient.model';

const HOSTNAME = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private patient$: Subject<iPatientInfo> = new Subject<iPatientInfo>();
  
  constructor(private http: HttpClient) {
  }

  getPatient() {
    return this.patient$.asObservable();
  }

  setPatient(data: iPatientInfo) {
    this.patient$.next(data);
  }

  getPatientDetailByUserId(id: string): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Patient/get-patient-detail-by-user-id?id=${id}`);
  }

  getPatientDetailByPatientId(id: number): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/Patient/get-patient-detail-by-patient-id/${id}`);
  }

  updatePatientInfo(url: string, id: any, data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http.patch(`${HOSTNAME}/api/${url}/${id}`, formData);
  }

  sendActivateEmail(url: string, id: any, email: any): Observable<any> {
    return this.http.get(`${HOSTNAME}/api/${url}/${id}?email=${email}`);
  }

  validOTP(url: string, id: string, otp: {}): Observable<any> {
    return this.http.post(`${HOSTNAME}/api/${url}/${id}`, otp);
  }

}
