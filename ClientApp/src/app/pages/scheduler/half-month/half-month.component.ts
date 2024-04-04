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
import { Doctors, Headers } from '../day/data';

interface iColumnTitle {
  dayOfWeek: string;
  date: number;
}


@Component({
  selector: 'app-half-month',
  templateUrl: './half-month.component.html',
  styleUrl: './half-month.component.scss',
})
export class HalfMonthComponent implements OnInit, OnChanges {
  @Input() halfMonth!: string;
  startOfHalfMonth!: Date;
  endOfHalfMonth!: Date;
  rangeDate!: iColumnTitle[];

  constructor() {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.rangeDate = [];
    if (!changes['halfMonth'].firstChange) {
      this.startOfHalfMonth = new Date(this.halfMonth.slice(0, 12));
      this.endOfHalfMonth = new Date(this.halfMonth.slice(14));

      for (
        let currentDate = this.startOfHalfMonth;
        currentDate < this.endOfHalfMonth;
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
}
