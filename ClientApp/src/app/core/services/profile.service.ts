import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

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
