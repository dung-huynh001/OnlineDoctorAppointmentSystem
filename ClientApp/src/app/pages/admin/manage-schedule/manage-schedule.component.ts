import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../core/services/doctor.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.scss'
})
export class ManageScheduleComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  departmentData!: Array<{
    id: number;
    departmentName: string;
  }>;
  selectedDepartment: number = 1;
  

  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

  constructor(private _doctorService: DoctorService) {

  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Schedule of doctors', active: true }
    ];

    this._doctorService
      .getDepartments()
      .pipe(
        catchError((err) => {
          console.log('Cannot load department data: ' + err);
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.departmentData = res;
      });
  }
}
