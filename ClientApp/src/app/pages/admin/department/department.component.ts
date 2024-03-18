import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, catchError, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RestApiService } from '../../../core/services/rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
})
export class DepartmentComponent implements OnInit, OnDestroy, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  formAddDepartment!: FormGroup;
  submitted: boolean = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  @ViewChild('deleteOrRestoreModal') deleteOrRestoreModal!: TemplateRef<any>;
  @ViewChild('content') addOrEditModal!: TemplateRef<any>;

  @ViewChild('button') button: any;
  editMode: boolean = false;
  restoreMode: boolean = true;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  deleteId: any;
  deleteName: any;

  editId: any;

  dataTableColumn = [
    {
      title: 'ID',
      data: 'id',
      render: (data: any) => data.toString(),
    },
    {
      title: 'Department',
      data: 'departmentName',
    },
    {
      title: 'Create by',
      data: 'createdBy',
      render: (data: any) => {
        return data ? data : 'admin';
      },
    },
    {
      title: 'Create date',
      data: 'createdDate',
      render: (data: any) =>
        this.datePipe.transform(data, 'dd/MM/yyyy hh:mm:ss '),
    },
    {
      title: 'Update by',
      data: 'updatedBy',
    },
    {
      title: 'Update date',
      data: 'updatedDate',
      render: (data: any) =>
        this.datePipe.transform(data, 'dd/MM/yyyy hh:mm:ss'),
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
    {
      title: 'Action',
      data: 'id',
      render: (data: any, type: any, row: any, meta: any) => {
        const editButton = `<button class="btn btn-soft-primary btn-sm edit-btn" data-bs-toggle="modal" data-department-name="${row.departmentName}" data-department-id="${data}" title="Edit">Edit</button>`;
        const deleteButton = row.isDeleted
          ? `<button class="btn btn-soft-danger btn-sm delete-btn border-0" data-bs-toggle="modal" data-department-name="${row.departmentName}" data-department-id="${data}" title="Resource has been deleted" disabled>Deleted</button>`
          : `<button class="btn btn-soft-danger btn-sm delete-btn" data-bs-toggle="modal" data-department-name="${row.departmentName}" data-department-id="${data}" title="Delete">Delete</button>`;
        const restoreButton = row.isDeleted
          ? `<button class="btn btn-soft-success btn-sm restore-btn border-0" data-bs-toggle="modal" data-department-name="${row.departmentName}" data-department-id="${data}" title="Restore this resource">Restore</button>`
          : ``;
        return `${editButton} ${restoreButton} ${deleteButton}`;
      },
    },
  ];

  constructor(
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _restApiService: RestApiService,
    private datePipe: DatePipe,
    private _toastService: ToastService,
    private renderer: Renderer2
  ) {}

  get formAdd() {
    return this.formAddDepartment.controls;
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Department Management', active: true },
    ];

    this.formAddDepartment = this._formBuilder.group({
      departmentName: ['', Validators.required],
      // image: ['', [Validators.required, Validators.max(this.maxFileSize)]],
    });

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
        this._restApiService
          .post('/Department/get-department', dataTablesParameters)
          .pipe(
            catchError((err) => {
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: null,
              });
              return throwError(() => {
                this._toastService.error('Cannot connect to server!');
                return err;
              });
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
        ...this.dataTableColumn,
      ],
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('data-department-id')) {
        const id = event.target.getAttribute('data-department-id');
        const departmentName = event.target.getAttribute(
          'data-department-name'
        );
        if (event.target.classList.contains('delete-btn')) {
          this.restoreMode = false;
          this.openDeleteOrRestoreModal(id, departmentName);
        } else if (event.target.classList.contains('restore-btn')) {
          this.restoreMode = true;
          this.openDeleteOrRestoreModal(id, departmentName);
        } else {
          this.editMode = true;
          this.openEditModal(id, departmentName);
        }
      }
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.dtOptions);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.formAddDepartment.valid) {
      const formData = this.formAddDepartment.value;
      console.log(formData);
      if (this.editMode) {
        const data = {
          id: this.editId,
          departmentName: formData.departmentName,
        };
        this._restApiService
          .patch('/Department/update', data.id, data)
          .pipe(
            catchError((err) => {
              return throwError(() => err);
            })
          )
          .subscribe((res) => {
            if (res.isSuccess) {
              this._toastService.success(res.message);
              this.rerender();
            }
          });
      } else {
        this._restApiService
          .post('/Department/create', formData)
          .pipe(
            catchError((err) => {
              return throwError(() => err);
            })
          )
          .subscribe((res) => {
            if (res.isSuccess) {
              this._toastService.success(res.message);
              this.rerender();
            }
          });
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.formAddDepartment.reset();
    this.submitted = false;
    this._modalService.dismissAll();
  }

  // onFileSelected(event: any) {
  //   const selectedFile = event.target.files[0];

  //   if (selectedFile) {
  //     if (selectedFile.size > this.maxFileSize) {
  //       this.formAdd['image'].setErrors({ max: true });
  //       return;
  //     }
  //   }
  // }

  openDeleteOrRestoreModal(id: any, departmentName: any) {
    this.deleteId = id;
    this.deleteName = departmentName;
    this._modalService.open(this.deleteOrRestoreModal, { centered: true });
  }

  openAddModal(content: any) {
    this.editMode = false;
    this._modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        centered: true,
      })
      .result.then(
        () => {},
        () => {
          this.resetForm();
        }
      );
  }

  openEditModal(id: any, departmentName: any) {
    this.editId = id;
    this.formAdd['departmentName'].setValue(departmentName);
    console.log(departmentName);
    this._modalService
      .open(this.addOrEditModal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        centered: true,
      })
      .result.then(
        () => {},
        () => {
          this.resetForm();
        }
      );
  }

  deleteDepartment(id: any) {
    this._restApiService
      .delete('/Department/delete', `?id=${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this._toastService.error(err?.Message);
            return err;
          });
        })
      )
      .subscribe((res) => {
        this._toastService.success(res.message);
        this.rerender();
      });
  }

  restoreDepartment(id: any) {
    this._restApiService
      .get('/Department/restore', `?id=${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this._toastService.error(err?.Message);
            return err;
          });
        })
      )
      .subscribe((res) => {
        this._toastService.success(res.message);
        this.rerender();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
