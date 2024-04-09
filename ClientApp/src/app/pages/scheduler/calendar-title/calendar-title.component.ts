import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-calendar-title',
  templateUrl: './calendar-title.component.html',
  styleUrl: './calendar-title.component.scss',
})
export class CalendarTitleComponent implements OnInit, OnChanges {
  @Input() type: string = 'day';
  @Input() calendarTitle!: string;
  @Output() selectedDate = new EventEmitter();

  @ViewChild('inputCalendar') inputCalendar!: ElementRef;

  calendarValue!: string;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.calendarValue = new Date().toLocaleDateString('en-CA');
    this.selectedDate.emit(this.calendarTitle);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calendarValue = new Date(
      this.calendarTitle.split('-')[0]
    ).toLocaleDateString('en-CA');
  }

  triggerClickInputCalendar() {
    const input = this.inputCalendar.nativeElement as HTMLElement;
    input.click();
  }

  onChangeDate(event: any) {
    const date = new Date(event.dateString);
    switch (this.type.toLowerCase()) {
      case 'day':
        this.initForDay(date);
        break;
      case 'week':
        this.initForWeek(date);
        break;
      case 'half-month':
        this.initForHalfMonth(date);
        break;
      default:
        this.initForMonth(date);
        break;
    }
  }

  initForDay(date: Date) {
    this.calendarTitle = date.toDateString();
    this.selectedDate.emit(this.calendarTitle);
  }

  initForWeek(date: Date) {
    const weekday = date.getDay();

    const firstDayOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - weekday
    );

    const daysToAdd = 6 - weekday;
    const endOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + daysToAdd
    );

    this.calendarTitle =
      firstDayOfWeek.toDateString().slice(3) +
      ' - ' +
      endOfWeek.toDateString().slice(3);
    this.selectedDate.emit(this.calendarTitle);
  }

  initForMonth(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.calendarTitle = firstDayOfMonth.toDateString().slice(3);
    this.calendarTitle = this.calendarTitle.replace('01', '');
    this.selectedDate.emit(this.calendarTitle);
  }

  initForHalfMonth(date: Date) {
    const firstDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() <= 15 ? 1 : 16
    );

    const endOfHalfMonth =
      date.getDate() <= 15
        ? new Date(date.getFullYear(), date.getMonth(), 15)
        : new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.calendarTitle =
      firstDayOfMonth.toDateString().slice(3) +
      ' - ' +
      endOfHalfMonth.toDateString().slice(3);
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

    const startOfHalfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const endOfHalfMonth = new Date(
      startOfHalfMonth.getFullYear(),
      startOfHalfMonth.getMonth(),
      startOfHalfMonth.getDate() + 13
    );
    this.calendarTitle =
      startOfHalfMonth.toDateString().slice(3) +
      ' - ' +
      endOfHalfMonth.toDateString().slice(3);
  }

  previousHalfMonth() {
    const date = new Date(Date.parse(this.calendarTitle.slice(0, 13)));

    const endOfHalfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );

    const startOfHalfMonth = new Date(
      endOfHalfMonth.getFullYear(),
      endOfHalfMonth.getMonth(),
      endOfHalfMonth.getDate() - 13
    );

    this.calendarTitle =
      startOfHalfMonth.toDateString().slice(3) +
      ' - ' +
      endOfHalfMonth.toDateString().slice(3);
  }
}
