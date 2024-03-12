import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

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

  constructor() {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Doctor Management', active: true },
    ];
  }
}
