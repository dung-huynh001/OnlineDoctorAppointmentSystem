import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Renderer2,
  TemplateRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../core/services/rest-api.service';
import { Subject, catchError, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { ToastService } from '../../account/login/toast-service';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.scss',
})
export class DepartmentManagementComponent
  implements OnInit, OnDestroy, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  maxFileSize: number = 2097152;
  formAddDepartment!: FormGroup;
  submitted: boolean = false;
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  deleteId: any;
  deleteName: any;

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
        const bagdes = `<span class="badge bg-info">${data}</span>`;
        return bagdes;
      },
    },
    {
      title: 'Action',
      data: 'id',
      render: (data: any, type: any, row: any, meta: any) => {
        const editButton =
          '<button class="btn btn-soft-primary btn-sm view-btn" data-bs-toggle="modal" >Edit</button>';
        const deleteButton =
          `<button class="btn btn-soft-danger btn-sm delete-btn" data-bs-toggle="modal" data-department-name="${row.departmentName}" data-department-id="${data}">Delete</button>`;

        return `${editButton} ${deleteButton}`;
      },
    },
  ];

  constructor(
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _restApiService: RestApiService,
    private datePipe: DatePipe,
    private _toastService: ToastService,
    private renderer: Renderer2,
  ) { }

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
      image: ['', [Validators.required, Validators.max(this.maxFileSize)]],
    });

    this.dtOptions = {
      // serverSide: true,
      pagingType: 'full_numbers',
      processing: true,
      responsive: true,
      destroy: true,
      order: [[1, 'asc']],
      columnDefs: [
        { targets: [0, -1], searchable: false },
        { targets: -1, orderable: false },
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
        this._restApiService.get('/Department/get-all', '').subscribe((res) => {
          callback({
            recordsTotal: res.length,
            recordsFiltered: res.length,
            data: res,
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
      if (event.target.hasAttribute("data-department-id")) {
        const id = event.target.getAttribute("data-department-id");
        const department = event.target.getAttribute("data-department-name");
        this.openDeleteModal(id, department);
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
      const data = this.formAddDepartment.value;
      this._restApiService
        .post('/Department/create', data)
        .pipe(catchError((err) => { return throwError(() => err); }))
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.show(res.message);
            this.rerender();
          }
        });
      this.resetForm();
    }
  }

  resetForm() {
    this.formAddDepartment.reset();
    this.submitted = false;
    this._modalService.dismissAll();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > this.maxFileSize) {
        this.formAdd['image'].setErrors({ max: true });
        return;
      }
    }
  }

  openDeleteModal(id: any, departmentName: any) {
    this.deleteId = id;
    this.deleteName = departmentName
    this._modalService.open(this.deleteModal, { centered: true });
  }

  openModal(content: any) {
    this._modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        centered: true,
      })
      .result.then(
        () => { },
        () => {
          this.resetForm();
        }
      );
  }

  deleteDepartment(id: any) {
    this._restApiService.delete('/Department/delete', `?id=${id}`)
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
