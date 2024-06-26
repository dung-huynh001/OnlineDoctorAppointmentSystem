import { AppointmentService } from './../../../core/services/appointment.service';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { User } from '../../../core/models/auth.models';
import { Subject, catchError, finalize, map, throwError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { StatisticService } from '../../../core/services/statistic.service';
import { iWidget } from '../../../core/models/statistic.model';

const HOSTNAME = environment.serverApi;

@Component({
  selector: 'app-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss',
})
export class DoctorDashboardComponent implements OnInit, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  today = new Date().toDateString();
  currentUser!: User;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  hostName = HOSTNAME;

  selectedAppointmentId!: number;

  widgetsData: Array<number> = [0, 0, 0, 0];
  widgets!: Array<iWidget>;

  upcomingAppointments: Array<{
    id: number;
    appointmentDate: string;
    doctorName: string;
    speciality: string;
    dateOfConsultation: string;
  }> = [];

  newBookings!: {
    id: number;
    appointmentDate: any;
    dateOfBirth: any;
    avatarUrl: string;
    gender: string;
    patientName: string;
  }[];

  constructor(
    private _toastService: ToastService,
    private _appointmentService: AppointmentService,
    private _authService: AuthService,
    private _spinnerService: NgxSpinnerService,
    private render: Renderer2,
    private _widgetService: StatisticService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      
      { label: 'Dashboard', active: true },
    ];

    this.currentUser = this._authService.currentUser();

    this.loadWidgets();
    this._widgetService
      .statisticAppointmentWidgets(
        this.currentUser.id,
        this.currentUser.userType
      )
      .subscribe((res) => {
        this.widgets = res;
      });

    this.getUpcomingAppointments();
    this.fetchData();
    this.getNewBooking();
  }

  ngAfterViewInit(): void {
    this.render.listen('document', 'click', (event) => {
      if (
        event.target.hasAttribute('data-appointment-id') &&
        event.target.classList.contains('cancel-btn')
      ) {
        this.selectedAppointmentId = event.target.getAttribute(
          'data-appointment-id'
        );
        this.markAsCancel(this.selectedAppointmentId);
        this.fetchData();
      }
    });
  }

  fetchData() {
    this._spinnerService.show();
    Promise.all([
      this._appointmentService.WidgetsData.subscribe(
        (res) => (this.widgetsData = res)
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

  getNewBooking() {
    this._appointmentService
      .getNewBooking(this.currentUser.id)
      .pipe(
        catchError((err) => {
          this.newBookings = [];
          return throwError(() => err);
        }),
        map(
          (
            res: Array<{
              id: number;
              appointmentDate: any;
              dateOfBirth: any;
              avatarUrl: string;
              gender: string;
              patientName: string;
            }>
          ) => {
            res = res.map((item) => {
              const age =
                new Date().getFullYear() -
                new Date(item.dateOfBirth).getFullYear() +
                1;
              item.appointmentDate = new Date(
                item.appointmentDate
              ).toDateString();
              item.dateOfBirth = age + 'yrs';
              item.avatarUrl = HOSTNAME + `/` + item.avatarUrl;
              return item;
            });
            return res;
          }
        )
      )
      .subscribe((res) => (this.newBookings = res));
  }

  loadWidgets() {
    this._appointmentService
      .loadWidgets(
        'Appointment/load-widgets',
        this.currentUser.id,
        this.currentUser.userType
      )
      .subscribe((res: Array<number>) => {
        this._appointmentService.setWidgetsData(res);
      });
  }

  getUpcomingAppointments() {
    this._appointmentService
      .getUpcomingAppointment(this.currentUser.id, this.currentUser.userType)
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
        { targets: [-1], orderable: false, responsivePriority: 1  },
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
          data: 'patientGender',
          title: 'Gender',
        },
        {
          data: 'appointmentDate',
          title: 'Appointment date',
          className: 'dt-text-end',
        },
        {
          data: 'dateOfConsultation',
          title: 'Consultation date',
          className: 'dt-text-end',
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
          className: 'dt-text-end',
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

  markAsCancel(id: number) {
    this._spinnerService.show();
    this._appointmentService
      .updateAppointmentStatus(id, 'Cancelled')
      .pipe(
        finalize(() => {
          this.getNewBooking();
          setTimeout(() => {
            this._spinnerService.hide();
          }, 200);
        })
      )
      .subscribe((res) => {
        if (res.isSuccess) {
          this._toastService.success(res.message);
        }
      });
  }

  markAsConfirmed(id: number) {
    this._spinnerService.show();
    this._appointmentService
      .updateAppointmentStatus(id, 'Confirmed')
      .pipe(
        finalize(() => {
          this.getNewBooking();
          this.dtTrigger.next(this.dtOptions);
          setTimeout(() => {
            this._spinnerService.hide();
          }, 200);
        })
      )
      .subscribe((res) => {
        if (res.isSuccess) {
          this._toastService.success(res.message);
          this.getUpcomingAppointments();
          this.fetchData();
        }
      });
  }
}
