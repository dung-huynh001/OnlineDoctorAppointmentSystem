import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

interface iColumnTitle {
  dayOfWeek: string;
  date: number;
}

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
})
export class MonthComponent implements OnInit, OnChanges {
  @Input() month!: string;
  rangeDate!: iColumnTitle[];

  constructor() {}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rangeDate = [];
    // if (!changes['month'].firstChange) {
      const month = this.month.trim().slice(0, 3);
      const year = this.month.trim().slice(5);
      const startOfMonth = new Date(`${month} 01 ${year}`);
      const endOfMonth = new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth() + 1,
        0
      );

      for (
        let currentDate = startOfMonth;
        currentDate < endOfMonth;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const dayOfWeek = currentDate.toLocaleDateString('en-US', {
          weekday: 'short',
        });

        const date = currentDate.getDate();

        this.rangeDate.push({
          dayOfWeek,
          date
        })
      }

    // }
  }
}
