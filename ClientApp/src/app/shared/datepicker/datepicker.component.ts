import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})

export class DatepickerComponent implements OnInit{
  @Input() title?: string;
  
  constructor() {}

  ngOnInit() {

  }

}
