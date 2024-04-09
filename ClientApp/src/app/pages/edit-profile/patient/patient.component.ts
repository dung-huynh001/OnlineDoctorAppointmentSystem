import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit {
  userData: any;
  completionLevel!: number;
  constructor() { 
    this.completionLevel = 30;
  }

  ngOnInit(): void {
    
  }

  /**
  * Multiple Default Select2
  */
  selectValue = ['Illustrator', 'Photoshop', 'CSS', 'HTML', 'Javascript', 'Python', 'PHP'];
}
