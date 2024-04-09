import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/auth.models';
import { Subject, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

const HOSTNAME = environment.serverApi;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  today = new Date().toDateString();
  currentUser!: User;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  hostName = HOSTNAME;

  widgetsData: Array<number> = [0, 0, 0, 0];
  recentlyAppointments!: Array<{
    id: number;
    appointmentDate: string;
    avatarUrl: string;
    speciality: string;
    doctorName: string;
  }>;

  upcomingAppointments: Array<{
    id: number;
    appointmentDate: string;
    doctorName: string;
    speciality: string;
    dateOfConsultation: string;
  }> =  [];

  constructor(
    private _toastService: ToastService,
    private _appointmentService: AppointmentService,
    private _authService: AuthService,
    private _spinnerService: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Dashboard', active: true },
    ];

    if (localStorage.getItem('toast')) {
      this._toastService.success('Logged in Successfully.');
      localStorage.removeItem('toast');
    }

    this.currentUser = this._authService.currentUser();

    this.getRecentlyAppointments();
    this.loadWidgets();
    this.getUpcomningAppointments();
    this.fetchData();
  }

  ngAfterViewInit(): void {}

  fetchData() {
    this._spinnerService.show();
    Promise.all([
      this._appointmentService.WidgetsData.subscribe(
        (res) => (this.widgetsData = res)
      ),
      this._appointmentService.RecentlyAppointments.subscribe(
        (res) => (this.recentlyAppointments = res)
      ),

      this._appointmentService.UpcomingAppointment.subscribe(
        (res) => (this.upcomingAppointments = res)
      ),
    ]).finally(() => {
      setTimeout(() => {
        this.loadDataTable();
        this.dtTrigger.next(this.dtOptions);
        this._spinnerService.hide();
      }, 300);
    });
  }

  getRecentlyAppointments() {
    this._appointmentService
      .getRecentlyAppointment(
        'Appointment/get-recently-appointments',
        this.currentUser.id
      )
      .pipe(
        catchError((err) => {
          this._appointmentService.setRecentlyApptData([]);
          return throwError(() => err);
        }),
        map(
          (
            res: Array<{
              id: number;
              appointmentDate: string;
              avatarUrl: string;
              speciality: string;
              doctorName: string;
            }>
          ) => {
            return res;
          }
        )
      )
      .subscribe((res) => this._appointmentService.setRecentlyApptData(res));
  }

  loadWidgets() {
    this._appointmentService
      .loadWidgets(
        'Appointment/load-widgets',
        this.currentUser.id,
        this.currentUser.userType
      )
      .pipe(
        catchError((err) => {
          this._appointmentService.setWidgetsData([]);
          return throwError(() => err);
        })
      )
      .subscribe((res: Array<number>) => {
        this._appointmentService.setWidgetsData(res);
      });
  }

  getUpcomningAppointments() {
    this._appointmentService
      .getUpcomingAppointment(
        `Appointment/get-upcoming-appointments`,
        this.currentUser.id
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe(
        (
          res: Array<{
            id: number;
            appointmentDate: string;
            doctorName: string;
            speciality: string;
            dateOfConsultation: string;
          }>
        ) => {
          this._appointmentService.setUpcomingApptData(res);
        }
      );
  }

  loadDataTable() {
    this.dtOptions = {
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
      data: this.upcomingAppointments,

      columns: [
        {
          orderable: false,
          data: null,
          defaultContent: '',
        },
        {
          data: 'id',
          title: 'ID',          
          className:'text-center',
        },
        {
          data: 'doctorName',
          title: 'Doctor',
          render: (data: any, type: any, row: any, meta: any) => {
            return `<span class="text-center">${data}</span>`
          }
        },
        {
          data: 'speciality',
          title: 'Speciality',
        },
        {
          data: 'appointmentDate',
          title: 'Appointment date',
          className:'text-end',
        },
        {
          data: 'dateOfConsultation',
          title: 'Consultation date',
          className:'text-end',
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
            return `<span class="badge bg-${badgeType}">${data}</span>`;
          },
        },
        {
          data: 'createdDate',
          title: 'Created date',
          className:'text-end',
        },
        {
          title: 'Action',
          data: 'id',
          render: (data: any, type: any, row: any, meta: any) => {
            const viewButton = `<button class="btn btn-soft-info btn-sm edit-btn" title="View" onClick="location.assign('/patient/appointment/view/${data}')">View</button>`;
            const cancelButton =
              row.status.toLowerCase() !== 'cancelled'
                ? `<button class="btn btn-soft-danger btn-sm cancel-btn" data-appointment-id=${data} title="cancel">Cancel</button>`
                : `<button class="btn btn-soft-light btn-sm cancel-btn text-dark" disabled data-appointment-id=${data} title="cancel">Cancelled</button>`;

            return `<div class="d-flex gap-3">${viewButton} ${cancelButton}</div>`;
          },
        },
      ],
    };
  }
}
