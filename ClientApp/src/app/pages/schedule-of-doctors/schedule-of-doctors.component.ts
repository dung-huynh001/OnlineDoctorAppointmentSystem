import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-schedule-of-doctors',
  templateUrl: './schedule-of-doctors.component.html',
  styleUrl: './schedule-of-doctors.component.scss'
})
export class ScheduleOfDoctorsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  constructor() {

  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Menu' },
      { label: 'Schedule of doctors', active: true }
    ];

  }

}
