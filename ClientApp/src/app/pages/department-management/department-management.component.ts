import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.scss'
})
export class DepartmentManagementComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Department Management', active: true}
    ]
  }
}
