import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Doctors, Headers } from './data';

const START_TIME_WORKING = 7;
const END_TIME_WORKING = 22;

interface iSchedule {
  fullName: string;
  shifts: Array<{
    id: number;
    shiftName: string;
    start: string;
    end: string;
  }>;
}

class Schedule {
  shiftName!: string;
  fullName!: string;
  appointmentDate!: string;
  start!: string;
  end!: string;
  

  _mapper(schedule: iSchedule, appointmentDate: string) {
      this.shiftName = schedule.shifts[0].shiftName;
      this.fullName = schedule.fullName;
      this.appointmentDate = appointmentDate;
      this.start = schedule.shifts[0].start;
      this.end = schedule.shifts[0].end;
  }
}

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export class DayComponent implements OnInit, AfterViewInit, OnChanges {
  selectedSchedule: Schedule = new Schedule();

  columns!: Array<{}>;
  doctors!: Array<iSchedule>;

  headers = Headers;

  @Input() appointmentDate!: string;

  @ViewChild('ViewModal') ViewModal!: TemplateRef<any>;

  constructor(private _modalService: NgbModal) {}

  ngOnInit(): void {
    this.doctors = Doctors;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {}

  viewEventDetails(event: any) {
    const id = event.target.id;
    this.selectedSchedule._mapper(this.findDoctor(id), this.appointmentDate);
    this._modalService.open(this.ViewModal, {
      centered: true,
    });
  }

  findDoctor(id: number): iSchedule {
    console.log(id)
    for (const doctor of this.doctors) {
      for (const shift of doctor.shifts) {
        if (id == shift.id) return doctor;
      }
    }
    return {
      fullName: '',
      shifts: [],
    };
  }

  calculateTimelineWidth(start: string, end: string) {
    let sHours = parseInt(start.slice(0, 2));
    let sMinute = parseInt(start.slice(3));

    let eHours = parseInt(end.slice(0, 2));
    let eMinute = parseInt(end.slice(3));

    let len = (eHours - sHours) * 100;
    if (sMinute != 0) {
      len = len - 50;
    }

    if (eMinute != 0) {
      len = len + 50;
    }

    return `calc(${len}% + 6px)`;
  }

  calculateStartingLine(start: string): {
    startIndex: number;
    half: boolean;
  } {
    let sHours = parseInt(start.slice(0, 2));
    let sMinute = parseInt(start.slice(3));
    let half = false;
    if (sMinute != 0) {
      half = true;
    }
    let startIndex = sHours - 7;
    return {
      startIndex: startIndex,
      half: half,
    };
  }
}
