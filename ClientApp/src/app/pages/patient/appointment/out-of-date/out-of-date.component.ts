import { AfterViewInit, Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Subject, catchError, finalize, throwError } from 'rxjs';
import { User } from '../../../../core/models/auth.models';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { AuthService } from '../../../../core/services/auth.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../../core/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-out-of-date',
  templateUrl: './out-of-date.component.html',
  styleUrl: './out-of-date.component.scss'
})
export class OutOfDateComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  breadCrumbItems!: Array<{}>;

  currentUser!: User;
  selectedId!: number;

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  constructor(
    private _appointmentService: AppointmentService,
    private _authService: AuthService,
    private datePipe: DatePipe,
    private _modalService: NgbModal,
    private renderer: Renderer2,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) {}
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('data-appointment-id')) {
        const id = event.target.getAttribute('data-appointment-id');
        this.selectedId = id;
        if (event.target.classList.contains('cancel-btn')) {
          this.openModal(this.deleteModal);
        }
      }
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Manage Appointment' },
      { label: 'Out Of Date', active: true },
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
            'out-of-date',
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
          className:'text-center',
        },
        {
          data: 'doctorName',
          title: 'Doctor',
        },
        {
          data: 'appointmentDate',
          title: 'Appointment date',
          className:'text-end',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm dd/MM/yyyy '),
        },
        {
          data: 'dateOfConsultation',
          title: 'Consultation date',
          className:'text-end',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm dd/MM/yyyy '),
        },
        {
          data: 'status',
          title: 'Status',
          render: (data: any) => {
            return `<span class="badge bg-secondary">Out of date</span>`;
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
          className:'text-end',
          render: (data: any) => {
            return data !== null
              ? this.datePipe.transform(data, 'hh:mm dd/MM/yyyy ')
              : '--unknown--';
          },
        },
        {
          data: 'createdDate',
          title: 'Created date',
          className:'text-end',
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
            const cancelButton = `<button class="btn btn-soft-danger btn-sm cancel-btn" data-appointment-id=${data} title="cancel">Cancel</button>`

            return `<div class="d-flex gap-3">${viewButton} ${cancelButton}</div>`;
          },
        },
      ],
    };
  }

  cancelAppointment(id: number) {
    this._spinnerService.show();
    this._appointmentService
      .cancelAppointment('Appointment/cancel-appointment', id)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        }),
        finalize(() => {
          setTimeout(() => {
            this._spinnerService.hide();
          }, 300);
        }))
      .subscribe((res) => {
        if(res.isSuccess) {
          this._toastService.success(res.message);
        } else {
          this._toastService.error(res.message);
        }
      });
  }

  openModal(target: TemplateRef<any>) {
    this._modalService.open(target, { size: 'md', centered: true });
  }
}