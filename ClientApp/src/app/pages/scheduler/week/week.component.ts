import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

interface iColumnTitle {
  dayOfWeek: string;
  date: number;
}

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrl: './week.component.scss',
})
export class WeekComponent implements OnInit, OnChanges {
  @Input() week!: string;
  startOfWeek!: Date;
  endOfWeek!: Date;

  rangeDate: iColumnTitle[] = [];

  fakeData = [
    {
      fullName: 'Chi Dung',
      date: new Date(),
      shifts: [
        {
          start: '07:00',
          end: '11:30',
        },
        {
          start: '13:00',
          end: '16:30',
        },
        {
          start: '18:00',
          end: '21:30',
        },
      ],
    },
    {
      fullName: 'Chi Dung',
      date: new Date('Mar 31 2024'),
      shifts: [
        {
          start: '07:00',
          end: '11:30',
        },
        {
          start: '13:00',
          end: '16:30',
        },
        {
          start: '18:00',
          end: '21:30',
        },
      ],
    },
    {
      fullName: 'Chi Dung',
      date: new Date('Apr 06 2024'),
      shifts: [
        {
          start: '07:00',
          end: '11:30',
        },
        {
          start: '13:00',
          end: '16:30',
        },
        {
          start: '18:00',
          end: '21:30',
        },
      ],
    },
  ];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.rangeDate = [];
    if (!changes['week'].firstChange) {
      this.startOfWeek = new Date(this.week.slice(0, 12));
      this.endOfWeek = new Date(this.week.slice(14));
      console.log(this.startOfWeek, this.endOfWeek);

      for (
        let currentDate = this.startOfWeek;
        currentDate <= this.endOfWeek;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        let dayOfWeek = currentDate.toLocaleDateString('en-US', {
          weekday: 'short',
        });
        let date = currentDate.getDate();
        this.rangeDate.push({
          dayOfWeek,
          date,
        });
      }
    }
  }

  calculateIndex(date: Date) {
    return date.getDay();
  }
}
