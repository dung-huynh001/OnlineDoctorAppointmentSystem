import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataTableResponse } from '../models/dataTableResponse.model';

const hostName = environment.serverApi;
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) { }

  getAll(url: string, dataTablesParameters: any) {
    return this.http.post<DataTableResponse>(environment.serverApi + `/api` + url, dataTablesParameters);
  }

  create(url: string, data: any): Observable<any>  {
    return this.http.post(hostName + `/api` + url, data);
  }

  update(url: string, id: number, data: any): Observable<any>  {
    return this.http.patch(hostName + `/api/${url}/${id}`, data);
  }

  delete(url: string, id: number): Observable<any>  {
    return this.http.delete(hostName + `/api/${url}?id=${id}`);
  }

  restore(url: string, id: number): Observable<any>  {
    return this.http.get(hostName + `/api/${url}?id=${id}`);
  }
}
