import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { iPatientInfo } from '../models/patientInfo.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private patientData$: Subject<iPatientInfo> = new Subject<iPatientInfo>();
  
  constructor(private http: HttpClient) {
  }

  getPatientData() {
    return this.patientData$.asObservable();
  }

  setPatientData(data: iPatientInfo) {
    this.patientData$.next(data);
  }

  getPatientInfo(url: string, id: any): Observable<any> {
    return this.http.get(environment.serverApi + `/api` + url + `?id=${id}`);
  }

  updatePatientInfo(url: string, id: any, data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http.patch(environment.serverApi + `/api/${url}/${id}`, formData);
  }

  sendActivateEmail(url: string, id: any, email: any): Observable<any> {
    return this.http.get(environment.serverApi + `/api/${url}/${id}?email=${email}`);
  }

  validOTP(url: string, id: string, otp: {}): Observable<any> {
    return this.http.post(environment.serverApi + `/api/${url}/${id}`, otp);
  }

}
