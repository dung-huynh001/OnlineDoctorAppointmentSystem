import { iDoctorDetails } from './../../../../core/models/doctor.model';
import { DoctorService } from './../../../../core/services/doctor.service';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, catchError, finalize, interval, map, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/auth.models';

const HOSTNAME = environment.serverApi;
@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.scss',
})
export class ViewDoctorComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  breadCrumbItems!: Array<{}>;
  userType = localStorage.getItem('userType');

  doctorData!: iDoctorDetails;

  selectedId!: any;
  selectedDate: Date = new Date();
  schedulesInfo!: Array<{
    shiftName: any;
    shiftTime: any;
    breakTime: any;
    description: string;
    appt: number;
  }>;
  totalApptOnDate: number = 0;

  currentUser!: User;

  constructor(
    private _doctorService: DoctorService,
    private router: Router,
    private _spinnerService: NgxSpinnerService,
    private _appointmentService: AppointmentService,
    private _authService: AuthService
  ) {
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnInit(): void {
    this.currentUser = this._authService.currentUser();
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Doctor Management' },
      { label: 'Doctor Details', active: true },
    ];

    const currentUrl = this.router.url;
    this.selectedId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    this.fetchData();
    this.getScheduleByDate();
    this.loadDataTable();
  }

  fetchData() {
    this._spinnerService.show();
    this._doctorService
      .getDoctorDetails(this.selectedId)
      .pipe(
        map((res): iDoctorDetails => {
          return {
            id: res.id,
            userId: res.userId,
            address: res.address,
            dateOfBirth: res.dateOfBirth,
            departmentId: res.departmentId,
            departmentName: res.departmentName,
            email: res.email,
            fullName: res.fullName,
            avatarUrl: HOSTNAME + '/' + res.avatarUrl,
            gender:
              res.gender === 0 ? 'Male' : res.gender === 1 ? 'Female' : 'Other',
            nationalId: res.nationalId,
            phoneNumber: res.phoneNumber,
            speciality: res.speciality,
            workingEndDate: res.workingEndDate,
            workingStartDate: res.workingStartDate,
            createdDate: res.createdDate,
            updatedDate: res.updatedDate,
          };
        }),
        catchError((err) => {
          this.router.navigate(['/pages/page-not-found']);
          return throwError(() => err);
        }),
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((res) => {
        this.doctorData = res;
      });
  }

  loadDataTable() {
    this.dtOptions = {
      serverSide: true,
      pagingType: 'full_numbers',
      processing: true,
      responsive: true,
      destroy: true,
      order: [[1, 'asc']],
      columnDefs: [
        { targets: [0, -1], searchable: false },
        { targets: [-1], orderable: false },
        {
          className: 'dtr-control',
          orderable: false,
          width: '15px',
          searchable: false,
          targets: 0,
        },
      ],
      language: {
        emptyTable: 'No records found',
      },
      columns: [
        {
          orderable: false,
          data: null,
          defaultContent: '',
        },
        {
          data: 'id',
          title: 'ID',
          className: 'text-center',
        },
        {
          data: 'patientName',
          title: 'Patient',
          render: (data: any, type: any, row: any, meta: any) => {
            return `<span class="text-center">${data}</span>`;
          },
        },
        {
          data: 'appointmentDate',
          title: 'Appointment date',
          className: 'text-end',
        },
        {
          data: 'dateOfConsultation',
          title: 'Consultation date',
          className: 'text-end',
        },
        {
          data: 'closedBy',
          title: 'Closed by',
        },
        {
          data: 'closedDate',
          title: 'Closed date',
          className: 'text-end',
        },
        {
          title: 'Action',
          data: 'id',
          render: (data: any, type: any, row: any, meta: any) => {
            const viewButton = `<button class="btn btn-soft-info btn-sm edit-btn" title="View" onClick="location.assign('/patient/appointment/view/${data}')">View</button>`;

            return `<div class="d-flex gap-3">${viewButton}</div>`;
          },
        },
      ],
      ajax: (dataTablesParameters: any, callback: Function) => {
        this._appointmentService
          .getAppointments(
            this.currentUser.id,
            this.currentUser.userType,
            'Completed',
            dataTablesParameters
          )
          .pipe(
            catchError((err) => {
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
              });
              return throwError(() => err);
            })
          )
          .subscribe((res: any) => {
            callback({
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: res.data,
            });
          });
      },
    };
  }

  onChangeDate(event: any) {
    this.selectedDate = new Date(event.target.value);
    this.getScheduleByDate();
  }

  getScheduleByDate() {
    this._doctorService
      .getScheduleByDate(
        this.selectedId,
        this.selectedDate.toLocaleDateString('en-CA')
      )
      .pipe(
        map((res) => {
          return (res = res.map((schedule: any) => ({
            shiftTime: schedule.start,
            breakTime: schedule.end,
            description: schedule.description,
            shiftName: schedule.shiftName,
            appt: schedule.appt,
          })));
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        if (res.length) {
          this.schedulesInfo = res;
          this.totalApptOnDate = this.schedulesInfo.reduce(
            (total, s) => total + s.appt,
            0
          );
        } else {
          this.schedulesInfo = [];
          this.totalApptOnDate = 0;
        }
      });
  }

  getDate(): number {
    return this.selectedDate.getDate();
  }
}
