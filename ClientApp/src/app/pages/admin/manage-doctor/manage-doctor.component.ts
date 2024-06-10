import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Subject, catchError, finalize, throwError } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-manage-doctor',
  templateUrl: './manage-doctor.component.html',
  styleUrl: './manage-doctor.component.scss'
})
export class ManageDoctorComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  submitted: boolean = false;
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  selectedId!: number;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  constructor(
    private datePipe: DatePipe,
    private _toastService: ToastService,
    private renderer: Renderer2,
    private _spinnerService: NgxSpinnerService,
    private _doctorService: DoctorService,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Doctor Management', active: true },
    ];

    this.dtOptions = {
      serverSide: true,
      pagingType: 'full_numbers',
      processing: true,
      responsive: true,
      destroy: true,
      order: [[1, 'asc']],
      columnDefs: [
        { targets: [0, -1], searchable: false, },
        { targets: [-1], orderable: false, responsivePriority: 1 },
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
        this._doctorService
          .getAll(dataTablesParameters)
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
          title: 'ID',
          data: 'id',
          className: 'text-center'
        },
        {
          title: 'Doctor',
          data: 'fullName',
        },
        {
          title: 'Speciality',
          data: 'speciality',
          className: 'dt-text-wrap'
        },
        {
          title: 'Department',
          data: 'department',
          className: 'dt-text-wrap'
        },
        {
          title: 'Gender',
          data: 'gender',
        },
        {
          title: 'Date of birth',
          data: 'dateOfBirth',
          className: 'dt-text-end',
          render: (data: any) => this.datePipe.transform(data, 'dd/MM/yyyy'),
        },
        {
          title: 'National ID',
          className: 'dt-text-end',
          data: 'nationalId',
        },
        {
          title: 'Mobile',
          className: 'dt-text-end',
          data: 'phoneNumber',
        },
        {
          title: 'Email',
          data: 'email',
        },
        {
          title: 'Working start',
          className: 'dt-text-end dt-text-wrap',
          data: 'workingStartDate',
          render: (data: any) => this.datePipe.transform(data, 'dd/MM/yyyy'),
        },
        {
          title: 'Working end',
          className: 'dt-text-end dt-text-wrap',
          data: 'workingEndDate',
          render: (data: any) => this.datePipe.transform(data, 'dd/MM/yyyy'),
        },
        {
          title: 'Created by',
          data: 'createdBy',
          render: (data: any) => 'admin',
        },
        {
          title: 'Created date',
          className: 'dt-text-end dt-text-wrap',
          data: 'createdDate',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm:ss dd/MM/yyyy'),
        },
        {
          title: 'Updated by',
          className: '',
          data: 'updatedBy',
        },
        {
          title: 'Updated date',
          className: 'dt-text-end dt-text-wrap',
          data: 'updatedDate',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm:ss dd/MM/yyyy'),
        },
        {
          title: 'Deleted',
          className: 'text-center',
          data: 'isDeleted',
          render: (data: any) => {
            const bagdes = data
              ? `<span class="badge bg-danger">${data}</span>`
              : `<span class="badge bg-info">${data}</span>`;
            return bagdes;
          },
        },
        {
          title: 'Action',
          orderable: false,
          data: 'id',
          className: 'dt-action',
          render: (data: any, type: any, row: any, meta: any) => {
            const viewButton = `<a role="button" class="btn btn-soft-info btn-sm edit-btn" data-doctor-id="${data}" title="Edit" href="admin/manage-doctor/view-doctor/${data}">View</a>`;
            const editButton = `<a role="button" class="btn btn-soft-primary btn-sm edit-btn" data-doctor-id="${data}" title="Edit" href="admin/manage-doctor/edit-doctor/${data}">Edit</a>`;
            const deleteButton = row.isDeleted
              ? `<a class="btn btn-light btn-sm border-0 disabled" title="Doctor has been deleted" disabled>Deleted</a>`
              : `<a class="btn btn-soft-danger btn-sm delete-btn" data-doctor-id="${data}" title="Delete">Delete</a>`;
            const restoreButton = row.isDeleted
              ? `<a class="btn btn-soft-success btn-sm restore-btn border-0" data-doctor-id="${data}" title="Restore this doctor">Restore</a>`
              : ``;
            return `${viewButton} ${editButton} ${deleteButton} ${restoreButton}`;
          },
        },
      ],
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);

    this.renderer.listen('document', 'click', (event) => {
      if (
        event.target.hasAttribute('data-doctor-id') &&
        event.target.classList.contains('delete-btn')
      ) {
        const id = event.target.getAttribute('data-doctor-id');
        this.selectedId = id;
        this.openModal();
      } else if (event.target.hasAttribute('data-doctor-id') &&
        event.target.classList.contains('restore-btn')) {
        const id = event.target.getAttribute('data-doctor-id');
        this.selectedId = id;
        this.restoreDoctor();
      }
    });
  }

  deleteDoctor() {
    const id = this.selectedId;
    this._spinnerService.show();
    this._doctorService.delete(id)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this._spinnerService.hide();
          }, 200);
        })
      )
      .subscribe((res) => {
        if (res.isSuccess) {
          this._toastService.success(res.message);
          this.reRenderTable();
        } else {
          this._toastService.success(res.message);
        }
      });
  }

  restoreDoctor() {
    const id = this.selectedId;
    this._spinnerService.show();
    this._doctorService.restore(id)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this._spinnerService.hide();
          }, 200);
        })
      )
      .subscribe((res) => {
        if (res.isSuccess) {
          this._toastService.success(res.message);
          this.reRenderTable();
        } else {
          this._toastService.success(res.message);
        }
      });
  }

  reRenderTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.dtOptions);
    });
  }

  openModal() {
    this._modalService.open(this.deleteModal, {
      centered: true,
    })
  }
}
