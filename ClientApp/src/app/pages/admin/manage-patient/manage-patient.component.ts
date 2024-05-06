import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DoctorService } from '../../../core/services/doctor.service';
import { Subject, catchError, finalize, throwError } from 'rxjs';
import { PatientService } from '../../../core/services/patient.service';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../core/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrl: './manage-patient.component.scss',
})
export class ManagePatientComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  submitted: boolean = false;
  selectedId!: number;

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  constructor(
    private datePipe: DatePipe,
    private _patientService: PatientService,
    private _spinnerService: NgxSpinnerService,
    private _toastService: ToastService,
    private _modalService: NgbModal,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Patient Management', active: true },
    ];

    this.dtOptions = {
      serverSide: true,
      pagingType: 'full_numbers',
      processing: true,
      responsive: true,
      destroy: true,
      order: [[1, 'asc']],
      columnDefs: [
        { targets: [0, -1], searchable: false },
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
        this._patientService
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
          className: 'text-center',
        },
        {
          title: 'Patient',
          data: 'fullName',
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
          data: 'nationalId',
          className: 'dt-text-end',
        },
        {
          title: 'Mobile',
          data: 'phoneNumber',
          className: 'dt-text-end',
        },
        {
          title: 'Email',
          data: 'email',
        },
        {
          title: 'Address',
          data: 'address',
          className: 'dt-text-wrap',
        },
        {
          title: 'Created by',
          data: 'createdBy',
          render: (data: any) => 'admin',
        },
        {
          title: 'Created date',
          data: 'createdDate',
          render: (data: any) =>
            this.datePipe.transform(data, 'hh:mm:ss dd/MM/yyyy'),
          className: 'dt-text-end dt-text-wrap',
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
          data: 'id',
          render: (data: any, type: any, row: any, meta: any) => {
            const viewButton = `<a role="button" class="btn btn-soft-info btn-sm edit-btn"  data-patient-id="${data}" title="Edit" href="admin/manage-patient/view-patient/${data}">View</a>`;
            const editButton = `<a role="button" class="btn btn-soft-primary btn-sm edit-btn" data-patient-id="${data}" title="Edit" href="admin/manage-patient/edit-patient/${data}">Edit</a>`;
            const deleteButton = row.isDeleted
              ? `<button class="btn btn-light btn-sm delete-btn border-0 disabled" title="Patient has been deleted" disabled>Deleted</button>`
              : `<button class="btn btn-soft-danger btn-sm delete-btn" data-patient-id="${data}" title="Delete">Delete</button>`;
            const restoreButton = row.isDeleted
              ? `<button class="btn btn-soft-success btn-sm restore-btn border-0" data-patient-id="${data}" title="Restore this patient" >Restore</button>`
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
        event.target.hasAttribute('data-patient-id') &&
        event.target.classList.contains('delete-btn')
      ) {
        const id = event.target.getAttribute('data-patient-id');
        this.selectedId = id;
        this.openModal();
      } else if (event.target.hasAttribute('data-patient-id') &&
        event.target.classList.contains('restore-btn')) {
        const id = event.target.getAttribute('data-patient-id');
        this.selectedId = id;
        this.restorePatient();
      }
    });
  }

  deletePatient() {
    const id = this.selectedId;
    this._spinnerService.show();
    this._patientService.delete(id)
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

  restorePatient() {
    const id = this.selectedId;
    this._spinnerService.show();
    this._patientService.restore(id)
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
