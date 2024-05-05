import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../core/services/doctor.service';
import { catchError, throwError } from 'rxjs';
import { ScheduleService } from '../../../core/services/schedule.service';
import { DataTableResponse } from '../../../core/models/dataTableResponse.model';
import { environment } from '../../../../environments/environment';

const MAX_ITEMS_ON_PAGES = 12;
@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.scss',
})
export class ManageScheduleComponent implements OnInit {
  hostName = environment.serverApi;
  breadCrumbItems!: Array<{}>;
  departmentData!: Array<{
    id: number;
    departmentName: string;
  }>;
  selectedDepartment: number = 1;

  doctorList: DataTableResponse = {
    data: [],
    recordsFiltered: 0,
    recordsTotal: 0
  };
  pageSize = MAX_ITEMS_ON_PAGES;
  currentPage = 1;

  filter!: {
    searchValue: any;
    departmentId: number;
    start: number;
    length: number;
  };

  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

  constructor(
    private _doctorService: DoctorService,
    private _scheduleService: ScheduleService
  ) {
    this.filter = {
      searchValue: '',
      departmentId: 0,
      start: 0,
      length: MAX_ITEMS_ON_PAGES,
    };
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Manage Schedule', active: true },
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

      this.filterData(this.filter)
  }

  filterData(filter: any) {
    this._scheduleService
      .getDoctorList(filter)
      .pipe(
        catchError((err) => {
          console.log('cannot load doctor list: ' + err);
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.doctorList = {
          data: res.data,
          recordsFiltered: res.recordsFiltered,
          recordsTotal: res.recordsTotal,
        };
      });
  }

  onPageChanges(event: any) {
    this.filter.start = event * MAX_ITEMS_ON_PAGES - 1;
    this.filterData(this.filter);
  }

  resetFilter() {
    this.filter = {
      departmentId: 0,
      length: MAX_ITEMS_ON_PAGES,
      searchValue: '',
      start: 0
    }
  }
}
