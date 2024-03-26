import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject, catchError, finalize, throwError } from 'rxjs';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { ProfileService } from '../../../../core/services/profile.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/auth.models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss',
})
export class AllComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  breadCrumbItems!: Array<{}>;

  currentUser!: User;

  constructor(
    private _appointmentService: AppointmentService,
    private _patientService: ProfileService,
    private _authService: AuthService,
    private datePipe: DatePipe
  ) {}
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Manage Appointment' },
      { label: 'All', active: true },
    ];

    this.currentUser = this._authService.currentUser();

    this.fetchData();
  }

  fetchData() {
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
      ajax: (dataTablesParameters: any, callback: Function) => {
        this._appointmentService
          .getAllAppointments(
            `Appointment/get-appointments`,
            this.currentUser.id,
            'patient',
            'all',
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
          .subscribe((res) => {
            callback({
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: res.data,
            });
          });
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
        },
        {
          data: 'doctorName',
          title: 'Doctor',
        },
        // {
        //   data: 'patientName',
        //   title: 'Patient',
        // },
        {
          data: 'appointmentDate',
          title: 'Appointment date',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm dd/MM/yyyy '),
        },
        {
          data: 'dateOfConsultation',
          title: 'Consultation date',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm dd/MM/yyyy '),
        },
        {
          data: 'status',
          title: 'Status',
          render: (data: any, type: any, row: any, meta: any) => {
            let badgeType = '';
            switch (data.trim().toLowerCase()) {
              case 'pending':
                badgeType = 'warning';
                break;
              case 'comfirmed':
                badgeType = 'primary';
                break;
              case 'completed':
                badgeType = 'success';
                break;
              case 'cancelled':
                badgeType = 'danger';
                break;
              default:
                badgeType = 'light';
                break;
            }
            return `<span class="badge bg-${badgeType}">${data}</span>`;
          },
        },
        {
          data: 'closedBy',
          title: 'Closed by',
          render: (data: any) => {
            return data !== null ? data : 'Not completed';
          },
        },
        {
          data: 'closedDate',
          title: 'Closed date',
          render: (data: any) => {
            return data !== null
              ? this.datePipe.transform(data, 'hh:mm dd/MM/yyyy ')
              : 'Not completed';
          },
        },
        {
          data: 'createdDate',
          title: 'Created date',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm dd/MM/yyyy '),
        },
        {
          data: 'createdBy',
          title: 'Created by',
        },
        {
          title: 'Action',
          data: 'id',
          render: (data: any, type: any, row: any, meta: any) => {
            const viewButton = `<button class="btn btn-soft-info btn-sm edit-btn" title="View" onClick="location.assign('/patient/appointment/view/${data}')">View</button>`;
            const cancelButton = `<button class="btn btn-soft-danger btn-sm delete-btn" title="Delete">Cancel</button>`;
            
            return `<div class="d-flex gap-3">${viewButton} ${cancelButton}</div>`;
          },
        },
      ],
    };
  }
}
