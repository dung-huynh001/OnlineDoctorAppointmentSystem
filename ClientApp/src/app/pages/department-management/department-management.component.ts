import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.scss'
})
export class DepartmentManagementComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  maxFileSize: number = 2097152;
  formAddDepartment!: FormGroup;
  submitted: boolean = false;

  constructor(private _modalService: NgbModal, private formBuilder: FormBuilder) { }

  get formAdd() {
    return this.formAddDepartment.controls;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Department Management', active: true }
    ];

    this.formAddDepartment = this.formBuilder.group({
      departmentName: ['', Validators.required],
      image: ['', [Validators.required, Validators.max(this.maxFileSize)]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.formAddDepartment.valid) {
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

  onClose() {
    document.getElementsByClassName('modal')
  }

  openModal(content: any) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true }).result.then(
      () => { },
      () => { this.resetForm(); });
  }
}
