import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.scss'
})
export class EditDoctorComponent implements OnInit{
  breadCrumbItems!: Array<{}>;
  userType = localStorage.getItem('userType');
  completionLevel!: number;
  selectValue = ['Illustrator', 'Photoshop', 'CSS', 'HTML', 'Javascript', 'Python', 'PHP'];

  constructor() {
    this.completionLevel = 30;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Doctor Management' },
      { label: 'Edit Doctor', active: true },
    ];
  }
}
