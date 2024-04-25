import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { DoctorService } from '../../../core/services/doctor.service';
import { Subject, catchError, throwError } from 'rxjs';
import { PatientService } from '../../../core/services/patient.service';

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

  constructor(
    private datePipe: DatePipe,
    private _doctorService: DoctorService,
    private _patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
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
          className: 'text-end',
          render: (data: any) => this.datePipe.transform(data, 'dd/MM/yyyy'),
        },
        {
          title: 'National ID',
          data: 'nationalId',
          className: 'text-end',
        },
        {
          title: 'Mobile',
          data: 'phoneNumber',
          className: 'text-end',
        },
        {
          title: 'Email',
          data: 'email',
        },
        {
          title: 'Address',
          data: 'email',
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
            this.datePipe.transform(data, 'dd/MM/yyyy hh:mm:ss '),
          className: 'text-end',
        },

        {
          title: 'Updated by',
          className: 'priority-5',
          data: 'updatedBy',
        },
        {
          title: 'Updated date',
          className: 'priority-5 text-end',
          data: 'updatedDate',
          render: (data: any) =>
            this.datePipe.transform(data, 'dd/MM/yyyy hh:mm:ss '),
        },
        {
          title: 'Deleted',
          className: 'priority-5',
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
              ? `<button class="btn btn-soft-danger btn-sm delete-btn border-0" data-patient-id="${data}" title="Patient has been deleted" disabled onClick="location.assign('admin/manage-patient/view-patient/${data}')">Deleted</button>`
              : `<button class="btn btn-soft-danger btn-sm delete-btn" data-patient-id="${data}" title="Delete">Delete</button>`;
            const restoreButton = row.isDeleted
              ? `<button class="btn btn-soft-success btn-sm restore-btn border-0" data-patient-id="${data}" title="Restore this patient" >Restore</button>`
              : ``;
            return `${viewButton} ${editButton} ${restoreButton} ${deleteButton}`;
          },
        },
      ],
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  onClick() {
    console.log('clicked');
  }
}
