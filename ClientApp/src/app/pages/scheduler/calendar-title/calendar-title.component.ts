import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-title',
  templateUrl: './calendar-title.component.html',
  styleUrl: './calendar-title.component.scss',
})
export class CalendarTitleComponent implements OnInit {
  @Input() type: string = 'day';
  @Input() calendarTitle!: string;
  @Output() selectedDate = new EventEmitter();

  ngOnInit(): void {
    switch (this.type.toLowerCase()) {
      case 'day':
        break;
      case 'week':
        break;
      case 'half-month':
        break;
      case 'month':
        break;
      default:
        break;
    }

    this.selectedDate.emit(this.calendarTitle);
  }

  next() {
    switch (this.type.toLowerCase()) {
      case 'day':
        this.nextDay();
        break;
      case 'week':
        this.nextWeek();
        break;
      case 'half-month':
        this.nextHalfMonth();
        break;
      case 'month':
        this.nextMonth();
        break;
      default:
        this.nextDay();
        break;
    }
    this.selectedDate.emit(this.calendarTitle);
  }
  previous() {
    switch (this.type.toLowerCase()) {
      case 'day':
        this.previousDay();
        break;
      case 'week':
        this.previousWeek();
        break;
      case 'half-month':
        this.previousHalfMonth();
        break;
      case 'month':
        this.previousMonth();
        break;
      default:
        this.previousDay();
        break;
    }
    this.selectedDate.emit(this.calendarTitle);
  }

  nextDay() {
    const date = new Date(Date.parse(this.calendarTitle));
    date.setDate(date.getDate() + 1);
    this.calendarTitle = date.toDateString();
  }

  previousDay() {
    const date = new Date(Date.parse(this.calendarTitle));
    date.setDate(date.getDate() - 1);
    this.calendarTitle = date.toDateString();
  }

  nextWeek() {
    const date = new Date(Date.parse(this.calendarTitle.slice(14)));
    date.setDate(date.getDate() + 1);
    const endOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 6
    );
    this.calendarTitle =
      date.toDateString().slice(3) + ' - ' + endOfWeek.toDateString().slice(3);
  }

  previousWeek() {
    const date = new Date(Date.parse(this.calendarTitle.slice(0, 13)));
    const startOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 7
    );
    const endOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );
    this.calendarTitle =
      startOfWeek.toDateString().slice(3) +
      ' - ' +
      endOfWeek.toDateString().slice(3);
  }

  nextMonth() {
    const calendarTitle = this.calendarTitle.trim().replace(' ', ' 01 ');
    const date = new Date(Date.parse(calendarTitle));
    this.calendarTitle = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      .toDateString()
      .slice(3)
      .replace('01', '');
  }

  previousMonth() {
    const calendarTitle = this.calendarTitle.trim().replace(' ', ' 01 ');
    const date = new Date(Date.parse(calendarTitle));
    this.calendarTitle = new Date(date.getFullYear(), date.getMonth() - 1, 1)
      .toDateString()
      .slice(3)
      .replace('01', '');
  }

  nextHalfMonth() {
    const date = new Date(Date.parse(this.calendarTitle.slice(14)));
    date.setDate(date.getDate() + 1);
    const endOfHalfMonth =
      date.getDate() > 15
        ? new Date(date.getFullYear(), date.getMonth() + 1, 0)
        : new Date(date.getFullYear(), date.getMonth(), 15);
    this.calendarTitle =
      date.toDateString().slice(3) +
      ' - ' +
      endOfHalfMonth.toDateString().slice(3);
  }

  previousHalfMonth() {
    const endOfHalfMonth = new Date(
      Date.parse(this.calendarTitle.slice(0, 13))
    );
    endOfHalfMonth.setDate(endOfHalfMonth.getDate() - 1);

    const startOfHalfMonth =
      endOfHalfMonth.getDate() <= 15
        ? new Date(endOfHalfMonth.getFullYear(), endOfHalfMonth.getMonth(), 1)
        : new Date(
            endOfHalfMonth.getFullYear(),
            endOfHalfMonth.getMonth(),
            16
          );
    this.calendarTitle =
      startOfHalfMonth.toDateString().slice(3) +
      ' - ' +
      endOfHalfMonth.toDateString().slice(3);
  }
}
