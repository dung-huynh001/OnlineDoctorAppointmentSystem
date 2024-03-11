import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    
    constructor( private _restApiService: RestApiService ) { }

    getAll(): Observable<Department[]> {
      return this._restApiService.get('/Department/get-all', '');
    }
}
