import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
import { DoctorService } from '../../../core/services/doctor.service';

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

  constructor(
    private datePipe: DatePipe,
    private _toastService: ToastService,
    private renderer: Renderer2,
    private _doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Department Management', active: true },
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
        this._doctorService
          .getAll(`/Doctor/get-all`, dataTablesParameters)
          .pipe(
            catchError((err) => {
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
        },
        {
          title: 'Doctor',
          data: 'fullName',
        },
        {
          title: 'Speciality',
          data: 'speciality',
        },
        {
          title: 'Department',
          data: 'department',
        },
        {
          title: 'Gender',
          data: 'gender',
        },
        {
          title: 'Date of birth',
          data: 'dateOfBirth',
          render: (data: any) => this.datePipe.transform(data, 'dd/MM/yyyy'),
        },
        {
          title: 'National ID',
          data: 'nationalId',
        },
        {
          title: 'Mobile',
          data: 'phoneNumber',
        },
        {
          title: 'Email',
          data: 'email',
        },
        {
          title: 'Working start date',
          data: 'workingStartDate',
          render: (data: any) => this.datePipe.transform(data, 'dd/MM/yyyy'),
        },
        {
          title: 'Working end date',
          data: 'workingEndDate',
          render: (data: any) => this.datePipe.transform(data, 'dd/MM/yyyy'),
        },
        {
          title: 'Created by',
          data: 'createdBy',
        },
        {
          title: 'Created date',
          data: 'createdDate',
          render: (data: any) =>
            this.datePipe.transform(data, 'dd/MM/yyyy hh:mm:ss '),
        },
        {
          title: 'Action',
          data: 'id',
          render: (data: any, type: any, row: any, meta: any) => {
            const viewButton = `<button class="btn btn-soft-info btn-sm edit-btn" data-bs-toggle="modal" data-department-name="${row.fullName}" data-department-id="${data}" title="Edit">View</button>`;
            const editButton = `<button class="btn btn-soft-primary btn-sm edit-btn" data-bs-toggle="modal" data-department-name="${row.fullName}" data-department-id="${data}" title="Edit">Edit</button>`;
            const deleteButton = row.isDeleted
              ? `<button class="btn btn-soft-danger btn-sm delete-btn border-0" data-bs-toggle="modal" data-department-name="${row.fullName}" data-department-id="${data}" title="Resource has been deleted" disabled>Deleted</button>`
              : `<button class="btn btn-soft-danger btn-sm delete-btn" data-bs-toggle="modal" data-department-name="${row.fullName}" data-department-id="${data}" title="Delete">Delete</button>`;
            const restoreButton = row.isDeleted
              ? `<button class="btn btn-soft-success btn-sm restore-btn border-0" data-bs-toggle="modal" data-department-name="${row.fullName}" data-department-id="${data}" title="Restore this resource">Restore</button>`
              : ``;
            return `${viewButton} ${editButton} ${restoreButton} ${deleteButton}`;
          },
        },
        {
          title: 'Updated by',
          data: 'updatedBy',
        },
        {
          title: 'Updated date',
          data: 'updatedDate',
          render: (data: any) =>
            this.datePipe.transform(data, 'dd/MM/yyyy hh:mm:ss '),
        },
        {
          title: 'Deleted',
          data: 'isDeleted',
          render: (data: any) => {
            const bagdes = data
              ? `<span class="badge bg-danger">${data}</span>`
              : `<span class="badge bg-info">${data}</span>`;
            return bagdes;
          },
        },
        
      ],
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
}
