import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

const START_TIME_WORKING = 7;
const END_TIME_WORKING = 22;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export class DayComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  columns!: Array<{}>;
  doctors!: Array<{
    fullName: string;
    shifts: Array<{
      start: number;
      end: number;
    }>;
  }>;

  hours: string[] = [
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];

  constructor() {}

  ngOnInit(): void {
    this.doctors = [
      {
        fullName: 'Dung',
        shifts: [
          { start: 8, end: 12 },
          { start: 13, end: 15 },
          { start: 16, end: 17 }
        ],
      },
      {
        fullName: 'Dung',
        shifts: [
          { start: 8, end: 12 },
          { start: 13, end: 15 },
          { start: 17, end: 20 }
        ],
      },
      {
        fullName: 'Dung',
        shifts: [
          { start: 8, end: 12 },
          { start: 13, end: 15 },
          { start: 17, end: 20 }
        ],
      },
      {
        fullName: 'Dung',
        shifts: [
          { start: 8, end: 12 },
          { start: 13, end: 15 },
          { start: 17, end: 20 }
        ],
      },
      {
        fullName: 'Dung',
        shifts: [
          { start: 8, end: 12 },
          { start: 13, end: 15 },
          { start: 17, end: 20 }
        ],
      },
    ];
  }
  ngAfterViewInit(): void {}

  calculateColspan(shift: {
    start: number;
    end: number;
  }): number {
    return shift.end - shift.start + 1;
  }

  calculateSkipColumn(start: number) {
    const len = (start - START_TIME_WORKING);
    let arr = [];
    for(let i = 0; i < len; i++)
      arr.push(i);
    return arr;
  }
  calculateFill(end: number) {
    const len = (END_TIME_WORKING - end);
    let arr = [];
    for(let i = 0; i < len; i++)
      arr.push(i);
    return arr;
  }
}
