import {
  Component,
  ViewEncapsulation,
  Inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { blockData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel,
  View,
  GroupModel,
  TimelineViewsService,
  TimelineMonthService,
  DayService,
  ResizeService,
  DragAndDropService,
  ResourceDetails,
  ScheduleComponent,
  ScheduleModule,
  MonthService,
  WeekService,
  TimelineYearService,
} from '@syncfusion/ej2-angular-schedule';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-test-lib',
  templateUrl: './test-lib.component.html',
  styleUrls: ['./test-lib.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DayService,
    MonthService,
    WeekService,
    TimelineViewsService,
    TimelineMonthService,
    TimelineYearService,
    ResizeService,
    DragAndDropService,
  ],
})
export class TestLibComponent implements AfterViewInit {
  headerOption = 'Date';

  currentViewChange(event: any) {
    if (event == 'TimelineDay') {
      this.headerOption = 'Hour';
    } else {
      this.headerOption = 'Date';
    }
  }

  formatDateHeader(value: Date) {
    return this.datePipe.transform(value, 'dd (EEE)');
  }

  changeViewMode() {
    this.currentView = 'TimelineMonth';
  }

  next() {}

  previous() {}

  changeDate() {
    this.selectedDate = new Date();
  }

  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  public data: Record<string, any>[] = extend(
    [],
    blockData,
    undefined,
    true
  ) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 7, 2);
  public currentView: View = 'TimelineDay';
  public employeeDataSource: Record<string, any>[] = [
    {
      Text: 'Alice',
      Id: 1,
      GroupId: 1,
      Color: '#bbdc00',
      Designation: 'Content writer',
    },
    {
      Text: 'Nancy',
      Id: 2,
      GroupId: 2,
      Color: '#9e5fff',
      Designation: 'Designer',
    },
    {
      Text: 'Robert',
      Id: 3,
      GroupId: 1,
      Color: '#bbdc00',
      Designation: 'Software Engineer',
    },
    {
      Text: 'Robson',
      Id: 4,
      GroupId: 2,
      Color: '#9e5fff',
      Designation: 'Support Engineer',
    },
    {
      Text: 'Laura',
      Id: 5,
      GroupId: 1,
      Color: '#bbdc00',
      Designation: 'Human Resource',
    },
    {
      Text: 'Margaret',
      Id: 6,
      GroupId: 2,
      Color: '#9e5fff',
      Designation: 'Content Analyst',
    },
  ];
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Employee'],
  };
  public allowMultiple = false;
  public eventSettings: EventSettingsModel = { dataSource: this.data };

  constructor(private datePipe: DatePipe) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      const targetDiv = document.querySelectorAll(
        '.e-dlg-container'
      );
      console.log(targetDiv);
    }, 3000);
    
  }

  public getEmployeeName(value: ResourceDetails) {
    return value.resourceData[`${value.resource.textField}`] as string;
  }

  public getEmployeeDesignation(value: ResourceDetails) {
    const resourceName: string = value.resourceData[
      `${value.resource.textField}`
    ] as string;
    return value.resourceData['Designation'];
  }

  public getEmployeeImageName(value: ResourceDetails) {
    return this.getEmployeeName(value).toLowerCase();
  }
}
