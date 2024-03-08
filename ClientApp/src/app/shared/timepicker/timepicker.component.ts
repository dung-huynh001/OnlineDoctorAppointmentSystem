import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.scss'
})
export class TimepickerComponent implements OnInit {
  @Input() title: string | undefined;
  @Output() timeChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    
  }

  onTimeChange(event: any): void {
    const selectedTime = (event.target as HTMLInputElement).value;
    console.log('time from child: ' + selectedTime);
    this.timeChange.emit(selectedTime);
  }
}
