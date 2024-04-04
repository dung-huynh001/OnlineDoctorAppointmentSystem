import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
})
export class SchedulerComponent implements OnInit {
  calendarTitle!: string;
  type!: string;

  constructor() {}

  ChangeCalendarTitle(event: any) {
    this.calendarTitle = event;
  }

  ngOnInit(): void {
    this.calendarTitle = new Date().toDateString();
    this.type = 'day';
  }

  initForDay() {
    this.calendarTitle = new Date().toDateString();
    this.type = 'day';
  }

  initForWeek() {
    const today = new Date();
    const weekday = today.getDay();

    const firstDayOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - weekday
    );

    const daysToAdd = 6 - weekday;
    const endOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysToAdd
    );

    this.calendarTitle = firstDayOfWeek.toDateString().slice(3) + ' - ' + endOfWeek.toDateString().slice(3) ;
    this.type = 'week';
  }

  initForMonth() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.calendarTitle = firstDayOfMonth.toDateString().slice(3);
    this.calendarTitle = this.calendarTitle.replace('01', '');
    this.type = 'month';
  }

  initForHalfMonth() {
    const today = new Date();
    const firstDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() <= 15 ? 1 : 16
    );

    const endOfHalfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() <= 15 ? 15 : 1, 0
    );

    this.calendarTitle = firstDayOfMonth.toDateString().slice(3) + ' - ' + endOfHalfMonth.toDateString().slice(3);
    this.type = 'half-month';
  }
}
