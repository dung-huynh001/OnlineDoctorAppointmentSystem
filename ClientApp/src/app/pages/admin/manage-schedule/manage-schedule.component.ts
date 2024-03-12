import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.scss'
})
export class ManageScheduleComponent {
  breadCrumbItems!: Array<{}>;
  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Schedule of doctors', active: true }
    ];
  }
}
