import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-schedule-of-doctor',
  templateUrl: './schedule-of-doctor.component.html',
  styleUrl: './schedule-of-doctor.component.scss',
})
export class ScheduleOfDoctorComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Schedules Of Doctors', active: true },
    ];
  }
}
