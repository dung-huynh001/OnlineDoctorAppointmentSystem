import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.scss',
})
export class ViewDoctorComponent implements OnInit, AfterViewInit {
  UpcomingActivities:
    | Array<{
      date?: string;
      day?: string;
      time?: string;
      content?: string;
      users: Array<{
        name?: string;
        profile?: string;
        variant?: string;
      }>;
    }>
    | undefined;
  breadCrumbItems!: Array<{}>;
  userType = localStorage.getItem('userType');
  completionLevel!: number;
  selectedId: number = 1;
  selectedDate: Date = new Date();
  constructor() {
    this.completionLevel = 30;
  }

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Doctor Management' },
      { label: 'Doctor Details', active: true },
    ];

    this.UpcomingActivities = [
      {
        date: '25',
        day: 'Tue',
        time: '12:00am - 03:30pm',
        content: 'Meeting for campaign with sales team',
        users: [
          {
            name: 'Stine Nielsen',
            profile: 'assets/images/users/avatar-1.jpg',
          },
          {
            name: 'Jansh Brown',
            profile: 'assets/images/users/avatar-2.jpg',
          },
          {
            name: 'Dan Gibson',
            profile: 'assets/images/users/avatar-3.jpg',
          },
          {
            name: '5',
            variant: 'bg-info',
          },
        ],
      },
      {
        date: '20',
        day: 'Wed',
        time: '02:00pm - 03:45pm',
        content: 'Adding a new event with attachments',
        users: [
          {
            name: 'Frida Bang',
            profile: 'assets/images/users/avatar-4.jpg',
          },
          {
            name: 'Malou Silva',
            profile: 'assets/images/users/avatar-5.jpg',
          },
          {
            name: 'Simon Schmidt',
            profile: 'assets/images/users/avatar-6.jpg',
          },
          {
            name: 'Tosh Jessen',
            profile: 'assets/images/users/avatar-7.jpg',
          },
          {
            name: '3',
            variant: 'bg-success',
          },
        ],
      },
      {
        date: '17',
        day: 'Wed',
        time: '04:30pm - 07:15pm',
        content: 'Create new project Bundling Product',
        users: [
          {
            name: 'Nina Schmidt',
            profile: 'assets/images/users/avatar-8.jpg',
          },
          {
            name: 'Stine Nielsen',
            profile: 'assets/images/users/avatar-1.jpg',
          },
          {
            name: 'Jansh Brown',
            profile: 'assets/images/users/avatar-2.jpg',
          },
          {
            name: '4',
            variant: 'bg-primary',
          },
        ],
      },
      {
        date: '12',
        day: 'Tue',
        time: '10:30am - 01:15pm',
        content: 'Weekly closed sales won checking with sales team',
        users: [
          {
            name: 'Stine Nielsen',
            profile: 'assets/images/users/avatar-1.jpg',
          },
          {
            name: 'Jansh Brown',
            profile: 'assets/images/users/avatar-5.jpg',
          },
          {
            name: 'Dan Gibson',
            profile: 'assets/images/users/avatar-2.jpg',
          },
          {
            name: '9',
            variant: 'bg-warning',
          },
        ],
      },
    ];
  }

  onChangeDate(event: any) {
    this.selectedDate = new Date(event.target.value);
  }

  getDate(): number {
    return this.selectedDate.getDate();
  }
}
