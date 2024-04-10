import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/auth.models';
import { AppointmentService } from '../../core/services/appointment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-datatable',
  templateUrl: './appointment-datatable.component.html',
  styleUrl: './appointment-datatable.component.scss',
})
export class AppointmentDatatableComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() title!: string;
  @Input() appointmentStatus!: string;
  @Output() selectedId!: number;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  currentUser!: User;

  customColumns!: Array<any>;

  constructor(
    private _authService: AuthService,
    private _appointmentService: AppointmentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // this.currentUser = this._authService.currentUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.currentUser && !this.customColumns) {
      this.currentUser = this._authService.currentUser();
      const userType = this.currentUser.userType.toLowerCase().trim();
      this.customColumns =
        userType == 'patient'
          ? [
              {
                data: 'doctorName',
                title: 'Doctor',
              },
            ]
          : userType == 'doctor'
          ? [
              {
                data: 'patientName',
                title: 'Patient',
              },
            ]
          : [
              {
                data: 'doctorName',
                title: 'Doctor',
              },
              {
                data: 'patientName',
                title: 'Patient',
              },
            ];
    }
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
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
            this.currentUser.userType,
            this.appointmentStatus,
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
        // {
        //   data: 'doctorName',
        //   title: 'Doctor',
        // },
        ...this.customColumns,
        {
          data: 'appointmentDate',
          title: 'Appointment date',
          className: 'text-end',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm dd/MM/yyyy '),
        },
        {
          data: 'dateOfConsultation',
          title: 'Consultation date',
          className: 'text-end',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm dd/MM/yyyy '),
        },
        {
          data: 'status',
          title: 'Status',
          render: (data: any) => {
            let textColor = '';
            if (this.appointmentStatus.toLowerCase() == 'out-of-date') {
              data = 'out-of-date';
              textColor = 'text-muted';
            }

            let badgeType = this.setBadgeType(data);
            return `<span class="badge ${textColor} bg-${badgeType}">${data}</span>`;
          },
        },
        {
          data: 'closedBy',
          title: 'Closed by',
          render: (data: any) => {
            return data !== null ? data : '--unknown--';
          },
        },
        {
          data: 'closedDate',
          title: 'Closed date',
          className: 'text-end',
          render: (data: any) => {
            return data !== null
              ? this.datePipe.transform(data, 'hh:mm dd/MM/yyyy ')
              : '--unknown--';
          },
        },
        {
          data: 'createdDate',
          title: 'Created date',
          className: 'text-end',
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
            return this.setActionColumn(data, row);
          },
        },
      ],
    };
  }

  setActionColumn(data: any, row: any) {
    const viewButton = `<button class="btn btn-soft-info btn-sm edit-btn" title="View" onClick="location.assign('/patient/appointment/view/${data}')">View</button>`;
    if (this.appointmentStatus.trim().toLowerCase() !== 'cancelled') {
      const cancelButton =
        row.status.toLowerCase() !== 'cancelled'
          ? `<button class="btn btn-soft-danger btn-sm cancel-btn" data-appointment-id=${data} title="cancel">Cancel</button>`
          : `<button class="btn btn-soft-light btn-sm cancel-btn text-dark" disabled data-appointment-id=${data} title="cancel">Cancelled</button>`;

      return `<div class="d-flex gap-3">${viewButton} ${cancelButton}</div>`;
    }
    return `<div class="d-flex gap-3">${viewButton}</div>`;
  }

  setBadgeType(status: string): string {
    let badgeType = '';
    switch (status.trim().toLowerCase()) {
      case 'pending':
        badgeType = 'warning';
        break;
      case 'confirmed':
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

    return badgeType;
  }
}
