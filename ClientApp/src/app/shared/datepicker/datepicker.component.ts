import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})

export class DatepickerComponent implements OnInit{
  @Input() title?: string;
  @Output() dateChange = new EventEmitter();
  today: string = new Date().toLocaleDateString();;
  constructor() {}

  ngOnInit() {
    console.log(this.today)
  }
  onDateChange(event: any){
    const selectedDate = new Date((event.target as HTMLInputElement).value).toLocaleDateString('en-ZA');
    console.log('from child: ' + selectedDate);
    this.dateChange.emit(selectedDate);
  }
}
